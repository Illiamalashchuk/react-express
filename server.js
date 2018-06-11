var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 5000;
var router = express.Router();   // get an instance of the express Router
var Recipe = require('./models/recipe');
var path = require('path')

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "build")))

mongoose.connect('mongodb://illiamalashchuk:football.ua123@ds127536.mlab.com:27536/malashchuk-database'); // connect to our database


// ROUTES FOR OUR API

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/recipes')
    .post(function(req, res) {
        var recipe = new Recipe();      // create a new instance of the model
        recipe.name = req.body.name;  // set the bears name (comes from the request)
        recipe.description = req.body.description;
        recipe.date = Date.now();

        recipe.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Recipe created!' });
        });

    })
    // get all the bears 
    .get(function(req, res) {
        Recipe.find(function(err, recipes) {
            if (err)
                res.send(err);
            res.json(recipes);
        });
    });


// ----------------------------------------------------
router.route('/recipes/:recipe_id')
    .get(function(req, res) {
        Recipe.findById(req.params.recipe_id, function(err, recipe) {
            if (err)
                res.send(err);
            res.json(recipe);
        });
    })

    // update the recipe
    .put(function(req, res) {
        Recipe.findById(req.params.recipe_id, function(err, recipe) {
            if (err)
                res.send(err);
            recipe.name = req.body.name;  // update the recipe`s info
            recipe.description = req.body.description
            // save the recipe
            recipe.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Recipe updated!' });
            });

        });
    })

    // delete the recipe with this id 
    .delete(function(req, res) {
        Recipe.remove({
            _id: req.params.recipe_id
        }, function(err, recipe) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.get("*", (req, res) => {  
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(port);
console.log('Magic happens on port ' + port);

