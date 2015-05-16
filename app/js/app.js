'use strict';

/* App Module */

require('bootstrap');
require('angular');
require('lodash');
require('angular-route');
require('angular-animate');

var ChatCtrl = require('./controllers/ChatCtrl');
var GameCtrl = require('./controllers/GameCtrl');
var NavCtrl = require('./controllers/NavCtrl');

angular.module('jambonsVsZombiesApp', ['ngRoute', 'ngAnimate'])

    .config([
        '$locationProvider',
        '$routeProvider',
        function ($locationProvider, $routeProvider) {
            $routeProvider.
                when('/chat', {
                    templateUrl: 'views/chat.html',
                    controller: ChatCtrl
                }).
                when('/game', {
                    templateUrl: 'views/game.html',
                    controller: GameCtrl
                }).
                otherwise({
                    redirectTo: NavCtrl
                });
        }
    ])

    //Load controller
    .controller('RootCtrl', []).run(function ($rootScope) {
        $rootScope.user = {
            name: 'anonymous'
        };
    })
    .controller('GameCtrl', ['$scope', GameCtrl])
    .controller('ChatCtrl', ['$scope', ChatCtrl])
    .controller('NavCtrl', ['$scope', '$location', '$http', NavCtrl]);




