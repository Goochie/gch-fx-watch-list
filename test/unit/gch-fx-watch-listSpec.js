/**
 * Author : Bill Gooch
 *
 * Unit tests for market watch widget
 *
 */
describe('Market watch widget :: ', function(){

    var elem, scope,ctrl,isoScope ;

    beforeEach(module('fxMarketWatchModule'));

    beforeEach(inject(function($rootScope, $compile) {
        elem = angular.element('<fxmarket-watchlist></fxmarket-watchlist>');
        scope = $rootScope.$new();
        $compile(elem)(scope);
        scope.$digest();

        ctrl = elem.controller("fxmarketWatchlist");
        //As of angular 1.2 you need to use isolate scope method
        isoScope  = elem.isolateScope();
    }));


    it('RateSelected event has not been fired', inject(function(SYMBOL_SELECTED_EVT ){

        var currencyObj = {};
        spyOn(isoScope, "$emit")
        isoScope.symbolSelected(currencyObj)


        expect(isoScope.$emit).toHaveBeenCalledWith(SYMBOL_SELECTED_EVT,currencyObj);

    }));


    it('symbolSelected event should have been ', inject(function( $rootScope,SYMBOL_SELECTED_EVT){

        var data =  {};
        data.payload = mockDataBull();

        var symbolToSelect =  data.payload[0];

        $rootScope.$broadcast("socket:fxPriceUpdate",data);
        isoScope.$apply();

        spyOn(isoScope, "$emit")

        var bidElement = angular.element(elem.find('.symbol'));
            bidElement[0].click();

        expect(isoScope.$emit).toHaveBeenCalledWith(SYMBOL_SELECTED_EVT,symbolToSelect);

    }));

    it('Columns should be have appropriate labels', function( ){

        expect(elem.html()).toContain('Symbol');
        expect(elem.html()).toContain('Bid');
        expect(elem.html()).toContain('Ask');
        expect(elem.html()).toContain('Time');

    });

})


function mockDataBull(){


    var data = [{
        symbol: "GBP/USD",
        timeStamp: "12201225",
        bidBig: "5",
        bidPoint: "5",
        offerBig: "1",
        offerPoint: "1",
        high: "10",
        low: "10",
        mid: "10",
        bidBullBear: "bull"  ,
        offerBullBear: "bull"
    },
    {
        symbol: "EUR/USD",
        timeStamp: "12201225",
        bidBig: "5",
        bidPoint: "5",
        offerBig: "1",
        offerPoint: "1",
        high: "10",
        low: "10",
        mid: "10",
        bidBullBear: "bull"  ,
        offerBullBear: "bull"
    }
     ]


     return data;
}





