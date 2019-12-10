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
      {
        type: 'input',
        name: 'dtoPath',
        default: (answers) => `../../config/dto/default`,
        message: 'DTO path:'
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/stores/{{lowerCase (plural name)}}.js',
        templateFile: 'plop-templates/stores/store-template.hbs'
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
      },
      {
        type: 'add',
        path: 'src/components/{{properCase (plural name)}}/Form.js',
        templateFile: 'plop-templates/components/form-template.hbs'
      },
      {
        type: 'add',
        path: 'src/containers/{{properCase (plural name)}}/Create{{properCase name}}Container.js',
        templateFile: 'plop-templates/containers/create-container-template.hbs'
      },
      {
        type: 'add',
        path: 'src/containers/{{properCase (plural name)}}/{{properCase name}}Container.js',
        templateFile: 'plop-templates/containers/details-container-template.hbs'
      },
      {
        type: 'add',
        path: 'src/containers/{{properCase (plural name)}}/Edit{{properCase name}}Container.js',
        templateFile: 'plop-templates/containers/edit-container-template.hbs'
      },
      {
        type: 'add',
        path: 'src/containers/{{properCase (plural name)}}/{{properCase (plural name)}}ListContainer.js',
        templateFile: 'plop-templates/containers/list-container-template.hbs'
      },
    ]
  });
}