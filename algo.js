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