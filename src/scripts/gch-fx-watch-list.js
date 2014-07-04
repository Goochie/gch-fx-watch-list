/**
 * Author : Bill Gooch
 * billgch@gmail.com
 * Forex watchlist component
 */

angular.module("fxMarketWatchModule",['btford.socket-io']);

(function() {

    'use strict';

    // Directive
    //---------------------------------
    function fxMarketWatchDirective (fxPriceService){

        return {

            restrict:'E',
            replace:'true',
            //ISOLATE SCOPE
            scope: { },

            template: wacthlistTemplate()  ,

            controller : function($scope, SYMBOL_SELECTED_EVT){

                //EVENT HANDLERS
                //----------------------------------------------------

                $scope.symbolSelected = function(currency){
                    $scope.$emit(SYMBOL_SELECTED_EVT,currency);

                }

                //Socket HANDLERS
                //----------------------------------------------------
                $scope.$on('socket:fxPriceUpdate', function(event, data) {

                    $scope.rates  =  data.payload;
                });

                $scope.$on('socket:disconnected', function(event, data) {

                    console.log("The SOCKET has been disconnected");
                });
            }
        }
    }


    // Service
    //---------------------------------
    function fxPriceService(socketFactory){

        var socket = socketFactory();
        socket.forward(['fxPriceUpdate','disconnected']);

        return socket;

    }


    ////////////////////////////////////////////////////////////
    // Configure angular app
    ////////////////////////////////////////////////////////////
    angular
        .module('fxMarketWatchModule')
        .directive('fxmarketWatch', fxMarketWatchDirective)
        .factory('fxPriceService', fxPriceService)
        // EVENTS
        .constant("SYMBOL_SELECTED_EVT","symbol_selected_evt");



    // Helper methods
    //-----------------------------------------------------------------

    function wacthlistTemplate(){

        var tpl = '<div id="gchFxMarketWatch">'+
                    '<div>'+
                        '<div class="col-1-4Header">Symbol</div>'+
                        '<div class="col-1-4Header">Bid</div>'+
                        '<div class="col-1-4Header">Ask</div>'+
                        '<div class="col-1-4Header">Time</div>'+
                    '</div>'+
                    '<div ng-repeat="rate in rates" ng-click="symbolSelected(rate)">'+
                        '<div class="col-1-4">{{rate.symbol}}</div>'+
                        '<div class="col-1-4">{{rate.bidBig}}<span class="fx-point">{{rate.bidPoint}}</span>'+
                        '<span class="glyphicon" ng-class="{\'glyphicon-arrow-down fx-priceDown\' : rate.bidBullBear == \'bear\', \'glyphicon-arrow-up fx-priceUp\' : rate.bidBullBear == \'bull\'}"></span></div>'+
                        '<div class="col-1-4">{{rate.offerBig}}<span class="fx-point">{{rate.offerPoint}}</span>'+
                        '<span class="glyphicon" ng-class="{\'glyphicon-arrow-down fx-priceDown\' : rate.offerBullBear == \'bear\', \'glyphicon-arrow-up fx-priceUp\' : rate.offerBullBear == \'bull\'}"></span></div>'+
                        '<div class="col-1-4">{{rate.timeStamp | date : \'hh:mm:ss\'}}</div>'+
                    '</div>'+
                '</div>';


        return tpl;

    }


})()
