import { declare, BabelAPI } from '@babel/helper-plugin-utils';
const { parse } = require('@babel/parser');

const DEFAULT_SIGNATURE = 'babel-plugin-react-ssr';

const plugin = declare((api, { signatures = DEFAULT_SIGNATURE }) => {
  let filename = '';
  const t = api.types;

  return {
    visitor: {
      Program: {
        exit(path, state) {
          const filename = state.file.opts.filename;
          const exportName = t.identifier('__export__');
          // @ts-ignore
          const exportValue = t.stringLiteral(filename);

          const newExport = t.exportNamedDeclaration(
              t.variableDeclaration('const', [
                  t.variableDeclarator(exportName, exportValue),
              ]),
              []
          );

          path.node.body.push(newExport);
      },

        enter(path, state) {
          // @ts-ignore
          filename = state.filename;
        }
      }
    },
  };
});

export default plugin;
