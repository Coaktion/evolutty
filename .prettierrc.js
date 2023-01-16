module.exports = {
  singleQuote: true,
  arrowParens: 'always',
  trailingComma: 'none',
  importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
};
