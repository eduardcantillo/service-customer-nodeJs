const express=require("express");
const app=express();
const morgan=require('morgan');

require('./databases/customer')

app.set('port',3000);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routers/IdentificacionRouter'))
app.use(require('./routers/ClientesRouter'))
app.listen(app.get('port'),() => {
    console.log( `server on port ${app.get('port')}`);
});