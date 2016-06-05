/**
 * Created by krzysztof on 04.06.16.
 */
var app = angular.module('app', ['ngRoute', "ngResource"]);

app.config(["$routeProvider", function ($routeProvider) {
    "use strict";
    $routeProvider
        .when("/", {
            templateUrl: "/partials/test.html",
            controller: "TestController"
        })

        .when("/test/:zmienna", {
            templateUrl: "/partials/test.html",
            controller: "TestController"
        })

        .when("/test/", {
            templateUrl: "/partials/test.html",
            controller: "TestController"
        })
        .otherwise({
            redirectTo: "/"
        });
}]);


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

