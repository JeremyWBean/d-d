var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    methodOverride = require('method-override'),
    expressSanitizer = require('express-sanitizer');
    
//app config
mongoose.connect('mongodb://localhost/dnd-app');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride('_method'));

//Mognoose/Model config
var characterSchema = new mongoose.Schema({
    name: String,
    image: String,
    background: String,
    level: {type: Number, default: 1},
    HP: Number,
    AC: Number,
    home: String,
    race: String,
    clas: String,
    age: Number,
    sex: String,
    height: String,
    weight: String,
    hair: String,
    eyes: String,
    handedness: String,
    STR: Number,
    INT: Number,
    WIS: Number,
    DEX: Number,
    CON: Number,
    CHR: Number,
    baseMove: Number,
    modMove: Number,
    talent: Array
});

var Character = mongoose.model("Character", characterSchema);

// Character.create({
//     name: "Silas",
//     image: 'http://i728.photobucket.com/albums/ww286/greyhseer/Warhammer/DwarfCover_zps41c42881.jpg',
//     HP: 20,
//     AC: 8,
//     race: 'Human',
//     clas: 'Warrior',
//     age: 24,
//     sex: 'Male',
//     height: '6 Feet',
//     weight: 220,
//     hair: 'Gray',
//     eyes: 'Black',
//     handedness: 'right',
//     STR: 2,
//     INT: 12,
//     WIS: 44,
//     DEX: 55,
//     CON: 22,
//     CHR: 8,
//     baseMove: 20,
//     modMove: 10,
//     talent: []
// });


//landing page
app.get('/', function(req,res){
    res.render('landing');
});

//index route (characters)
app.get('/characters', function(req,res){
    Character.find({}, function(err, characters){
        if(err){
            throw err;
        } else {
            res.render('characters', {characters: characters});
        }
    });
});

//new route
app.get('/characters/new', function(req,res){
    res.render('new');
});

//create route
app.post('/characters', function(req,res){
    Character.create(req.body.character, function(err, newChar){
        if(err){
            throw err;
        } else {
            res.redirect('/characters');
        }
    });
});

//show route
app.get('/characters/:id', function(req,res){
    Character.findById(req.params.id, function(err,foundChar){
        if(err){
            throw err;
        } else {
            res.render('show', {character: foundChar});
        }
    });
});

//edit route
app.get('/characters/:id/edit', function(req, res) {
    Character.findById(req.params.id, function(err, foundChar) {
        if(err){
            throw err;
        } else {
            res.render('edit', {character: foundChar});
        }
    });
});

//update route
app.put('/characters/:id', function(req,res){
    Character.findByIdAndUpdate(req.params.id, req.body.character, function(err, updatedChar){
        if(err){
            throw err;
        } else {
            res.redirect('/characters/' + req.params.id);
        }
    });
});

//destroy route
app.delete('/characters/:id', function(req,res){
    Character.findByIdAndRemove(req.params.id, function(err){
        if(err){
            throw err;
        } else {
            res.redirect('/characters');
        }
    });
});



app.listen(8080, function(err){
    if(err){
        throw err;
    } else {
        console.log('Server Running...');
    }
});