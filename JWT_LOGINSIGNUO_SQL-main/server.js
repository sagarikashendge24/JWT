const express = require('express');
const PORT = process.env.PORT || 3001;

const environment = process.env.ENVIRONMENT || 'development'
const config = require('./knexfile')[environment];

const knex = require('knex')(config)
const app = express();

// createing table:

knex.schema.createTable('users', (table) => {
  table.increments('id')
  table.string('name')
  table.integer('age')
})
.then(() => console.log('Table created..'))
.catch((err)=> console.log(err))

//Inserting data:

knex('users')
  .insert({name:'shendge', age:22})
  .then(()=>console.log('Data inserted'))
  .catch((err)=>console.log(err))

// Updating data:

knex('users')
  .where({ id: 1 })
  .update({ name: 'shendge' })
  .then(()=>console.log('Data updated'))
  .catch((err)=>console.log(err))

//Deleting data:

knex('users')
  .where({ id: 3 })
  .del()
  .then(()=>console.log('Data deleted'))
  .catch((err)=>console.log(err))

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});