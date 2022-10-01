require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const index = require('./routers/index');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', index);


app.get('/',(req,res)=>{
  return res.status(200).json({
    message: 'stack_lite API',
  })
})

app.all('*', (req, res) => {
    res.status(404).json({
      status: 'error',
      message: 'that route does not exist',
    });
  });


const PORT = process.env.PORT || 5000;
app.listen({ port: PORT }, async () =>{
    console.log(`server up on ${PORT}`)
    await sequelize.authenticate()
    console.log('database connected')
})

module.exports = app;