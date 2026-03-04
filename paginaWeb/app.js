const express = require('express'); 
const cors = require('cors');       
const path = require('path');
const fs = require('fs');

const app = express();              
const port = '3000';

app.use(cors());                    
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routing
const refugios_router = require('./routing/refugios-router');
app.use('/', refugios_router);

app.listen(port, function () {
    console.log("Server running on port " + port);
});