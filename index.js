var DEFAULT_PARAGRAPH = 'If you want to jumpstart the process of talking to us about this role, heres a little challenge: write a program that outputs the largest set of characters that can be removed from this paragraph without letting its length drop below 50.';
var DEFAULT_MINIMUM_CHARACTER = 50;

function subtractCharsFromParagraph(paragraph, minimumCharactersLeft) {
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
    var paragraphContent = $paragraphInput.val() || DEFAULT_PARAGRAPH;
    var minimumCharacterContent = $minimumCharacterInput.val() || DEFAULT_MINIMUM_CHARACTER;
    if (paragraphContent.length <= minimumCharacterContent) {
      var $minimumCharacterInput_error = $('label#minimumCharacterInput_error');
      var $minimumCharacterInput = $('input.minimumCharacterInput');
      $minimumCharacterInput_error.show();
      $minimumCharacterInput.focus();
      return false;
    }
    
    var answer = subtractCharsFromParagraph(paragraphContent, minimumCharacterContent);
    
    var answerText = '';
    if (answer.length) answerText += ("['" + answer[0] + "'");
    
    for (var i = 1; i < answer.length; i++) {
      answerText += ", '"
      answerText += answer[i];
      answerText += "'"
    }
    
    answerText += ']'
    
    if (!answer.length) answerText = "There was no character that could be removed without going under the minimum threshold.";
    
    var $answerOutput = $(".answerOutput");
    // var $answerTextNode = document.createTextNode("Answer: " + answerText);
    $answerOutput.text(answerText);
    
    var $paragraphOutput = $('.paragraphOutput');
    // var $paragraphTextNode = document.createTextNode("Paragraph: " + paragraphContent);
    
    $paragraphOutput.text(paragraphContent); 
  });
});
