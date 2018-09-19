/*globals $, angular, Stripe, jQuery */
/*jslint vars:true */

/**
 * @license angular-stripe-form  v0.0.1
 * (c) 2013 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 */

/**
 *
 *    @author        Dale "Ducky" Lotts
 *    @since        2013-11-10
 */

var stripeFormModule = angular.module('ui.bootstrap.stripe-form', []);

stripeFormModule.directive('stripeForm', [ function () {
  "use strict";

  return {
    restrict: 'E',
    replace: true,
    scope: {
      onCancel: '=',
      onCreateToken: '='
    },
    template: "<div>" +
      "   <form name='stripeForm' class='form' data-ng-submit='submitCreditCard()'>" +
      "     <div class='row'>" +
      "       <div class='form-group col-xs-7'>" +
      "         <label>Card Number</label>" +
      "         <input type='tel' id='cardNumber' class='form-control stripe-card-number' data-placeholder='Card number' required data-ng-model='card.number'>" +
      "       </div>" +
      "      <div class='form-group col-xs-4'>" +
      "         <label>Card code</label>" +
      "         <input class='form-control stripe-cvc' id='cardCode' data-placeholder='CVC' required data-ng-model='card.cvc'>" +
      "       </div>" +
      "     </div>" +
      "     <div class='row'>" +
      "       <div class='form-group col-xs-7'>" +
      "         <label>Name on Card</label>" +
      "         <input class='form-control stripe-name-on-card' id='cardName' required data-ng-model='card.name'>" +
      "       </div>" +
      "       <div class='form-group col-xs-4'>" +
      "         <label>Expires</label>" +
      "         <input class='form-control stripe-card-expiry' id='cardExpire' data-placeholder='MM / YYYY' required data-ng-model='card.expiry'>" +
      "       </div>" +
      "     </div>" +
      "     <button class='btn btn-default' type='button' tabindex='-1' data-ng-click='cancel()'><i class='glyphicon glyphicon-remove'></i>&nbsp;Cancel</button>" +
      "     <button class='btn btn-primary' type='submit' data-ng-disabled='stripeForm.$invalid'><i class='glyphicon glyphicon-ok'></i>&nbsp;Verify</button>" +
      " </form>" +
      "</div>",
      
    link: function (scope, element) {

        debugger;
      $('input.stripe-card-expiry', element).payment('formatCardExpiry');

      scope.cancel = function ()
      {
          debugger;
          delete scope.card;
          $('input.stripe-card-number', element).removeClass('amex');
          $('input.stripe-card-number', element).removeClass('diners');
          $('input.stripe-card-number', element).removeClass('discover');
          $('input.stripe-card-number', element).removeClass('jcb');
          $('input.stripe-card-number', element).removeClass('mastercard');
          $('input.stripe-card-number', element).removeClass('visa');
          
          //on cancel remove required field validation
          $('input.stripe-card-number', element).removeClass('stripe-error');
          $('input.stripe-cvc', element).removeClass('stripe-error');
          $('input.stripe-name-on-card', element).removeClass('stripe-error');
          $('input.stripe-card-expiry', element).removeClass('stripe-error');

          

          scope.stripeForm.$setPristine();
          if (angular.isFunction(scope.onCancel))
          {
              
              scope.onCancel();
              
        }
      };

      scope.submitCreditCard = function () {

        //noinspection JSUnresolvedVariable
        var cardData = angular.extend({}, scope.card);

          //noinspection JSUnresolvedVariable
        debugger;
        var expiry = $.payment.cardExpiryVal(cardData.expiry);

        cardData.exp_month = expiry.month;
        cardData.exp_year = expiry.year;

        //noinspection JSUnresolvedVariable
        delete cardData.expiry;

        if (angular.isFunction(scope.onCreateToken)) {
          //noinspection JSUnresolvedFunction,JSUnresolvedVariable
          Stripe.card.createToken(cardData, scope.onCreateToken);
        }

        //noinspection JSUnresolvedVariable
        delete scope.card;

        // The following is required because resetting the form does not remove the card type class
        $('input.stripe-card-number', element).removeClass('amex');
        $('input.stripe-card-number', element).removeClass('diners');
        $('input.stripe-card-number', element).removeClass('discover');
        $('input.stripe-card-number', element).removeClass('jcb');
        $('input.stripe-card-number', element).removeClass('mastercard');
        $('input.stripe-card-number', element).removeClass('visa');
        
        
        //noinspection JSUnresolvedVariable
        scope.stripeForm.$setPristine();
      };
    }
  };
}]);

stripeFormModule.directive('stripeCardNumber', [ function () {
  "use strict";

  return {
    restrict: 'C',
    require: 'ngModel',
    scope: {
      ngModel: '='
    },
    link: function (scope, element, attrs, controller)
    {
        debugger;
      $(element).payment('formatCardNumber');
      debugger;
      var validateFn = function (viewValue) {
          debugger;
        var valid = viewValue === undefined ? false : $.payment.validateCardNumber(viewValue);
        controller.$setValidity(attrs.ngModel, valid);
        valid == false ? element.addClass('stripe-error') : element.removeClass('stripe-error');
        return viewValue;
      };
      controller.$parsers.unshift(validateFn);
    }
  };
}]);

stripeFormModule.directive('stripeCvc', [ function () {
  "use strict";

  return {
    restrict: 'C',
    require: 'ngModel',
    scope: {
      ngModel: '='
    },
    link: function (scope, element, attrs, controller) {
      $(element).payment('formatCardCVC');

      var validateFn = function (viewValue) {
        var valid = viewValue === undefined ? false : $.payment.validateCardCVC(viewValue);
        controller.$setValidity(attrs.ngModel, valid);
        valid == false ? element.addClass('stripe-error') : element.removeClass('stripe-error');
        return viewValue;
      };
      controller.$parsers.unshift(validateFn);
    }
  };
}]);

stripeFormModule.directive('stripeCardExpiry', [ function () {
  "use strict";

  return {
    restrict: 'C',
    require: 'ngModel',
    scope: {
      ngModel: '='
    },
    link: function (scope, element, attrs, controller) {
      $(element).payment('formatCardExpiry');

      var validateFn = function (viewValue) {
        var valid = false;

        if (viewValue !== undefined) {
          var expiryValue = $.payment.cardExpiryVal(viewValue);
          valid = $.payment.validateCardExpiry(expiryValue.month, expiryValue.year);
        }
        valid == false ? element.addClass('stripe-error') : element.removeClass('stripe-error');
        controller.$setValidity(attrs.ngModel, valid);
        return viewValue;
      };
      controller.$parsers.unshift(validateFn);
    }
  };
}]);


stripeFormModule.directive('stripeNameOnCard', [function ()
{
    "use strict";

    debugger;
    return {
        restrict: 'C',
        require: 'ngModel',
        scope: {
            ngModel: '='
        },
        link: function (scope, element, attrs, controller)
        {
            debugger;
            //$(element).payment('formatCardCVC');

            var validateFn = function (viewValue)
            {
                debugger;
                var valid = viewValue === undefined ? false : viewValue;
                controller.$setValidity(attrs.ngModel, valid);
                valid == false ? element.addClass('stripe-error') : element.removeClass('stripe-error');
                return viewValue;
            };
            controller.$parsers.unshift(validateFn);
        }
    };
}]);