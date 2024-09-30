const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://pandeprakhar1801:cEtdEgYSzuzKAYDy@ploggify.0wx5z.mongodb.net/?retryWrites=true&w=majority&appName=ploggify')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
    username : String,
    useremail : String,
    userpassword : String,
    userphno : String,
    userage : String,
    usergender : String,
    userexperience : String
});

const userModel = mongoose.model("userModel", userSchema);

app.post('/api/data', async (req, res) => {
    try {
      const receivedData = req.body.data;
      console.log('Received data:', receivedData);

      putData(receivedData);
    }
    catch(error){
        console.log("data received");
    }});

function putData(receivedData){
    const newUser = new userModel(receivedData);

    userModel.insertMany(newUser)
    .then(user => console.log('User saved:', user))
    .catch(err => console.error('Error saving user:', err));
}

function getData(){
    userModel.find()
    .then(users => console.log('All users:', users))
    .catch(err => console.error('Error retrieving users:', err));
}



// app.post("/api/data", (req,res) => {
//     res.json(userModel.find().then(function(users){
//         res.json(users);
//         console.log(users);
//     })).catch(function(err){
//         console.log('error');
//     });
// })

// const newUser = new userModel({
//     username : ,
//     useremail : ,
//     userpassword : ,
//     userphno : ,
//     userage : ,
//     usergender : ,
//     userexperience : 
// });

// userModel.insertMany(newUser)
//   .then(user => console.log('User saved:', user))
//   .catch(err => console.error('Error saving user:', err));


// userModel.find()
// .then(users => console.log('All users:', users))
// .catch(err => console.error('Error retrieving users:', err));

app.listen(5000, () => {
    console.log('server listening at 5000');
})