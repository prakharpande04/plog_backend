const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://pandeprakhar1801:cEtdEgYSzuzKAYDy@ploggify.0wx5z.mongodb.net/?retryWrites=true&w=majority&appName=ploggify')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
    name : String,
    age : Number
});

const userModel = mongoose.model("userModel", userSchema);

app.post("/api/data", (req,res) => {
    res.json(userModel.find().then(function(users){
        res.json(users);
        console.log(users);
    })).catch(function(err){
        console.log('error');
    });
})

const newUser = new userModel({
    name : "Prakhar",
    age : 49
});

userModel.insertMany(newUser)
  .then(user => console.log('User saved:', user))
  .catch(err => console.error('Error saving user:', err));


userModel.find()
.then(users => console.log('All users:', users))
.catch(err => console.error('Error retrieving users:', err));

app.listen(5000, () => {
    console.log('server listening at 5000');
})