const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();

process.env.TZ = 'Asia/Kolkata';

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
let db = 'mongodb+srv://admin:admin@cluster0.hjde2ex.mongodb.net/Netizens'
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('connected to database');
	})
	.catch(() => {
		console.log('Mongodb connection error');
	});

// enable cors

app.use(cors());
app.options('*', cors());
app.use(cors({
	origin: '*',
	methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
	allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
}));

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		'Access-Control-Allow-Headers : "Origin, X-Requested-With, Content-Type, Accept'
	);
	res.header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "*")
	next();
});

app.use(express.json());

app.use('/api/v1/movie', require('./route/movie'));


// send back a 404 error for any unknown api request
app.all('*', (req, res, next) => {
	next(new ErrorResponse(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use((err, req, res, next) => {
	errorHandler(err, req, res, next);
});


const port = process.env.PORT || 3000;


app.listen(port, () =>
	console.log(`server in running on PORT: ${port}`)
);


module.exports = app;