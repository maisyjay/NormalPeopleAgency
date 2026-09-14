
/* ------------------------------
   OPEN APPLICATION
------------------------------ */

function openApplication() {

    document
        .getElementById("overlay")
        .classList
        .add("active");


    document
        .getElementById("application")
        .classList
        .add("active");

}



/* ------------------------------
   CLOSE APPLICATION
------------------------------ */

function closeApplication() {

    document
        .getElementById("overlay")
        .classList
        .remove("active");


    document
        .getElementById("application")
        .classList
        .remove("active");

}



/* ------------------------------
   CLOSE WITH ESCAPE
------------------------------ */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeApplication();

        }

    }
);



/* ------------------------------
   CUSTOM VALIDATION
------------------------------ */

const form =
    document.getElementById(
        "applicationForm"
    );


form.addEventListener(
    "submit",
    function(event) {

        let valid = true;


        const fields =
            form.querySelectorAll(
                ".field input"
            );


        fields.forEach(
            function(field) {

                const container =
                    field.closest(
                        ".field"
                    );


                const value =
                    field.value.trim();



                /* EMPTY */

                if (
                    value === ""
                ) {

                    container
                        .classList
                        .add("error");


                    valid = false;

                    return;

                }



                /* EMAIL */

                if (
                    field.id === "email"
                ) {

                    const emailPattern =
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                    if (
                        !emailPattern.test(
                            value
                        )
                    ) {

                        container
                            .classList
                            .add("error");


                        valid = false;

                        return;

                    }

                }



                /* VALID */

                container
                    .classList
                    .remove("error");

            }
        );



        /*
           STOP FORMspree IF
           OUR VALIDATION FAILS
        */

        if (!valid) {

            event.preventDefault();

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


                    document
                        .getElementById(
                            "submissionError"
                        )
                        .classList
                        .remove("active");

                }
            );

        }
    );

