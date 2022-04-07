import express from 'express';
import bodyParser from 'body-parser';
import { createRequire } from 'module';
import cors from 'cors';

import postRoutes from './routes/posts.js';


// App Router Initialize
const PORT = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));


// MongoDB Initialize
const require = createRequire(import.meta.url);
const {MongoClient} = require('mongodb');
const CRYPTO = require('crypto');


// MongoDB Atlas connection
const CONNECTION_URL = 'mongodb+srv://webappauth:cp476project@cluster0.6asvl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MDB = new MongoClient(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true});
var ObjectId = require("mongodb").ObjectId;

// app.use('/posts', postRoutes);


app.get('/home', function(req, res, next) {
    var response = "";
    var email = req.query.email;

    // Connect to MongoDB Database
    MDB.connect(err => {
        const collection = MDB.db("jaldiio").collection("users");
        
        // Send Username
        var query = {"Email": email};
        collection.find(query).toArray(function(err, result) {
            if (err) throw err;
            if (result > 0) {
                response = result[0]["Name"];
                res.send(response);
                console.log("[HOME] " + response);
            }
            
        });
    });

    
    
});




app.get('/login', function(req, res, next) {
    var response = "";
    
    // Data from Form
    var email = req.query.email;
    var password = req.query.password;


    // Setting Hashing Algorithm, Passing data to be hashed, Creating the hash in the required format
    var hash = CRYPTO.createHash('sha1');
    var hashData = hash.update(password, 'utf-8');
    var encryptPass = hashData.digest('hex');
    

    // Connect to MongoDB Database
    MDB.connect(err => {
        const collection = MDB.db("jaldiio").collection("users");
        
        // Check if account already exists
        var query = {"Email": email, "Password": encryptPass};
        collection.find(query).toArray(function(err, result) {
            if (err) throw err;
            
            // Send Successful Login Message
            if (result.length > 0) {
                response = "Successful Login";
                res.send(response);
                console.log("[LOGIN] " + response);
            }

            // Send Incorrect Email or Password Message
            else {
                response = "Incorrect Email or Password";
                res.send(response);
                console.log("[LOGIN] " + response);
            }
        });
    });
});

app.get('/signup', function(req, res, next) {
    var response = "";
    
    // Data from Form
    var name = req.query.name;
    var email = req.query.email;
    var password = req.query.password;


    // Setting Hashing Algorithm, Passing data to be hashed, Creating the hash in the required format
    var hash = CRYPTO.createHash('sha1');
    var hashData = hash.update(password, 'utf-8');
    var encryptPass = hashData.digest('hex');
    

    // Connect to MongoDB Database
    MDB.connect(err => {
        const collection = MDB.db("jaldiio").collection("users");
        
        
        // Check if account already exists
        var query = {"Email": email};
        collection.find(query).toArray(function(err, result) {
            if (err) throw err;
            
            // If account already exists
            if (result.length > 0) {
                response = "Existing User Found";
                res.send(response);
                console.log("[SIGN UP] " + response);
            }

            // Add new user to DB
            else {

                // JSON format of data to be inserted
                var data = {
                    "Name": name,
                    "Email": email,
                    "Password": encryptPass,
                    "DOB": "",
                    "FamCode": ""
                }

                // Insert User Data
                collection.insertOne(data, function(err, resp) {
                    if (err) throw err;
                    response = "Account Created";
                    res.send(response);
                    console.log("[SIGN UP] " + response);
                });
            }
        });
    });
});


app.get('/create-family', function(req, res, next) {
    var response = "";
    var email = req.query.email;
    var famcode = req.query.famcode;


    MDB.connect(err => {
        const collection = MDB.db("jaldiio").collection("families");
        
        
        // Check if account already exists
        var query = {"FamCode": famcode};
        collection.find(query).toArray(function(err, result) {
            if (err) throw err;
            
            // If account already exists
            if (result.length > 0) {
                response = "Existing Family Found";
                res.send(response);
                console.log("[CREATE FAMILY] " + response);
            }

            // Add new family to DB
            else {

                // JSON format of data to be inserted
                var data = {
                    "Admin": email,
                    "FamCode": famcode,
                    "Members": [email]
                }

                // Insert Family Data
                collection.insertOne(data, function(err, resp) {
                    if (err) throw err;
                    response = "Family Created";
                    console.log("[CREATE FAMILY] " + response);
                });
            }
        });
    });


    // Connect to MongoDB Database
    MDB.connect(err => {
        const collection = MDB.db("jaldiio").collection("users");
        
        // Updating value
        var query = {"Email": email};
        var newData = {$set: {FamCode: famcode}};
        collection.updateOne(query, newData, function(err, result) {
            if (err) throw err;
            console.log("[CREATE FAMILY] Family code added");
        });
    });
});




