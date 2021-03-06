const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser')


app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'static')))

app.get("/", function (req, res) {
  res.render('index', {
      todos: todos,
      completed: completed
  });
});

let todos = [];
let completed = [];

app.post("/", function (req, res, next) {
  todos.push(req.body.todo);
res.redirect('/');
  })

// add a post route to push the info back to the webpage
app.post("/completed", function (req, res, next) {
  let item = req.body.completed;
  todos = todos.filter(function(todo){
    return todo !== item
  })

  completed.push(item);
  res.redirect('/');
  })

app.listen(3000, function(){
  console.log("App running on port 3000")
})
