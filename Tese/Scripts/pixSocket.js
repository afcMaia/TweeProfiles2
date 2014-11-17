var pixSocket = function() {
    var settings,

    connect = function(_settings) {
        settings = _settings;
        var connection = new WebSocket(settings.host);

        connection.onopen = function () {};

        connection.onmessage = function (message) {
            var tweet = JSON.parse(message.data);
            showPlaces(pix.media.m, pix.title);
        };
    },

    return {
        connect: connect
    };
}();