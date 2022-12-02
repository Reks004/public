const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose')

//Importing User Schema
const User = require('./models/users');


//Creating expess app
const app = express();
const port = 8080;

//Request body middleware
app.use(express.json());

//Connect to  MongoDB
const dbURI = 'mongodb+srv://reks004:Acmilan13@cluster0.iwp0xf4.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then((results) => 

    //Listen for request
    app.listen(port, () => console.log('Server is running, connected to db')))
    .catch((err) => console.log('Connection to database failed')
)

//Setting up Https Authentication middleware
// app.use('/users', (req , res , next) => {
//     if(!req.get('Authorization')){
//         const err = new Error('Not authenticated');
//         res.status(401).set('WWW-Authenticate', 'Basic')
//         next(err);
//     }else{
//         const credentials = Buffer.from(req.get('Authorization').split(' ')[1], 'base64')
//         .toString()
//         .split(':');

        
//         const username = credentials[0];
//         const password = credentials[1];
        
//         //Credentials authentication
//         if (!(username === 'test' && password === 'pass1234')){
//             const err = new Error('Invalid Credentials');
//             res.status(401).set('WWW-Authenticate' , 'Basic');
//             next(err);
//         }


//         console.log(`Welcome ${username}`)
//         next();
//     };
    
// });


//Handling get request to /users route
 app.get('/users/:id', (req, res, next) => {
    
    if (req.query){
        const id = req.params.id;
        console.log(id);
        User.findById(id)
        .then(results => res.status(200).send(results))
        .catch(err => next(err));
    }
    
   

})

//Handling put request
app.put('/users/:id' , (req, res, next) => {
    const id = req.params.id;
    const newUser = req.body;
    User.findByIdAndUpdate(id , newUser)
    .then(results => res.status(200).send(newUser))
    .catch(err => {next(err)});

})

//Handling get request
app.get('/users' , (req , res, next) => {
    // Filter Database results;
    const filter_field = req.query.filter_field;
    const filter_value = req.query.filter_value
    const queryArg = {
        [filter_field]: filter_value
    }
    
    console.log(filter_field, filter_value);
    User.find(queryArg)
    .then(results => res.status(200).send(results))
    .catch(err => res.status(400).send(results));

    });

//Handling delete request
app.delete('/users/:id', (req , res, next) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
    .then(results =>  res.status(200).send('Delete successfull'))
    .catch(err => next(err));

});

//Handling post request
app.post('/users', (req , res) =>{
    const newUser = (req.body);

    //Creating user model;
    const user = new User({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        gender: newUser.gender,
        date_of_birth: newUser.date_of_birth
    });

    //Saving to database
    user.save()
    .then(results => res.status(200).send(results))
    .catch(err => console.log(err));

})
