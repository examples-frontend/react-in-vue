import { declare, BabelAPI } from '@babel/helper-plugin-utils';
const { parse } = require('@babel/parser');

import type { ImportDeclaration, VariableDeclaration } from '@babel/types';
import { ConfigAPI, types as t, NodePath, template } from '@babel/core'

const DEFAULT_SIGNATURE = 'babel-plugin-react-ssr';

const source = `
// @ts-ignore
const $$ReactCreateElement = (...arg) => {
  // console.log(arg[0], arg[1]);
  const CE = React.createElement;
  return CE(...arg)
}
`;

const afterImport = ({ path, t }: { path: NodePath<ImportDeclaration>;  t: BabelAPI['types'];}) => {
  const ast = parse(source);
  path.insertAfter([ast]);
}

const plugin = declare((api, { signatures = DEFAULT_SIGNATURE }) => {
  let filename = '';
  const { types } = api;
  const t = api.types;

  let pathAfterImport: unknown = null;

  let reactIdentifierName = ['React'];
  let createElementIdentifierName = ['createElement'];

  return {
    // inherits: syntaxDynamicImport,
    visitor: {
      Program: {
        exit(path: any, state: any) {
          if (pathAfterImport) {
            // @ts-ignore
            pathAfterImport.insertAfter([ast]);
          }
          // console.log('exit', { reactIdentifierName, createElementIdentifierName });
        },
        enter(path, state) {
          // @ts-ignore
          filename = state.filename;
        }
      }

      ,ImportDeclaration(path) {
        // Проверка следующего узла
        // @ts-ignore
        let sibling = path.getSibling(path.key + 1);
        if(!sibling.isImportDeclaration()) {
          afterImport({path, t});
        }
      }

      ,CallExpression(path) {
        if (t.isMemberExpression(path.node.callee)) {
          // @ts-ignore
          if (path.node.callee.object.name === "React" && path.node.callee.property.name === "createElement") {
            path.node.callee = t.identifier('$$ReactCreateElement');
          }
        }
      }
    },
  };
});

export default plugin;
