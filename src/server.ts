import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import routes from './routes/index';

const app = express();

mongoose.connect(
    'mongodb+srv://admin:OCvCYBbdUCwo39Gp@vuttr.gjxmq.mongodb.net/vuttrdb?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3000, () => {
	console.log('server running on port 3000!')
})
