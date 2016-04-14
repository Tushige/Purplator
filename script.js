$(document).ready(function() {
  $("h1").addClass("animated bounce");
  /*Calculator functionality*/

  //the calculator will display '0' initially
  var num_input = document.querySelector(".screen");
  num_input.innerHTML = 0;
  var ops = "+-*/";
  //add event handler to all the keys
  var keys = document.querySelectorAll('#calculator span');
  for(var i=0; i<keys.length; i++) {
    keys[i].onclick = function(e) {
      var screenIn = document.querySelector(".screen");
      var screenOut = screenIn.innerHTML;
      var btnVal = this.innerHTML;

      //clear screen
      if(btnVal === 'C') {
        screenIn.innerHTML = 0;
      }
      else if(btnVal === '=') {
        //remove the extra operation key before evaluating
        if(ops.indexOf(screenOut.charAt(screenOut.length-1)) > -1) {
          screenIn.innerHTML = screenOut.substring(0, screenOut.length-1);
          screenOut = screenIn.innerHTML;
        }
        screenIn.innerHTML = eval(screenOut);
      }
      else {
        //handle operator presses
        if(ops.indexOf(btnVal) > -1) {
          //won't display operators as the first char on the screen except '-'
          if(btnVal != "-" && screenOut==="0")
            return;
          //if the last char on the screen is an operator, replace it with the new operator
          if(ops.indexOf(screenOut.charAt(screenOut.length-1)) > -1) {
            screenIn.innerHTML = screenOut.substring(0, screenOut.length-1) + btnVal;
            return;
          }
        }
        //handle decimal point presses
        else if(btnVal === '.') {
          //'.' is not allowed after an operator
          if(ops.indexOf(screenOut.charAt(screenOut.length-1)) > -1)
            return;
          //consecutive '.' is not allowed
          if(screenOut.charAt(screenOut.length-1) === btnVal) {
            return
          }

          var dotIdx = screenOut.lastIndexOf('.');
          var afterDot = screenOut.substring(dotIdx);
          //check if the current decimal point is in a number with no decimal.
          if(dotIdx > -1) {
            if(afterDot.search("\\+") < 0 &&
               afterDot.search("\\-") < 0&&
              afterDot.search("\\*") < 0 &&
              afterDot.search("\\/") < 0)
            {
              return;
            }
          }
        }
        //remove placeholder 0 when number is pressed
        if(screenOut==='0') {
          screenOut = '';
        }
        //append new character to the existing
        screenOut += btnVal;
        //update the screen with the new addition
        screenIn.innerHTML = screenOut;
      }
    }
  }
});
