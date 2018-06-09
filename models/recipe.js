var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RecipeSchema   = new Schema({
    name: String,
    date: Date,
    description: String
});

module.exports = mongoose.model('Recipe', RecipeSchema);