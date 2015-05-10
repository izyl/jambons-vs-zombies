'use strict';

/* Controllers */

var jvzControllers = angular.module('jvzControllers', []).run(function ($rootScope) {
    $rootScope.user = {
        name: 'anonymous'
    };
});
var socket = io();

jvzControllers.controller('ChatCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $scope.items = [];
        $scope.sendMessage = function () {
            if ($scope.text) {

                var msg = {
                    text: $scope.text,
                    timestamp: new Date(),
                    // scope inheritance
                    author: $scope.user.name
                };

                $scope.items.push(msg);
                socket.emit('chat message', msg);
                $scope.text = '';
            }
        }

        socket.on('chat message', function (msg) {
            $scope.items.push(msg);
            $scope.$apply();
        });
    }
]);

jvzControllers.controller('GameCtrl', ['$scope', '$http',
    function ($scope, $http) {

    }
]);


jvzControllers.controller('NavCtrl', ['$scope', '$location', '$http',
    function ($scope, $location, $http) {

        var current;
        $http.get('nav/nav.json').success(function (data) {
            var index = _.findIndex(data, {'name': 'Chat'});
            if (index >= 0) {
                current = data[index];
                current.active = 'active';
            }
            $scope.items = data;
        });

        $scope.openLink = function (item) {
            if (current)
                current.active = '';
            current = item;
            current.active = 'active';
        }
    }
]);

