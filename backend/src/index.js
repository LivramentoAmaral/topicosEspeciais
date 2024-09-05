require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectando ao MongoDB'))
.catch(err => console.error(err));

app.use(cors());

app.use('/api', require('./routes/userRoutes'));
app.use('/api', require('./routes/patientRoutes'));
app.use('/api', require('./routes/appointmentRoutes'));
app.use('/api', require('./routes/doctorRoutes'));
app.use('/api', require('./routes/inventoryRoutes'));
app.use('/api', require('./routes/medicalRecordRoutes'));


app.get('/api', (req, res) => {
    res.send('Hello World!');
},);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
