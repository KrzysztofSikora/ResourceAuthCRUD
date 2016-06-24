/**
 * Created by krzysztof on 04.06.16.
 */
var app = angular.module('app', ['ngRoute', "ngResource"]);

app.config(["$routeProvider", function ($routeProvider) {
    "use strict";
    $routeProvider
        .when("/", {
            templateUrl: "/partials/image_form.html",
            controller: "TestController"
        })

        // .when("/", {
        //     templateUrl: "/partials/test.html",
        //     controller: "TestController"
        // })

        .when("/image_form", {
            templateUrl: "/partials/image_form.html",
            controller: "TestController"
        })

        .when("/all/", {
            templateUrl: "/partials/all.html",
            controller: "AllController"
        })

        .when("/technology/", {
            templateUrl: "/partials/technology.html",
            controller: "TechnologyController"
        })

        .when("/registry/", {
            templateUrl: "/partials/register.html",
            controller: "RegisterController"
        })

        .when("/login/", {
            templateUrl: "/partials/login.html",
            controller: "LoginController"
        })

        .when("/rule/", {
            templateUrl: "/partials/rule.html",
            controller: "RulenController"
        })


        .when("/test/:zmienna", {
            templateUrl: "/partials/test.html",
            controller: "TestController"
        })

        .when("/test/", {
            templateUrl: "/partials/test.html",
            controller: "TestController"
        })
        .when('/signin', {
            templateUrl: '/partials/signin.html',
            controller: 'authController'
        })
        .when('/signup', {
            templateUrl: '/partials/signup.html',
            controller: 'authController'
         })
        .when('/user', {
            templateUrl: '/partials/userinfo.html',
            controller: 'authController'
        })
        .otherwise({
            redirectTo: "/"
    });
}]);

app.controller('authController', function($scope,$http,$location) {

    $scope.user  = {username:'',password:''};
    $scope.alert = '';

    $scope.login = function(user){
        $http.post('/auth/login', user).
        success(function(data) {
            $scope.loggeduser = data;
            $location.path('/user');
        }).
        error(function() {
            $scope.alert = 'Login failed'
        });

    };

    $scope.signup = function(user){
        $http.post('/auth/signup', user).
        success(function(data) {
            $scope.alert = data.alert;
        }).
        error(function() {
            $scope.alert = 'Registration failed'
        });

    };
    // $http.get('/#/user').success(function () {
    //     $http.get('/auth/currentuser').
    //         success(function (data) {
    //             $scope.loggeduser = data;
    //         }).
    //         error(function () {
    //             $location.path('/signin');
    //         });
    //     })

    $scope.userinfo = function() {
        $http.get('/auth/currentuser').
        success(function (data) {
            $scope.loggeduser = data;
        }).
        error(function () {
            $location.path('/signin');
        });
    }

    $scope.logout = function(){
        $http.get('/auth/logout')
            .success(function() {
                $scope.loggeduser = {};
                $location.path('/signin');

            })
            .error(function() {
                $scope.alert = 'Logout failed'
            });
    };
});

app.controller('AllController', function ($scope, $http) {

    $scope.posts = [
        {}
    ];

// pobieranie za pomocą 'GET' wszystkich postów z api za pomocą $http
    $http.get('/api/dataModel').success(function (posts) {
        $scope.posts = posts

    })


})


app.controller('TechnologyController', function ($scope, $http) {

    $scope.posts = [
        {}
    ];

// pobieranie za pomocą 'GET' wszystkich postów z api za pomocą $http
    $http.get('/api/dataModel/technology').success(function (posts) {
        $scope.posts = posts

    })


})


app.controller("TestController", ["$scope", "$resource", "$routeParams", "$http",
    function ($scope, $resource, $routeParams, $http) {

        $scope.testFunction = function (model) {
            var zmienna = model;
            console.log(zmienna)
            $scope.zmiennaResource = zmienna;
            // do uruchomienia


        }
        // $scope.save = function () {
        //
        var Weather = $resource("/test/:zmienna", {zmienna: "@_zmienna"});
        console.log({zmienna: $routeParams.zmienna})
        // var data = {zmienna:$routeParams.zmienna}
        // $scope.zmiennaResource = data;

        // GET data to odebrane dane po metodzie GET dane z jsona odebrane
        Weather.get({zmienna: $routeParams.zmienna}, function (data) {
            //     console.log({zmienna:$routeParams.zmienna})
            $scope.zmiennaResource = data
        })
        //
        // }

        // $scope.save = function () {


        // var config = {
        //     params: { zmienna: $routeParams.zmienna }
        // };
        //
        //
        // $http.get('/test/:zmienna', config).success(function () {
        //
        //     $scope.zmiennaResource = config.params
        //     console.log(config.params)
        // })


        // druga wersja

        //     $http({
        //         method: "GET",
        //         params: {zmienna: $routeParams.zmienna},
        //         url: '/test/' + $routeParams.zmienna,
        //     }).success(function (params) {
        //
        //         $scope.zmiennaResource = params
        //         console.log(params)
        //     })
        //
        // }


        $scope.put = function () {
            $http({

                method: "PUT",
                url: '/api/posts/update/' + post._id,
                data: post
            }).success(function (post) {
                console.log(post)

            })
        }


    }]);

