var pane = $('#pane'),
    box = $('#box'),
    maxValue = pane.width() - box.width(),
    keysPressed = {},
    distancePerIteration = 3;

function calculateNewValue(oldValue, keyCode1, keyCode2) {
    var newValue = parseInt(oldValue, 10)
                   - (keysPressed[keyCode1] ? distancePerIteration : 0)
                   + (keysPressed[keyCode2] ? distancePerIteration : 0);
    return newValue < 0 ? 0 : newValue > maxValue ? maxValue : newValue;
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