const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(
    'mongodb+srv://admin:OCvCYBbdUCwo39Gp@vuttr.gjxmq.mongodb.net/vuttrdb?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(express.json());

app.listen(3000, () => {
	console.log('server running on port 3000!')
})
