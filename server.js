const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const authRoutes = require('./routes/auth');
const healthRoutes = require('./routes/health');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/', authRoutes);
app.use('/health', healthRoutes);

app.listen(port, () => console.log(`Running on port ${port}`));