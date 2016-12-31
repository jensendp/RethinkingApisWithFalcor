var express = require('express');
var falcor = require('falcor');
var falcorExpress = require('falcor-express');

var app = express();

var $ref = falcor.Model.ref;
  var model = new falcor.Model({
    cache: {
      todosById: {
        98765: {
          name: "Get a great job",
          completed: false
        },
        12345: {
          name: "Watch Tuts Videos",
          completed: false
        }
      },
    todoList: [{
      name: "Recently Viewed",
      todos: [
        $ref("todosById[98765]"),
        $ref("todosById[12345]")
      ]
    },
    {
     name: "Recently Added",
     todos: [
       $ref("todosById[98765]")
     ]
   }]
 }}
);

app.use(express.static("."));

app.use('/model.json', falcorExpress.dataSourceRoute(function(req, res) {
  return model.asDataSource();
}));

app.listen(9090);
