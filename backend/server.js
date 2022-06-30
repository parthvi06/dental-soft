const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});
const patientRouter = require('./routes/patients');
app.use('/patients', patientRouter);

const appointmentRouter = require('./routes/appointments');
app.use('/appointments', appointmentRouter);

const paymentRouter = require('./routes/payments');
app.use('/payments', paymentRouter);

app.use(express.static('public'));
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});