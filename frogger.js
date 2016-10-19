var pane = $('#pane'),
    box = $('#box'),
    car = $('#car'),
    maxWidth = pane.width() - box.width(),
    maxHeight = pane.height() - box.height(),
    carW = pane.width() - car.width();
keysPressed = {},
    distancePerIteration = 3,
    alertUp = false,
    won = false;

function calculateNewValue(oldValue, keyCode1, keyCode2) {
    var newValue = parseInt(oldValue, 10) -
        (keysPressed[keyCode1] ? distancePerIteration : 0) +
        (keysPressed[keyCode2] ? distancePerIteration : 0);
    if (newValue === 0 && keyCode1 === 38) {
        if (!won) {
            won = true;
            alertUp = true;
            keysPressed = {};
            swal({
                title: "WINNER!",
                text: "You won!",
                imageUrl: "http://www.clipartkid.com/images/484/jumping-frog-clip-art-clipart-panda-free-clipart-images-Ma6vfB-clipart.png"
            }, function() {
              alertUp = false;
            });

            box.css("left", "235px");
            won = false;
            return 480;
        }
    };
    return newValue < 0 ? 0 : newValue > maxHeight ? maxHeight : newValue;
}

function move_car(oldValue) {
    var newValue = parseInt(oldValue, 10) + distancePerIteration;

    var box_top = parseInt(box.position().top, 10);
    var box_bottom = parseInt(box_top + box.height(), 10);
    var box_left = parseInt(box.position().left, 10);
    var box_right = parseInt(box_left + box.width(), 10);

    var car_top = parseInt(car.position().top, 10);
    var car_bottom = parseInt(car_top + car.height(), 10);
    var car_left = parseInt(car.position().left, 10);
    var car_right = parseInt(car_left + car.width(), 10);

    if (car_right >= box_right && box_left >= car_left && car_top <= box_top && car_bottom >= box_bottom) {
        alertUp = true;
        keysPressed = {};
        swal({
            title: "OUCH!!",
            text: "THAT ONE HURT",
            imageUrl: "http://1.bp.blogspot.com/_8H7tRK4d-0Y/Sg8y338UEaI/AAAAAAAADTU/9HVhkUONZr8/s320/frog-on-crutches.png"
        }, function() {
          alertUp = false;
        });
        box.css("left", "235px");
        box.css("top", "480px");
        return 0;
    }


    return newValue < 0 ? 0 : newValue > carW ? 0 : newValue;
}

$(window).keydown(function(event) {
    if (!alertUp)
        keysPressed[event.which] = true;
});
$(window).keyup(function(event) {
    if (!alertUp)
        keysPressed[event.which] = false;
});

setInterval(function() {
    box.css({
        left: function(index, oldValue) {
            return calculateNewValue(oldValue, 37, 39);
        },
        top: function(index, oldValue) {
            return calculateNewValue(oldValue, 38, 40);
        }
    });
    car.css({
        left: function(index, oldValue) {
            return move_car(oldValue);
        }
    });
});
