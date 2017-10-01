function subtractCharsFromParagraph(paragraph, minimumCharactersLeft) {
  if (!paragraph.length) throw Error('No characters were passed in!')
  if (paragraph.length < minimumCharactersLeft) throw Error('There must be at least' + minimumCharactersLeft + 'characters in the paragraph.');
  
  var $paragraph = $('.paragraph');
  $paragraph.append(document.createTextNode(paragraph)); 
  var $minimumCharactersLeft = $('.minimumCharactersLeft');
  $minimumCharactersLeft.append(document.createTextNode(minimumCharactersLeft));
  
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
  
  var $answer = $(".answer");
  var text = '';
  if (answer.length) text += ("['" + answer[0] + "'");
  else text += '[';
  
  for (var i = 1; i < answer.length; i++) {
    text += ", '"
    text += answer[i];
    text += "'"
  }
  text += ']'
  
  $answer.append(document.createTextNode(text));
}

var example = 'If you want to jumpstart the process of talking to us about this role, heres a little challenge: write a program that outputs the largest set of characters that can be removed from this paragraph without letting its length drop below 50.'

$(document).ready(function() {
  var $error = $('.error');
  $error.hide();
  
  var $button = $('.button');
  $button.click(function (event) {
    event.preventDefault();
    $error.hide();
    var $paragraph = $('input#paragraph');
    var $charMinimum = $('input#charMinimum');
    var paragraphContent = $paragraph.val();
    var charMinimumContent = $charMinimum.val();
    subtractCharsFromParagraph(paragraphContent, charMinimumContent);
  });
});
