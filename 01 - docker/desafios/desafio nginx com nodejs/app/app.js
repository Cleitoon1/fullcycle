const express = require('express')
var bodyParser = require('body-parser')
const database = require("./database.js")

const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const port = 3000

database.migrate()

const connection = database.connect();

app.get('/', (req,res) => {
    connection.query('SELECT * FROM People ORDER BY id desc', function (err, rows) {
        if (err) {
          res.render('./index', { data: '' })
        } else {
          res.render('./index', { data: rows })
        }
      })
})

app.post('/submit', (req, res) => {
  console.log(req)
  let name = req.body.name
  if(!name)
    res.redirect("/");
  const insertQuery = `INSERT INTO People(name) values('${name}')`
  connection.query(insertQuery)
  connection.commit()
  res.redirect("/");
});

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})