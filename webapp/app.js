const express= require('express');
const app = express();
const mysql = require('mysql');
const path= require('path');
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'coffeeshop'
})
var data;
connection.connect((err) => {
    if(err) throw err
    else{
        console.log('MySql Connected');
    }
});



const publicDir =path.join(__dirname,'/public/images');

app.use(express.static(publicDir));

connection.query('SELECT * FROM items',(err,result)=>{
    if(err) throw err
    else{
        console.log(result)
         data = result;
    }
    
})




app.set('view engine','ejs')

app.get('/',(req,res) => {
    
    res.render('coffeeshop',{data:data});
});

app.listen(5000, () => {
    console.log('Server listening on port 5000....');
});