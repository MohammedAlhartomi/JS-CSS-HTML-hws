const express = require('express');
const app = express();
const ejs = require('ejs');
app.set('view engine', 'ejs');
const pokemon = require('./models/pokemon.js');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:false}));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));



app.get('/pokemon', function(req, res){
    res.render('index',{ pokemon:pokemon});
});  

app.post('/pokemon', function(req, res){
    var data = req.body;
    var poke={id:"",stats:{}};
    poke.id  = (pokemon.length+1)+"";
    poke.name = data.name;
    poke.img = data.img;
    poke.type = [data.type1,data.type2];
    poke.stats.hp=data.hp;
    poke.stats.attack=data.attack;
    poke.stats.defense=data.defense;
    poke.stats.spattack=data.spattack;
    poke.stats.spdefense=data.spdefense;
    poke.stats.speed=data.speed;
    pokemon.push(poke);
    res.redirect(`/pokemon`);

});  

app.get('/pokemon/new', function(req, res){
    res.render('new');
});  


app.get('/pokemon/:id', function(req, res){
    var poke = pokemon.filter((element) => element.id===req.params.id );
    res.render('pokemon',{ pokemon:poke[0]});
});  

app.put('/pokemon/:id', function(req, res){
    var data = req.body;
    var poke = pokemon.filter((element) => element.id===req.params.id )[0];
    var indexOfp=pokemon.indexOf(poke);
    poke.name = data.name;
    poke.img = data.img;
    poke.type[0] = data.type1;
    poke.type[1] = data.type2;
    poke.stats.hp=data.hp;
    poke.stats.attack=data.attack;
    poke.stats.defense=data.defense;
    poke.stats.spattack=data.spattack;
    poke.stats.spdefense=data.spdefense;
    poke.stats.speed=data.speed;

    //pokemon[indexOfp] = poke;
    res.redirect(`/pokemon/${req.params.id}`);
});  

app.delete('/pokemon/:id', function(req, res){

  const pokemonID = pokemon.findIndex((element)=>{
      return req.params.id === element.id;
  });

  pokemon.splice(pokemonID, 1);
  res.redirect('/pokemon');
});  

app.get('/pokemon/:id/edit', function(req, res){
    var poke = pokemon.filter((element) => element.id===req.params.id );
    console.log(pokemon[pokemon.length-1]);
    res.render('edit',{poke:poke[0]});
});  





app.listen(3000);