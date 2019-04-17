/*----------------------------------------------*/
/* javascript functions - kathryn fowler		*/
/*----------------------------------------------*/

/* navbar */
function navFunction() {
    var x = document.getElementById("mynavbar");
    if (x.className === "navbar") {
        x.className += " responsive";
    } else {
        x.className = "navbar";
    }
}