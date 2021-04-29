const express = require('express');
// const path = require('path');
const app = express();
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}
// Init middleware
app.use(logger);
// a root route
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
// using middleware
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/subjects', require('./routes/api/subjects'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));