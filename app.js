// import modules
const express = require("express");
const mysql = require("mysql2");

// initialize express
const app = express();

// Middle ware to extract info from the frontend that are sent through json
app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);



//  step four: create connection info
let myConnection = mysql.createConnection(
    {
        user:"Evangadi",
        password :"Evangadi1234",
        host:'localhost',
        database:'mydb'
    }
)

//  step six: create table 
 
app.get('/createTable', (req,res)=>{

    let Products = `CREATE TABLE Products(
        product_id int auto_increment,
        product_url varchar(100) not null,
        product_name varchar(100) not null,
        PRIMARY KEY (product_id)
    )`;
    let ProductDescription = `CREATE TABLE ProductDescription(
        discription_id int auto_increment,
        product_id int not null,
        product_brief_description varchar(100) not null,
        product_description varchar(100) not null,
        product_img varchar(100) not null,
        product_link varchar(100) not null,
        PRIMARY KEY (discription_id),
        FOREIGN KEY (product_id) REFERENCES Products(product_id)
    )`;
    let ProductPrice = `CREATE TABLE ProductPrice(
        price_id int auto_increment,
        product_id int not null,
        starting_price varchar(100) not null,
        price_range varchar(100) not null,
        PRIMARY KEY (price_id),
        FOREIGN KEY (product_id) REFERENCES Products(product_id)
    )`;
    
    let orders = `CREATE TABLE orders(
        order_id int auto_increment,
        product_id int not null,
        user_id int not null,
        PRIMARY KEY (order_id),
        FOREIGN KEY (product_id) REFERENCES Products(product_id)
    )`;

    let user = `CREATE TABLE user(
        user_id int auto_increment,
        product_id int not null,
        user_name varchar(100) not null,
        user_password varchar(100) not null,
        PRIMARY KEY (user_id),
        FOREIGN KEY (product_id) REFERENCES Products(product_id)
    )`;

    myConnection.query(Products, (err, results, fields) => {
      if(err){
        console.log(err.message);
      }else{
        res.send('table created')
      }
    });

    myConnection.query(ProductDescription, (err, results, fields) => {
      if(err){
        console.log(err.message);
      }else{
        res.send('table created')
      }
    });

    myConnection.query(ProductPrice, (err, results, fields) => {
      if(err){
        console.log(err.message);
      }else{
        res.send('table created')
      }
    });

    myConnection.query(orders, (err, results, fields) => {
      if(err){
        console.log(err.message);
      }else{
        res.send('table created')
      }
    });

    myConnection.query(user, (err, results, fields) => {
      if(err){
        console.log(err.message);
      }else{
        res.send('table created')
      }
    });

    // check the connection
    // res.end('connected')
});

// insert data to the table
app.post('/add-product', (req, res) =>{
    const {product_url, product_name} = req.body

    // asign the insert command in a variable
    let add_product = `INSERT INTO Products(product_url, product_name)
    VALUES (?,?)`;

    // create the query action
    myConnection.query(add_product, [product_url, product_name], (err, data, field) => {
        if(err){
            console.log(err);
        }else{
            console.log(data)
            res.send('Data inserted')
        }
    });
});

let port = 4801;
app.listen(port,()=>{
    console.log(`server is listening to ${port}`);
}) 