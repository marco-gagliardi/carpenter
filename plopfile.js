module.exports = function (plop) {
  // controller generator
  plop.setGenerator('resource', {
    description: 'Application resource management logic (CRUD actions + store management)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Name of the resource:'
      },

    ],
    actions: [{
      type: 'add',
      path: 'src/sores/{{name}}.js',
      templateFile: 'plop-templates/controller.hbs'
    }]
  });
};