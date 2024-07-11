import { declare, BabelAPI } from '@babel/helper-plugin-utils';
const { parse } = require('@babel/parser');

import type { ImportDeclaration, VariableDeclaration } from '@babel/types';
import { ConfigAPI, types as t, NodePath, template } from '@babel/core'

const DEFAULT_SIGNATURE = 'babel-plugin-react-ssr';

const plugin = declare((api, { signatures = DEFAULT_SIGNATURE }) => {
  let filename = '';
  const { types } = api;
  const t = api.types;

  let pathAfterImport: unknown = null;

  let reactIdentifierName = ['React'];
  let createElementIdentifierName = ['createElement'];

  return {
    visitor: {
      Program: {
        exit(path: any, state: any) {
        },
        enter(path, state) {
          // @ts-ignore
          filename = state.filename;
        }
      }
      ,JSXOpeningElement(path: NodePath<t.JSXOpeningElement>) {
        if (!t.isJSXIdentifier(path.node.name)) return
          // Проверить есть ли у родителей кастомный data-атрибут
          let parentPath = path.parentPath;
          let hasCustom = false;
          while(parentPath != null) {
            if(hasCustomDataAttribute(parentPath.node)) {
              // Если параметр есть, то пропустите текущий элемент
              return;
            }
            // @ts-ignore
            parentPath = parentPath.parentPath;
          }
                  
          // Добавить data-attribute
          path.node.attributes.push(
            t.jSXAttribute(t.jSXIdentifier('data-сustom'), t.stringLiteral(filename))
          );
      }
    },
  };
});

export default plugin;
