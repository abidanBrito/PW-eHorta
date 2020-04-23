/* ----------------------------------------------------------------
 *   AUTHOR:        .... 
 *   FILE:           checkbox_list.js
 *   DATE:           01/04/2020
 *   STATE:          DONE
 *  ---------------------------------------------------------------- */

/* Use this function to show the checkbox when the delete button is clicked */

function showCheckbox() {
    let input = document.getElementsByTagName('input');
    for (let i = 0; i < input.length; i++) {
        if (input[i].getAttribute('type') == "checkbox") {
            input[i].style.visibility = "visible";
            document.getElementById("delete").style.display = "none";
            document.getElementById("trash").style.display = "inline";

        }
    }
}