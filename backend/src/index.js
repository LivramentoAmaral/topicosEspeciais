require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectando ao MongoDB'))
.catch(err => console.error(err));

// // Importando as rotas
// const patientRoutes = require('./routes/patientRoutes');
// const appointmentRoutes = require('./routes/appointmentRoutes');
// const medicalRecordRoutes = require('./routes/medicalRecordRoutes');
// const resourceRoutes = require('./routes/resourceRoutes');

// // Usando as rotas
// app.use('/api/patients', patientRoutes);
// app.use('/api/appointments', appointmentRoutes);
// app.use('/api/medical-records', medicalRecordRoutes);
// app.use('/api/resources', resourceRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
},);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
