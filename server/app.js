const express = require('express');
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const cors = require('cors');
const auth = require('./routes/auth');
const users = require('./routes/users');
const recipes = require('./routes/recipes');


mongoose.connect('mongodb://localhost/recipesapi', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Could not connect to MongoDB...'))

app.use(cors());
app.use(express.json());

//routes
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/recipes", recipes);


const port = 8181;
http.listen(port, () => console.log(`Listening on port ${port}...`));

