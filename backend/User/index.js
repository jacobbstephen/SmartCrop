const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 8000;

require('dotenv').config()
const app = express()
require('./db')
const User = require('./MODELS/userSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
app.use(bodyParser.json())
app.use(cors())
// fn that verifies the token
function authenticateToken(req, res, next) {
    // Token will be in the header section
    // const token = req.headers.authorization?.split(' ')[1]; // Optional chaining to avoid errors
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' }); // 401 Unauthorized
    }

    try {
        const decoded = jwt.verify(token, process.env.JWS_SECRET_KEY);
        
        req.id = decoded.id; // Attach the user ID to the request object

        next(); // Proceed to the next middleware or route handler (inbuilt in express)

    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' }); // 403 Forbidden
    }
}
// store the detials of prediction
app.post('/predictionresults', authenticateToken, async(req, res) => {
    const { N, P, K, temperature, humidity, ph, rainfall, predictedCrop } = req.body;
    try {
        const userId = req.id; // Get the user ID from the token

        // Find the user by ID
        const user = await User.findById(userId);
        
        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the previousData array
        user.previousData.push({ N, P, K, temperature, humidity, ph, rainfall, predictedCrop });

        // Save the updated user document
        await user.save();

        res.status(200).json({ message: "Data added successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// getProfile along with predictions
app.get('/getmyprofile', authenticateToken, async (req, res) => {
    const id = req.id;
    const user = await User.findById(id)
    user.password = undefined
    res.status(200).json({user})
})

// register api
app.post('/register', async(req, res) => {
    try{
        const { username, password, name} = req.body
        const existingUser = await User.findOne({username})
        if (existingUser){
            return res.status(409).json({message :  "User already exsits"})
        }

        // store the password in hashed format 
        // take a gp of characters and mix it with the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User ({
            name, 
            username,
            password : hashedPassword, 
            
        })
        await newUser.save()
        return res.status(200).json({
            message: "User Registered SUccesfully"
        })

    }catch(err){
        return res.status(400).json({message :  err.message})
    }
})

// login api
app.post('/login', async(req, res) => {
    try{
        const { username, password} = req.body
        const existingUser = await User.findOne({username})
        if (!existingUser){
            res.status(400).json({message :  'User does not exsist'})
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (! isPasswordCorrect){
            
            res.status(401).json({message :  'Invalid Credentials'})
        }
    

        // create a token using sign method
        // 1st part is payload => contents  that we want to store in the token
        // The secret key is like a password that is used to lock (sign) the token
        const accessToken = jwt.sign({id: existingUser._id}, process.env.JWS_SECRET_KEY, {
            expiresIn: '1h'
        })
        res.status(200).json({
            accessToken,
            message: 'User logged in successfully'
        })

    }catch(err){
        res.status(500).json({message :  err.message})
    }
})

app.get('/', (req, res) => {
    res.send("The API is working")
})
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})