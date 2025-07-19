 const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/studentDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.log('MongoDB connection error:', err);
});


const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    course: String
});


const Student = mongoose.model('Student', studentSchema);


app.post('/add-student', async (req, res) => {
    try {
        const { name, email, course } = req.body;

        const newStudent = new Student({ name, email, course });
        await newStudent.save();

        res.send('Student added successfully');
    } catch (err) {
        res.status(500).send('Error adding student: ' + err.message);
    }
});


app.listen(3000, () => {
    console.log('Server chal raha hai on http://localhost:3000');
});
