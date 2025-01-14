const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv/config');
//const authJwt = require('./helpers/jwt');


app.use(cors());
app.options('*', cors());

//middleware
app.use(express.json());
// app.use(bodyParser.json({type:'aplication/*+json'}));
// app.use(bodyParser.raw({type:'aplication/vnd.custom-type'}));
// app.use(bodyParser.text({type:'text/html'}));


app.use(morgan('tiny'));
//app.use(authJwt());


const authRoutes = require('./routers/auth')
const userRouter = require('./routers/users')
const categoryRouter = require('./routers/category')
const productRouter = require('./routers/products')
const adminRouter=require('./routers/admin')
const api = process.env.API_URL;


//Routers
app.use(`${api}/auth`, authRoutes)
app.use(`${api}/users`, userRouter)
app.use(`${api}/category`, categoryRouter)
app.use(`${api}/product`, productRouter)
app.use(`${api}/admin`, adminRouter)



mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true
})
    .then(() => {
        console.log('Database connection is ready')
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(3000, () => {
    console.log('server is running http://localhost:3000');
})