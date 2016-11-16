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

// Get the highest-scoring word, taking into account bonuses related to word length
Scrabble.highestScoreFrom = function(arrayOfWords) {
  if (arrayOfWords == []){
    return null;   // If there is nothing in the array, return null as the highest scoring word
  } else if (arrayOfWords.length == 1) {
    return arrayOfWords[0]; // If there is only one thing, return that thing and don't bother with loops
  }

  //If we got here, there are multiple words in the array
  var arrayOfScores = [];
  for (var i = 0; i < arrayOfWords.length; i++){
    arrayOfScores[i] = Scrabble.score(arrayOfWords[i]);
    // if (arrayOfWords[i].length > 7){
    //   arrayOfScores[i] = -1; // Something went wrong if this was reached - you only have 7 tiles in Scrabble.
    // }
  }
  var indexOfHighestYet = [0]; // Store the indices of the words whose scores match the highest score yet found

  // console.log(arrayOfScores);

  for (var i = 1; i < arrayOfScores.length; i++){
    // console.log(arrayOfScores[i] + ", " + arrayOfScores[indexOfHighestYet[0]]);
    if (arrayOfScores[i] > arrayOfScores[indexOfHighestYet[0]]){
      indexOfHighestYet = [i]; // Reset highest score array
    } else if (arrayOfScores[i] == arrayOfScores[indexOfHighestYet[0]]) {
      indexOfHighestYet.push(i); // Add to highest score array
    }
  }

  // console.log(indexOfHighestYet);

  if (indexOfHighestYet.length == 1) { // Only one word that got the highest score - return that word
    return arrayOfWords[indexOfHighestYet];
  } else {  // Multiple words with highest score
    var shortestYet = arrayOfWords[indexOfHighestYet[0]]; // First word in array of top scorers
    for (var i = 0; i < indexOfHighestYet.length; i++){
      if (arrayOfWords[indexOfHighestYet[i]].length == 7){
        return arrayOfWords[indexOfHighestYet[i]]; // Return the first top-scoring word we find that has 7 letters, if any
      } else if (arrayOfWords[indexOfHighestYet[i]].length < shortestYet.length) {
        shortestYet = arrayOfWords[indexOfHighestYet[i]]; // Keep track of the shortest word we've yet found among the high-score words
      }
    }
    return shortestYet; // If we got here, there was no 7-letter word, so we should return the shortest word we found
  }
}

function Player(name) {
  this.name = name;
  this.plays = [];
}

Player.prototype.hasWon = function() {
  if (this.totalScore() > 100){
    return true;
  } else {
    return false;
  }
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

// console.log(Scrabble.highestScoreFrom(['dq', 'ZZZZZZ', 'turtle', 'AAAAAA', 'QQQQQQ', 'bob', 'FAAAAA']));
// console.log("Score for Q: " + Scrabble.scoreLetter('q'));

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

module.exports = Scrabble;
