var socket = require('socket.io-client')();

var GameCtrl = function ($scope) {

    //var game = game();

    $scope.game = {
        id: -1,
        player: {
            name: $scope.user.name,
            hp: 100
        }
    };

    socket.on('new game', function (game) {
        $scope.game = game;
        $scope.$apply();
    });
};

module.exports = GameCtrl;