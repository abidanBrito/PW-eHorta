/* ----------------------------------------------------------------
 *   AUTHOR:         Daniel Burruchaga Sola
 *   FILE:           admin.js
 *   DATE:           19/04/2020
 *   STATE:          DONE
 *   ----------------------------------------------------------------
 *    *   ---------------------------------------------------------------- */

function userEnab_mapDisab() {

            document.getElementById("button_user_filter").style.display = "none";
            document.getElementById("button_user_filter_activated").style.display = "initial";

            document.getElementById("button_map_filter").style.display = "initial";
            document.getElementById("button_map_filter_activated").style.display = "none";

            document.getElementById("button_Add_customer").style.display = "initial";
            document.getElementById("button_Add_plot").style.display = "none";

        }

        function userDisab_mapEnab() {

            document.getElementById("button_user_filter").style.display = "initial";
            document.getElementById("button_user_filter_activated").style.display = "none";

            document.getElementById("button_map_filter").style.display = "none";
            document.getElementById("button_map_filter_activated").style.display = "initial";

            document.getElementById("button_Add_customer").style.display = "none";
            document.getElementById("button_Add_plot").style.display = "initial";
        }
