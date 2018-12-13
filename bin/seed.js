const mongoose = require('mongoose');
const Guide = require('../models/guide');


mongoose.connect('mongodb://localhost/traveleez', {
 keepAlive: true,
 useNewUrlParser: true,
 reconnectTries: Number.MAX_VALUE
});

const guides = [
 {
    title: 'hello',
    date: 'hello',
    time: 'hello',
    description: 'hello',
    location: 'hello',
    expertise: 'hello',
    duration: 2,
 },
 {
    title: 'hello',
    date: 'hello',
    time: 'hello',
    description: 'hello',
    location: 'hello',
    expertise: 'hello',
    duration: 2,
 },
 {
    title: 'hello',
    date: 'hello',
    time: 'hello',
    description: 'hello',
    location: 'hello',
    expertise: 'hello',
    duration: 2,
 },
];

Guide.create(guides)
 .then(() => {
   mongoose.connection.close();
 })
 .catch(error => {
   console.error(error);
});