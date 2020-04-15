        // Modificar campo
        function openFieldForm() {
            document.getElementById("fieldForm").style.display = "flex";
            document.getElementById("fieldForm").style.flex.flow = "column";

        }

        function closeFieldForm() {
            document.getElementById("fieldForm").style.display = "none";
        }
        
        // Añadir campo 
        function openFieldaddForm() {
            document.getElementById("fieldAddForm").style.display = "flex";
            document.getElementById("fieldAddForm").style.flex.flow = "column";

        }
    
        function closeFieldaddForm() {
            document.getElementById("fieldAddForm").style.display = "none";
        }
        
        // Modificar usuario
        function openUserForm() {
            document.getElementById("userForm").style.display = "flex";
            document.getElementById("userForm").style.flex.flow = "column";

        }

        function closeUserForm() {
            document.getElementById("userForm").style.display = "none";
        }

        // Añadir usuaio
        function openUseraddForm() {
            document.getElementById("useraddForm").style.display = "flex";
            document.getElementById("useraddForm").style.flex.flow = "column";

        }

        function closeUseraddForm() {
            document.getElementById("useraddForm").style.display = "none";
        }

        // Añadir varios campos
        function openFieldsaddForm() {
            document.getElementById("fieldsaddForm").style.display = "flex";
            document.getElementById("fieldsaddForm").style.flex.flow = "column";

        }

        function closeFieldsaddForm() {
            document.getElementById("fieldsaddForm").style.display = "none";
        }

        // Modificar campo de app
        function openForm() {
            document.getElementById("myForm").style.display = "flex";
            document.getElementById("myForm").style.flex.flow = "column";
            document.getElementById("tab").style.display = "none";
            document.getElementById("div_h2_user").style.display = "none";

        }

        function closeForm() {
            document.getElementById("myForm").style.display = "none";
            document.getElementById("tab").style.display = "flex";
            document.getElementById("div_h2_user").style.display = "flex";
            location.reload();


        }