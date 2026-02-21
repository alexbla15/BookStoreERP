const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api'); // ייבוא הקובץ שיצרנו

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use(cors()); // 2. אישור לכל המקורות (Origins) לגשת לשרת

// attaching all routes in api.js to start with /api
app.use('/api', apiRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
