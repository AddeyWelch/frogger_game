var pane = $('#pane'),
    box = $('#box'),
    maxWidth = pane.width() - box.width()
    maxHeight = pane.height() - box.height()
    keysPressed = {},
    distancePerIteration = 5
    won = false;

function calculateNewValue(oldValue, keyCode1, keyCode2) {
    var newValue = parseInt(oldValue, 10)
                   - (keysPressed[keyCode1] ? distancePerIteration : 0)
                   + (keysPressed[keyCode2] ? distancePerIteration : 0);
    // var maxVal = keycode == LEFT ? maxwidth : keycode == UP ? maxhright
    if (newValue === maxHeight - pane.height() + 40){
      if (!won) {
        won = true;
        window.alert("YOU WON!\n\nREFRESH PAGE FOR A NEW GAME! :)");
      }
    };
    return newValue < 0 ? 0 : newValue > maxHeight ? maxHeight: newValue;
}

$(window).keydown(function(event) { keysPressed[event.which] = true; });
$(window).keyup(function(event) { keysPressed[event.which] = false; });

setInterval(function() {
    box.css({
        left: function(index ,oldValue) {
            return calculateNewValue(oldValue, 37, 39);
        },
        top: function(index, oldValue) {
            return calculateNewValue(oldValue, 38, 40);
        }
    });
}, 20);
var car = $('#car')
