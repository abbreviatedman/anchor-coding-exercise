$(document).ready(function() {
  var DEFAULT_PARAGRAPH = 'If you want to jumpstart the process of talking to us about this role, heres a little challenge: write a program that outputs the largest set of characters that can be removed from this paragraph without letting its length drop below 50.';
  var DEFAULT_MINIMUM_CHARACTER = 50;
  var timer = 0;
  var $error = $('.error');
  $error.hide();
  
  var $button = $('.button');
  $button.click(function (event) {
    event.preventDefault();
    $error.hide();
    reset();
    
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
        
    var $paragraphOutput = $('.paragraphOutput');
    
    var paragraphArray = paragraphContent.split('');
    $paragraphOutput.empty();
    paragraphArray.forEach(function(letter) {
      var id = getId(letter)
      $paragraphOutput.append('<span style="transition: opacity 2s;" data-paragraph-id="' + id + '">' + letter + '</span>');
    });
    
    var $charactersRemainingOutput = $('.charactersRemainingOutput');
    $charactersRemainingOutput.text(paragraphArray.length);
    
    var answer = subtractCharsFromParagraph(paragraphContent, minimumCharacterContent);
    
    var answerText = '';
    if (answer.length) answerText += '<span data-answer-id="[">[</span>'
      + '<span class="invisible" data-answer-id="'
      + getId(answer[0])
      + '">'
      + "'"
      + answer[0]
      + "'</span>";
    
    for (var i = 1; i < answer.length; i++) {
      var letter = answer[i];
      var id = getId(letter)
      answerText += '<span data-answer-id="'
      + id
      + '" class="invisible">'
      + ", '"
      + letter
      + "'</span>"
    }
      
    answerText += '<span data-answer-id="]">]</span>'
    if (!answer.length) answerText = "There was no character that could be removed without going under the minimum threshold.";
    
    var $answerOutput = $(".answerOutput");
    $answerOutput.append(answerText);
    
    timer = setTimeout(interval, 3000);
      
    function interval() {
      if (!answer.length) return;
      var letter = answer.shift();
      var id = getId(letter);
      
      var $paragraphSpans = $('span[data-paragraph-id="' + id + '"]');
      $paragraphSpans.addClass('invisible');
      $paragraphSpans.attr('data-gone', 'gone');
      
      var $answerSpans = $('span[data-answer-id="' + id + '"]');
      $answerSpans.removeClass('invisible');
      
      var count = $('span[data-gone="gone"]').length;
      var remaining = paragraphArray.length - count;
      var $charactersRemainingOutput = $('.charactersRemainingOutput');
      $charactersRemainingOutput.text(remaining);
      
      timer = setTimeout(interval, 500);
    }
  });
  
  
    
  function reset() {
    if (timer) {
      clearTimeout(timer);
      timer = 0;
    }
    $('.paragraphOutput').empty();
    $('.charactersRemainingOutput').empty();
    $('.answerOutput').empty();
  }
  
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
  
  function getId(letter) {
    return letter === ' ' ? 'sp' : letter
  }
});

