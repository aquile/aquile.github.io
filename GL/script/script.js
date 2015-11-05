$(document).ready(function () {
    //Local variables
    var inputsArr = $(".form_frame input"),
        bottomScrNode = $(".form_frame--bottom"),
        notificationNode = document.body.querySelector(".notification");
    var bottomNodeCounter = 0;

    for (var i = 0; i <= 19; i += 2) {

        setHandlerOdd(i);

        //event listener method for the odd inputs
        function setHandlerOdd(index) {
            inputsArr.eq(index).keypress(function (event) {
                if (+event.which >= 48 && +event.which <= 57) { // 0-9
                    notificationNode.textContent = "";

                    //set disable controller off to the next input & focus on it
                    inputsArr.eq(index + 1).prop("disabled", false);
                    inputsArr.eq(index + 1).focus();

                    setTimeout(function () {
                        inputsArr.eq(index).prop("disabled", true);

                        //insert temporary score
                        bottomScrNode.eq(bottomNodeCounter).text(
                            function () {
                                var tempScore = 0;
                                for (var i = 0; i < bottomScrNode.length; i++) {
                                    if(inputsArr.eq(i).val() == "x" || inputsArr.eq(i).val() == "x")
                                    tempScore += +inputsArr.eq(i).val();
                                }
                                return tempScore;
                            });
                        //++bottomNodeCounter;
                    }, 200);
                } else if (event.which === 120 || event.which === 88) { //xX lat
                    notificationNode.textContent = "";

                    //set disable controller off to the next input & focus on it
                    inputsArr.eq(index + 2).prop("disabled", false);
                    inputsArr.eq(index + 2).focus();
                    setTimeout(function () {
                        inputsArr.eq(index).prop("disabled", true);

                    }, 200);
                } else {
                    notificationNode.textContent = "Please use only 0-9 or xX";
                    //clear value of this input
                    setTimeout(function () {
                        inputsArr.eq(index).val("");
                    }, 100);
                }
            });
        }

    }

    for (var j = 1; j < 20; j += 2) {
        setHandlerEven(j);

        //event listener method for the even inputs
        function setHandlerEven(index) {
            inputsArr.eq(index).keypress(function (event) {
                if (+event.which >= 48 && +event.which <= (57 - +inputsArr.eq(index - 1).val())) { // 0-(9-previous input literal value)
                    notificationNode.textContent = "";

                    //set disable controller off to the next input & focus on it
                    inputsArr.eq(index + 1).prop("disabled", false);
                    inputsArr.eq(index + 1).focus();

                    setTimeout(function () {
                        inputsArr.eq(index).prop("disabled", true);

                        //insert temporary score
                        bottomScrNode.eq(bottomNodeCounter).text(
                            function () {
                                var tempScore = 0;
                                for (var i = 0; i < inputsArr.length; i++) {
                                    tempScore += +inputsArr.eq(i).val();
                                }
                                return tempScore;
                            });
                        ++bottomNodeCounter;
                    }, 200);
                } else if (event.which === 47) { // or /
                    notificationNode.textContent = "";

                    //set disable controller off to the next input & focus on it
                    inputsArr.eq(index + 1).prop("disabled", false);
                    inputsArr.eq(index + 1).focus();
                    setTimeout(function () {
                        inputsArr.eq(index).prop("disabled", true);
                    }, 200);
                } else {
                    notificationNode.textContent = "Please type only 0-" + (9 - +inputsArr.eq(index - 1).val()) + " or /";
                    //clear value of this input
                    setTimeout(function () {
                        inputsArr.eq(index).val("");
                    }, 100);
                }
            });
        }

    }


});


function asyncEvent() {
    var dfd = $.Deferred();

    // Resolve after a random interval
    setTimeout(function() {
        dfd.resolve( "hurray" );
    }, Math.floor( 400 + Math.random() * 2000 ) );

    // Reject after a random interval
    setTimeout(function() {
        dfd.reject( "sorry" );
    }, Math.floor( 400 + Math.random() * 2000 ) );

    // Show a "working..." message every half-second
    setTimeout(function working() {
        if ( dfd.state() === "pending" ) {
            dfd.notify( "working... " );
            setTimeout( working, 500 );
        }
    }, 1 );

    // Return the Promise so caller can't change the Deferred
    return dfd.promise();
}

// Attach a done, fail, and progress handler for the asyncEvent
$.when( asyncEvent() ).then(
    function( status ) {
        alert( status + ", things are going well" );
    },
    function( status ) {
        alert( status + ", you fail this time" );
    },
    function( status ) {
        $( "body" ).append( status );
    }
);

var obj = {
        hello: function( name ) {
            alert( "Hello " + name );
        }
    },
// Create a Deferred
    defer = $.Deferred();

// Set object as a promise
defer.promise( obj );

// Resolve the deferred
defer.resolve( "John" );

// Use the object as a Promise
obj.done(function( name ) {
    obj.hello( name ); // Will alert "Hello John"
}).hello( "Karl" ); // Will alert "Hello Karl"