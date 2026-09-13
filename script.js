/* ------------------------------
   OPEN APPLICATION
------------------------------ */

function openApplication() {

    document
        .getElementById("overlay")
        .classList.add("active");


    document
        .getElementById("application")
        .classList.add("active");

}



/* ------------------------------
   CLOSE APPLICATION
------------------------------ */

function closeApplication() {

    document
        .getElementById("overlay")
        .classList.remove("active");


    document
        .getElementById("application")
        .classList.remove("active");

}



/* ------------------------------
   CLOSE WITH ESCAPE
------------------------------ */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeApplication();

        }

    }
);



/* ------------------------------
   FORM VALIDATION
------------------------------ */

const form =
    document.getElementById(
        "applicationForm"
    );


form.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const fields =
            form.querySelectorAll(
                "input"
            );


        let valid = true;


        fields.forEach(
            function(field) {

                const container =
                    field.closest(
                        ".field"
                    );


                /*
                    Check if the field
                    is empty
                */

                if (
                    field.value.trim() === ""
                ) {

                    container
                        .classList
                        .add("error");


                    valid = false;

                }

                else {

                    container
                        .classList
                        .remove("error");

                }

            }
        );


        /*
            If everything is filled in
        */

        if (valid) {

            alert(
                "thank you. we'll be in touch."
            );

        }

    }
);



/* ------------------------------
   REMOVE ERROR WHEN TYPING
------------------------------ */

document
    .querySelectorAll(
        ".field input"
    )
    .forEach(
        function(input) {

            input.addEventListener(
                "input",
                function() {

                    this
                        .closest(".field")
                        .classList
                        .remove("error");

                }
            );

        }
    );