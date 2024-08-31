const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/project_db')
    .then(() => {
        console.log("Successful connection to database 'project_db'"); 
    })
    .catch((error) => {
        console.log(`There was an error connecting to the database: ${error}`);
});