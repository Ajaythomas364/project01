const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/hostels', require('./routes/hostels'));
app.use('/api/mess', require('./routes/mess'));
app.use('/api/bookings/hostel', require('./routes/bookings'));
app.use('/api/subscriptions/mess', require('./routes/subscriptions'));
app.use('/uploads', express.static('uploads'));
app.use('/api/upload', require('./routes/upload'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