app.get('/calendar', function(req, res, next) {
    var response = "";
    
    // Data from Form
    var title = req.query.title;
    var dateStart = req.query.dateStart;
    var dateEnd = req.query.dateEnd;
    var notes = req.query.notes;


    // // Setting Hashing Algorithm, Passing data to be hashed, Creating the hash in the required format
    // var hash = CRYPTO.createHash('sha1');
    // var hashData = hash.update(password, 'utf-8');
    // var encryptPass = hashData.digest('hex');
    

    // Connect to MongoDB Database
    MDB.connect(err => {
        const collection = MDB.db("jaldiio").collection("Calendar");
        
        // Check if account already exists
        var query = {"Title": title};
        collection.find(query).toArray(function(err, result) {
            if (err) throw err;
            
            // Send Successful Event Message
            if (result.length > 0) {
                response = "Event Already Exists";
                res.send(response);
                console.log("[Event] " + response);
            }

            // Add new user to DB
            else {

                // JSON format of data to be inserted
                var data = {
                    "Title": title,
                    "DateStart": dateStart,
                    "DateEnd": dateEnd,
                    "Notes": notes
                }

                // Insert User Data
                collection.insertOne(data, function(err, res) {
                    if (err) throw err;
                    response = "User Added to DB";
                    // res.send(response);
                    console.log("[Event] " + response);
                });
            }
        });
    });
});




app.get('/Recipe', function(req, res, next) {
    var response = "";
    var id = req.query["id"];

    MDB.connect(err => {
        const collection = MDB.db("jaldiio").collection("Recipes");
        
        // Check if account already exists
        console.log(ObjectId(id));
        var query = {_id: ObjectId(id)};
        collection.find(query).toArray(function(err, result) {
            if (err) throw err;
            
            // Send Successful Login Message
            if (result.length > 0) {
                response = "Recipe already added";
                res.send(result);
                console.log("[ADDRECIPE]" + response);
            }

            // Send Incorrect Email or Password Message
            else {
                response = "Unsucessfull";
                res.send(response);
                console.log("[ADDRECIPE] " + response);
            }
        });
    });
});

app.post('/CreateRecipe', function(req, res, next) {

    var jsonString = req.body;
    var jsonRequest = JSON.parse(JSON.stringify(jsonString));

    var query = {Title: jsonRequest.title, Ingridients: jsonRequest.ingr, Instructions: jsonRequest.inst, Author: jsonRequest.auth }

    console.log("BSDK");

    MongoClient.connect(CONNECTION_URL, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("jaldiio");
    
        dbo.collection("Recipes").insert(query);
        res.send(query);
      });

});

app.get('/DeleteRecipe', function(req, res, next) {
    var id = req.query["id"];

    var query = {_id: ObjectId(id)};
    console.log("NSAKJ");
    
    MongoClient.connect(CONNECTION_URL, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("jaldiio");
        
        dbo.collection("Recipes").deleteOne(query);
        res.send(query);
        
      });
});

app.get('/FindRecipe', function(req, res, next) {
    var id = req.query['id'];
    var query = {_id: ObjectId(id)}

    MongoClient.connect(CONNECTION_URL, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("jaldiio");

        dbo.collection("Recipes").find(query).limit(1).next(function(err, doc){
            res.send(doc);
         })
    });
});

app.post('/EditRecipe', function(req, res, next) {
    var jsonString = req.body;
    var jsonRequest = JSON.parse(JSON.stringify(jsonString));

    var id = jsonRequest._id;
    console.log(id);
    var query = {Title: jsonRequest.title, Ingridients: jsonRequest.ingr, Instructions: jsonRequest.inst, Author: jsonRequest.auth }

    MongoClient.connect(CONNECTION_URL, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("jaldiio");
        
        // try {
          dbo.collection("Recipes").updateMany({_id : ObjectId(id)}, {$set : query});
        // } catch (error) {
        //   dbo.collection("Recipes").updateOne({_id : ObjectId(id["$oid"])}, {$set : query});
        // }
        res.send(query);        
      });
});

app.get('/RecipeHome', function(req, res, next) {
    var response = "";
    
    // Data from Form
    var title = req.query.title;
    var auth = req.query.auth;

    // // Setting Hashing Algorithm, Passing data to be hashed, Creating the hash in the required format
    // var hash = CRYPTO.createHash('sha1');
    // var hashData = hash.update(password, 'utf-8');
    // var encryptPass = hashData.digest('hex');
    

    // Connect to MongoDB Database
    MDB.connect(err => {
        const collection = MDB.db("jaldiio").collection("Recipes");
        
        // Query
        var query = {};
        collection.find(query).toArray(function(err, result) {
            if (err) throw err;
            
            // Send Successful extraction message
            if (result.length > 0) {
                response = "All recipes extracted";
                res.send(result);
                console.log("[RecipeBBB]" + result);
            }

            // Send pmpty list
            else {
                response = "Unsucessfull";
                res.send(response);
                console.log("[RECIPEBBB] " + response);
            }
        });
    });
});

