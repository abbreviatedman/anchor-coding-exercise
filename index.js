function subtractCharsFromParagraph(paragraph, minimumCharactersLeft) {
  if (!paragraph.length) throw Error('No characters were passed in!')
  if (paragraph.length < minimumCharactersLeft) throw Error('There must be at least' + minimumCharactersLeft + 'characters in the paragraph.');
  
  var hash = {};
  for (var i = 0; i < paragraph.length; i++) {
    var char = paragraph[i];
    if (!(char in hash)) hash[char] = 0;
    hash[char]++;
  }
  
  var keys = Object.keys(hash);
  var charsInDescendingOrder = keys.sort(function(key1, key2) {
    return hash[key2] - hash[key1];
  });
  
  var length = paragraph.length;
  var answer = [];
  while (length >= minimumCharactersLeft && charsInDescendingOrder.length) {
    var currentChar = charsInDescendingOrder.pop();
    var currentCount = hash[currentChar];
    length -= currentCount;
    if (length >= minimumCharactersLeft) answer.push(currentChar);
  }
  
  return answer;
}

$(document).ready(function() {
  var $error = $('.error');
  $error.hide();
  
  var $button = $('.button');
  $button.click(function (event) {
    event.preventDefault();
    $error.hide();
    
    var $paragraphInput = $('.paragraphInput');
    var $minimumCharacterInput = $('.minimumCharacterInput');
    var paragraphContent = $paragraphInput.val();
    var minimumCharacterContent = $minimumCharacterInput.val();
    
    var answer = subtractCharsFromParagraph(paragraphContent, minimumCharacterContent);
    
    var answerText = '';
    if (answer.length) answerText += ("['" + answer[0] + "'");
    else answerText += '[';
    
    for (var i = 1; i < answer.length; i++) {
      answerText += ", '"
      answerText += answer[i];
      answerText += "'"
    }
    answerText += ']'
    
    var $answer = $(".answer");
    $answer.append(document.createTextNode(answerText));
    
    var $paragraphDisplay = $('.paragraphDisplay');
    $paragraphDisplay.append(document.createTextNode(paragraphContent)); 
    var $characterMinimumDisplay = $('.characterMinimumDisplay');
    $characterMinimumDisplay.append(document.createTextNode(minimumCharacterContent));
  });
});
