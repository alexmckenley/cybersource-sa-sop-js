$(document).ready(function () {
    addLinkToSetDefaults();
});

function setDefaultsForAll() {
    setDefaultsForPaymentDetailsSection();
}

function addLinkToSetDefaults() {
    $(".section").prev().each(function (i) {
        legendText = $(this).text();
        $(this).text("");

        var setDefaultMethod = "setDefaultsFor" + capitalize($(this).next().attr("id")) + "()";

        newlink = $(document.createElement("p"));
        newlink.append(document.createTextNode(legendText));
        $(this).append(newlink);
    });

    newbutton = $(document.createElement("input"));
    newbutton.attr({
        id:'defaultAll', value:'Default All', type:'button', onClick:'setDefaultsForAll()'
    });
    newbutton.bind('click', function() {
        setDefaultsForAll();
    });
    $("#payment_form").append(newbutton);
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function setDefaultsForPaymentDetailsSection() {
    $("input[id='transaction_type']").val("authorization");
    $("input[id='reference_number']").val(new Date().getTime());
    $("input[id='amount']").val("100.00");
    $("input[id='currency']").val("USD");
    $("input[id='payment_method']").val("card");
    $("input[id='card_type']").val("001");
    $("input[id='card_number']").val("4242424242424242");
    $("input[id='card_expiry_date']").val("11-2020");
    $("input[id='bill_to_forename']").val("John");
    $("input[id='bill_to_surname']").val("Doe");
    $("input[id='bill_to_email']").val("null@cybersource.com");
    $("input[id='bill_to_phone']").val("02890888888");
    $("input[id='bill_to_address_line1']").val("1 Card Lane");
    $("input[id='bill_to_address_city']").val("My City");
    $("input[id='bill_to_address_state']").val("CA");
    $("input[id='bill_to_address_country']").val("US");
    $("input[id='bill_to_address_postal_code']").val("94043");
}

//shims
if ( !Date.prototype.toISOString ) {
  ( function() {
    
    function pad(number) {
      var r = String(number);
      if ( r.length === 1 ) {
        r = '0' + r;
      }
      return r;
    }
 
    Date.prototype.toISOString = function() {
      return this.getUTCFullYear()
        + '-' + pad( this.getUTCMonth() + 1 )
        + '-' + pad( this.getUTCDate() )
        + 'T' + pad( this.getUTCHours() )
        + ':' + pad( this.getUTCMinutes() )
        + ':' + pad( this.getUTCSeconds() )
        + '.' + String( (this.getUTCMilliseconds()/1000).toFixed(3) ).slice( 2, 5 )
        + 'Z';
    };
  
  }() );
}

if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, scope) {
        'use strict';
        var i, len;
        for (i = 0, len = this.length; i < len; ++i) {
            if (i in this) {
                fn.call(scope, this[i], i, this);
            }
        }
    };
}

