/*
 * @Author: Mujib Ansari 
 * @Date: 2018-03-24 15:50:33 
 * @Last Modified by: Mujib Ansari
 * @Last Modified time: 2018-03-24 21:42:37
 */


var fs = require( 'fs' ),

    cookieParser = require( 'cookie-parser' ),    
    bodyParser = require( 'body-parser' ),    

    compression = require( 'compression' ),

    logger = require( 'morgan' ),

    mongoose = require( 'mongoose' ),

    helmet = require( 'helmet' ),

    express = require( 'express' ),
    app = new express(),
    
    mongoDBURL = 'mongodb://127.0.0.1:27017',
    db;

app.use( helmet() );
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( compression() );

mongoDB = process.env.MONGODB_URI || mongoDBURL;
mongoose.connect( mongoDB, {
    // useMongoClient: true
} );
mongoose.Promise = global.Promise;
db = mongoose.connection;
db.on( 'error', () => {
    console.error.bind( console, 'Mongo DB connection Error.' );
} );

// ---- Disabling favicon call
app.get('/favicon.ico', function(req, res) {
    res.status(204);
});

app.get( '/', ( req, res, next ) => {
    res.send( 'This is working...' );
} );

app.post( '/services/api/signup', ( req, res, next ) => {
    
    console.log( req.body );

    let { first_name, last_name }= req.body

    res.status(200).send( 'hello...'+ first_name );
} );

app.listen( 8013, () => {
    console.log( 'Server is working on http://localhost:8013' );
} );