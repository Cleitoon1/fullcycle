const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

console.log("criando tabela people se não existir")
const createPeopleTable = `create table if not exists people(
    id int primary key auto_increment,
    name varchar(255)
)`
connection.query(createPeopleTable)
connection.commit()
console.log("inserindo registro na tabela people")
const sql = `INSERT INTO people(name) values('Cleiton')`
connection.query(sql)
connection.end()


app.get('/', (req,res) => {
    res.send('<h1>Full Cycle</h1>')
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})