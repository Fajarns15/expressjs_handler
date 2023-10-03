// import library expressjs
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json()) // for parsing application/json

// create logger Middleware function
function LoggerMiddleware(req, res, next){
  console.log(`Request received at: ${new Date()}`);
  next(); //continue process next function
}

// app.use(LoggerMiddleware);

// create handling http GET All customers for Api customers
app.get("/api/customers", (req,res)=>{
  const {keywords, category, limit} = req.query; //request query string by keyword, category
  
  res.status(200).json({
    code:200,
    massage:'get succes',
    data:[
        {
          name:'Fajar N S',
          email:'fajarnurs@gmail.com',
          role:'goldlane',
        },
        {
          name:'nana',
          email:'nana@gmail.com',
          role:'goldlane',
        },
        {
          name:'harley',
          email:'fajarnurs@gmail.com',
          role:'roamer',
        },
    ],
    pagination: {
      total_record: 100,
      current_page: 1,
      total_page: limit,
    },
    search: {
      keyword: keywords,
      category: category
    }
  })
})

// create handling http POST Add customer for api customers
app.post('/api/customers', LoggerMiddleware, (req,res)=>{
  const {name, email, role} = req.body;

  // res.send(`thank you, ${name} with email: ${email} with email: ${role} we have received your submission`)
  res.status(201).json({
    message:"create data succesfully",
    data:{
      name: name, 
      email: email,
      role: role,
    }
  })
})

// create handling http GET Detail customers for Api customers
app.get("/api/customers/:id",(req,res)=>{
  const customerID = req.params.id;//request params by id customers
  res.status(200).json({
    massage:'get succes',
    data:
    {
      customerID: customerID,
      name:'Fajar N S',
      email:'fajarnurs@gmail.com',
      role:'goldlane',
    }
  })
})



// define listener port using 3000
const port = 3000;
app.listen(port,()=>{
  console.log(`App is listening on port ${port}`)
})