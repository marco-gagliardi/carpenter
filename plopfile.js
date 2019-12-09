const pluralize = require('pluralize')

module.exports = function (plop) {
  plop.setHelper('plural', (txt) => pluralize(txt));
  // resource generator
  plop.setGenerator('resource', {
    description: 'Application resource management logic (CRUD actions + store management)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Unique name of the unitary resource, i.e. \'user\':'
      },
      {
        type: 'input',
        name: 'endpoint',
        default: (answers) => pluralize(answers.name),
        message: 'Endpoint:'
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/stores/{{lowerCase (plural name)}}.js',
        templateFile: 'plop-templates/store-template.hbs'
      },
      {
        type: 'modify',
        path: 'src/stores/index.js',
        pattern: /(\/\/ END OF STORES)/g,
        template: 'import {{lowerCase (plural name)}} from \'./{{lowerCase (plural name)}}\' \n$1',
      },
      {
        type: 'modify',
        path: 'src/stores/index.js',
        pattern: /(\/\/ END OF REDUCERS)/g,
        template: '\t{{lowerCase (plural name)}},\n$1',
      }
    ]
  });
}