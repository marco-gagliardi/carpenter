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
      }
    ]
  });
}