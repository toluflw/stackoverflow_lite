const express = require('express');
const { sequelize } = require('./models');
const index = require('./routers/index');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', index);

//catches all unassigned routes
app.all('*', (req, res) => {
    res.status(404).json({
      status: 'error',
      message: 'that route does not exist',
    });
  });


//creates tables in the db from the models i.e syncs them
app.listen({ port: 5000 }, async () =>{
    console.log(`server up on port 5000`)
    await sequelize.authenticate()
    console.log('database connected')
})

module.exports = app;