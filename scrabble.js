// ==============SCRABBLE 'CLASS'================

var Scrabble = {};

// Get the score for a single letter
Scrabble.scoreLetter = function(letter) {
  letter = letter.toUpperCase();
  var letters = ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T', 'D', 'G', 'B', 'C', 'M', 'P', 'F', 'H', 'V', 'W', 'Y', 'K', 'J', 'X', 'Q', 'Z'];
  var scores = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 8, 8, 10, 10];
  for (var i = 0; i < letters.length; i++){
    if (letters[i] == letter){
      return scores[i];
    }
  }
  return 0;
}

// Get the score for a word (based on the characters that compose it and whether it has 7 letters)
Scrabble.score = function(word) {
  var total = 0;
  for (var i = 0; i < word.length; i++){
    total += Scrabble.scoreLetter(word[i]);
  }
  if (word.length == 7){
    total += 50;
  }
  return total;
}

// Get the highest-scoring word, taking into account bonuses related to word length. Thanks
// to Sassa for showing me her solution, which my refactoring below is based on.
Scrabble.highestScoreFrom = function(arrayOfWords) {
  if (arrayOfWords == []){
    return null;   // If there is nothing in the array, return null as the highest scoring word
  } else if (arrayOfWords.length == 1) {
    return arrayOfWords[0]; // If there is only one thing, return that thing and don't bother with loops
  }

  //If we got here, there are multiple words in the array
  var highest = [arrayOfWords[0], Scrabble.score (arrayOfWords[0])];

  for (var i = 0; i < arrayOfWords.length; i++){
    var score = Scrabble.score(arrayOfWords[i]);
    if (score > highest[1]) {
      highest = [arrayOfWords[i], score];
    } else if (score == highest[1]) {
      if ((arrayOfWords[i].length == 7 && highest[0].length != 7) ||
          (arrayOfWords[i].length < highest[0].length && highest[0].length != 7)) {
            highest = [arrayOfWords[i], score];
      }
    }
  }
  return highest[0];
}

// Testing:
console.log(Scrabble.highestScoreFrom(['dq', 'ZZZZZZ', 'turtle', 'AAAAAAF', 'QQQQQQ', 'bob', 'FAAAAAA']));
console.log("Score for Q: " + Scrabble.scoreLetter('q'));

// ==============PLAYER 'CLASS'================

function Player(name) {
  this.name = name;
  this.plays = [];
}

Player.prototype.hasWon = function() {
  return this.totalScore() > 100;
}

Player.prototype.totalScore = function() {
  var total = 0;
  for (var i = 0; i < this.plays.length; i++){
    total += Scrabble.score(this.plays[i]);
  }
  return total;
}

Player.prototype.highestScoringWord = function() {
  return Scrabble.highestScoreFrom(this.plays);
}

Player.prototype.highestWordScore = function() {
  return Scrabble.score(Scrabble.highestScoreFrom(this.plays));
}

Player.prototype.play = function(word) {
  if (this.hasWon()){
    return false;
  } else {
    this.plays.push(word);
  }
}

// Testing:
bob = new Player('Bob');
console.log(bob);
bob.play('aaaa');
bob.play('aaaaaaa');
bob.play('aaa');
console.log(bob);
console.log("Bob has already won: " + bob.hasWon());
bob.play('QQQQQQQ');
console.log(bob);
console.log("Bob has already won: " + bob.hasWon());
bob.play('aaaaaaf');
console.log(bob);
console.log("Bob has already won: " + bob.hasWon());

console.log(bob.highestScoringWord());
console.log(bob.highestWordScore());
console.log(bob.totalScore());
console.log(bob.plays);

// ==============TILEBAG 'CLASS'================

function Tilebag (){
  this.tiles = ['J', 'K', 'Q', 'X', 'Z',
                'B', 'B',
                'C', 'C',
                'F', 'F',
                'H', 'H',
                'M', 'M',
                'P', 'P',
                'V', 'V',
                'W', 'W',
                'Y', 'Y',
                'G', 'G', 'G',
                'D', 'D', 'D', 'D',
                'L', 'L', 'L', 'L',
                'S', 'S', 'S', 'S',
                'U', 'U', 'U', 'U',
                'T', 'T', 'T', 'T', 'T', 'T',
                'R', 'R', 'R', 'R', 'R', 'R',
                'N', 'N', 'N', 'N', 'N', 'N',
                'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',
                'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A',
                'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I',
                'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'];
}

Tilebag.prototype.drawTiles = function(num){
  if (num > this.tiles.length){
    return false; // You are trying to draw more tiles than the tilebag contains
  } else {
    tilesPicked = []
    for (var i = 0; i < num; i++){
      var chosen = Math.floor(Math.random() * this.tiles.length);
      tilesPicked.push(this.tiles.splice(chosen, 1)[0]);
    }
    return tilesPicked;
  }
}

Tilebag.prototype.tilesRemaining = function(){
  return this.tiles;
}

// Testing:
myTiles = new Tilebag();
console.log("Initial size of tilebag:" + myTiles.tiles.length);
console.log(myTiles.drawTiles(7));
console.log("New size of tilebag:" + myTiles.tilesRemaining);
console.log(myTiles.tiles);


module.exports = Scrabble, Player;
