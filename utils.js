function reset(timer) {
  if (timer) {
    clearTimeout(timer);
    timer = 0;
  }
  $('.paragraphOutput').empty();
  $('.charactersRemainingOutput').empty();
  $('.answerOutput').empty();
  
  return timer;
}

function getId(letter) {
  return letter === ' ' ? 'sp' : letter
}

function addUnderlinesToRemainingChars() {
  var $remainingChars = $('.paragraphOutput span:not([data-gone="gone"])');
  $remainingChars.addClass('underline');
}