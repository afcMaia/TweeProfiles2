$(document).ready(function () {
    if (!Modernizr.websockets) {
        alert('WebSockets are not supported.');
        return;
    }

    var settings = {
        host: 'ws://localhost:9000',
        map: 'map',
    };

    pixSocket.connect(settings);
});