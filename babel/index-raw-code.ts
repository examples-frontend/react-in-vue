import { declare, BabelAPI } from '@babel/helper-plugin-utils';
import type { NodePath } from '@babel/traverse';
import type { ImportDeclaration, VariableDeclaration } from '@babel/types';


const hookAfterImport = ({
  path, t, createElementIdentifierName, reactIdentifierName, filename,
} : {
  path: NodePath<ImportDeclaration>;
  t: BabelAPI['types'];
  createElementIdentifierName: Array<string>;
  reactIdentifierName: Array<string>;
  filename: string;
}) => {
      let lastPath: NodePath<VariableDeclaration>;

    // Создаем функцию
    const functionBody = `
      if (arguments[0] !== React.Fragment) {
          const props = arguments[1] || {};
          arguments[1] = {...props, customprops: "${filename}"};
      }

      const fn = React.createElement;
      return fn.apply(React, arguments);
    `;

    const customCreateElement = t.functionDeclaration(
      t.identifier('$$customCreateElement'),
      [t.restElement(t.identifier('arguments'))],
      t.blockStatement([
        t.expressionStatement(t.identifier(functionBody))
      ])
    );

    path.insertAfter([customCreateElement]);
          // Добавляем функции именнованного экспорта
          createElementIdentifierName.forEach((name) => {
            const variableDeclaration = t.variableDeclaration('const', [
              t.variableDeclarator(
                t.identifier(name),
                t.arrowFunctionExpression(
                  [t.restElement(t.identifier('args'))],
                  // Добавляем блочную область видимиости
                  t.blockStatement([
                    t.expressionStatement(t.identifier(functionBody))
                  ])
                )
              )
            ]);
            // @ts-ignore
            path.insertAfter([variableDeclaration]);
          });
}

const DEFAULT_SIGNATURE = 'babel-plugin-react';
const plugin = declare((api, { signatures = DEFAULT_SIGNATURE }) => {
  let filename = '';
  const { types } = api;
  const t = api.types;

  let reactIdentifierName = ['React'];
  let createElementIdentifierName = ['createElement'];


  return {
    visitor: {
      Program: {
        exit(path: any, state: any) {
          // console.log('exit', { reactIdentifierName, createElementIdentifierName });
        },
        enter(path, state) {
          // @ts-ignore
          filename = state.filename;
        }
      },
      ImportDeclaration(path) {
        const source = path.node.source.value;
        // Сохраняем все import react
        if (source === 'react') { // если мы импортируем 'react'...

          let specifiers = [];
          path.node.specifiers.forEach((specifier, index) => {
            // какой идентификатор используется для импорта всего модуля или всех его экспортов
            if (types.isImportDefaultSpecifier(specifier) || types.isImportNamespaceSpecifier(specifier)) {
              reactIdentifierName.push(specifier.local.name);
              reactIdentifierName = [...new Set(reactIdentifierName)];
            }
            // Проверяем спецефический метод
            if (
              types.isImportSpecifier(specifier) &&  // смотрим только на ImportSpecifier ({ createElement } from 'react')
              // @ts-ignore
              specifier.imported.name === 'createElement' // если текущий импортируемый идентификатор - это 'createElement'
            ) {
              createElementIdentifierName.push(specifier.local.name)
              createElementIdentifierName = [...new Set(createElementIdentifierName)];
            } else{
              // @ts-ignore;
              specifiers.push(specifier)
            }
          });
          path.node.specifiers = specifiers; // перезаписываем
        }
        /// --------------------------------- ///
        // Проверка следующего узла
        // @ts-ignore
        let sibling = path.getSibling(path.key + 1);
        if(!sibling.isImportDeclaration()) {
          hookAfterImport({path, t, createElementIdentifierName, reactIdentifierName, filename});
        }
      },

      CallExpression(path) {
        reactIdentifierName.forEach((name) => {
          if (
            // @ts-ignore
            path.node.callee.object &&
            // @ts-ignore
            path.node.callee.object.name === name &&
            // @ts-ignore
            path.node.callee.property.name === 'createElement'
          ) {
            path.node.callee = t.identifier('$$customCreateElement');
          }
        });

    },

      // Add props to jsx element (support React.Fragment)
      JSXOpeningElement(path) {
        const newProp = types.jSXAttribute(
          types.jSXIdentifier('customprops'),
          types.stringLiteral(filename)
        )
        path.node.attributes.push(newProp)
      },      
    },
  };
});

export default plugin;
export const test = "";