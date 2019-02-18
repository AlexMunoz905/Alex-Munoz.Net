var counter = 0;
var interval = setInterval(function() {
    counter++;
    // Display 'counter' wherever you want to display it.
    if (counter == 2) {
        window.location.href = '/home';
        clearInterval(interval);
    }
}, 1000);
