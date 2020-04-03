        function openFieldForm() {
            document.getElementById("fieldForm").style.display = "flex";
            document.getElementById("fieldForm").style.flex.flow = "column";

        }

        function closeFieldForm() {
            document.getElementById("fieldForm").style.display = "none";
        }

        function openFieldaddForm() {
            document.getElementById("fieldAddForm").style.display = "flex";
            document.getElementById("fieldAddForm").style.flex.flow = "column";

        }

        function closeFieldaddForm() {
            document.getElementById("fieldAddForm").style.display = "none";
        }

        function openUserForm() {
            document.getElementById("userForm").style.display = "flex";
            document.getElementById("userForm").style.flex.flow = "column";

        }

        function closeUserForm() {
            document.getElementById("userForm").style.display = "none";
        }

        function openUseraddForm() {
            document.getElementById("useraddForm").style.display = "flex";
            document.getElementById("useraddForm").style.flex.flow = "column";

        }

        function closeUseraddForm() {
            document.getElementById("useraddForm").style.display = "none";
        }


        function openForm() {
            document.getElementById("myForm").style.display = "flex";
            document.getElementById("myForm").style.flex.flow = "column";
            document.getElementById("tab").style.display = "none";
            document.getElementById("div_h2").style.display = "none";



        }

        function closeForm() {
            document.getElementById("myForm").style.display = "none";
            document.getElementById("tab").style.display = "flex";
            document.getElementById("div_h2").style.display = "flex";
            location.reload();


        }
