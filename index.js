const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

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
      
      const result = await putData(receivedData);
      res.send(result);
    }
    catch(error){
        console.log("data not received");
    }});

app.post('/api/login_data', async(req,res) => {
    try{
        const receivedLogin = req.body.data;
        console.log('Received Login data:', receivedLogin);

        const result = await getData(receivedLogin);
        res.send(result);
    }
    catch(error){
        console.log("login data not received");
        return 'error';
    }});

async function putData(data) {
    try {
        const newUser = new userModel(data);
        const user = await userModel.insertMany(newUser); // Await the insert operation
        return 'user registration successful !!';
    } catch (err) {
        console.error('Error saving user:', err);
    }
};

// function putData(data){
//     const newUser = new userModel(data);

//     userModel.insertMany(newUser)
//     .then(user => console.log('User saved:', user))
//     .catch(err => console.error('Error saving user:', err));
// }

async function getData(receivedLogin) {
    try {
        const users = await userModel.findOne({ useremail: receivedLogin.useremail });

        if(users == null){
            return 'no data found !! \n Please create new account !';
        }
        else{
            if(receivedLogin.userpassword === users.userpassword){
                return 'success';
            }
            else{
                return 'incorect password';
            }
        }
    } catch (err) {
        console.error('Error retrieving users:', err);
    }
}

// function getData(receivedLogin){
//     userModel.findOne({useremail:receivedLogin.useremail})
//     .then(users => console.log('All users:', users))
//     .catch(err => console.error('Error retrieving users:', err));
// };

// function getData(){
//     userModel.find()
//     .then(users => console.log('All users:', users))
//     .catch(err => console.error('Error retrieving users:', err));
//     };

app.listen(5000, () => {
    console.log('server listening at 5000');
})