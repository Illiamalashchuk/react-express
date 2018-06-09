var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var port = process.env.PORT || 5000;
var router = express.Router();              // get an instance of the express Router
var Recipe     = require('./models/recipe');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




mongoose.connect('mongodb://illiamalashchuk:football.ua123@ds127536.mlab.com:27536/malashchuk-database'); // connect to our database



// ROUTES FOR OUR API
// =============================================================================


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});



// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});


// more routes for our API will happen here

// on routes that end in /bears

router.route('/recipes')

    // create a bear (accessed at POST http://localhost:5000/api/bears)
    .post(function(req, res) {

        var recipe = new Recipe();      // create a new instance of the Bear model
        recipe.name = req.body.name;  // set the bears name (comes from the request)
        recipe.description = req.body.description;
        recipe.date = Date.now();

        // save the bear and check for errors
        recipe.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Recipe created!' });
        });

    })
    // get all the bears (accessed at GET http://localhost:5000/api/bears)
    .get(function(req, res) {
        Recipe.find(function(err, recipes) {
            if (err)
                res.send(err);

            res.json(recipes);
        });
    });

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/recipes/:recipe_id')

    // get the bear with that id (accessed at GET http://localhost:5000/api/bears/:bear_id)
    .get(function(req, res) {
        Recipe.findById(req.params.recipe_id, function(err, recipe) {
            if (err)
                res.send(err);
            res.json(recipe);
        });
    })
    
    // update the bear with this id (accessed at PUT http://localhost:5000/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Recipe.findById(req.params.recipe_id, function(err, recipe) {

            if (err)
                res.send(err);

            recipe.name = req.body.name;  // update the bears info
            recipe.description = req.body.description

            // save the bear
            recipe.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Recipe updated!' });
            });

        });
    })

    // delete the bear with this id (accessed at DELETE http://localhost:5000/api/bears/:bear_id)
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
app.listen(port);
console.log('Magic happens on port ' + port);

