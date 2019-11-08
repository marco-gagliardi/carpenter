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
        message: 'Name of the resource (singular):'
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