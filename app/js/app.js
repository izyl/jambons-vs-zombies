'use strict';

/* App Module */

var jvzApp = angular.module('jvzApp', [
    'ngRoute',
    'jvzControllers'
]);

jvzApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/chat', {
                templateUrl: 'views/chat.html',
                controller: 'ChatCtrl'
            }).
            when('/game', {
                templateUrl: 'views/game.html',
                controller: 'GameCtrl'
            }).
            otherwise({
                redirectTo: '/chat'
            });
    }]);
