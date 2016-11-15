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

// Get the score for a word (based only on the characters that compose it)
Scrabble.score = function(word) {
  var total = 0;
  for (var i = 0; i < word.length; i++){
    total += Scrabble.scoreLetter(word[i]);
  }
  return total;
}

// Get the highest-scoring word, taking into account bonuses related to word length
Scrabble.highestScoreFrom = function(arrayOfWords) {
  var arrayOfScores = [];
  for (var i = 0; i < arrayOfWords.length; i++){
    arrayOfScores[i] = Scrabble.score(arrayOfWords[i]);
    if (arrayOfWords[i].length == 7){
      arrayOfScores[i] += 50;
    } else if (arrayOfWords[i].length > 7){
      arrayOfScores[i] = -1; // Something went wrong if this was reached - you only have 7 tiles in Scrabble.
    }
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

console.log(Scrabble.highestScoreFrom(['dq', 'ZZZZZZ', 'turtle', 'AAAAAA', 'QQQQQQ', 'bob', 'FAAAAA']));
// console.log("Score for Q: " + Scrabble.scoreLetter('q'));

module.exports = Scrabble;
