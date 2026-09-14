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
   FORM
------------------------------ */

const form =
    document.getElementById(
        "applicationForm"
    );


const submitButton =
    form.querySelector(
        ".submit-button"
    );


const successMessage =
    document.getElementById(
        "successMessage"
    );


const submitError =
    document.getElementById(
        "submitError"
    );



/* ------------------------------
   FORM VALIDATION + SUBMISSION
------------------------------ */

form.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        let valid = true;


        const fields =
            form.querySelectorAll(
                "input"
            );


        /* HIDE OLD MESSAGES */

        successMessage.style.display =
            "none";

        submitError.style.display =
            "none";



        /* CHECK EACH FIELD */

        fields.forEach(
            function(field) {

                const container =
                    field.closest(
                        ".field"
                    );


                /* EMPTY FIELD */

                if (
                    field.value.trim() === ""
                ) {

                    container
                        .classList
                        .add("error");


                    valid = false;

                }


                /* EMAIL */

                else if (
                    field.id === "email" &&
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                        field.value
                    )
                ) {

                    container
                        .classList
                        .add("error");


                    valid = false;

                }


                /* VALID FIELD */

                else {

                    container
                        .classList
                        .remove("error");

                }

            }
        );



        /* STOP IF INVALID */

        if (!valid) {

            return;

        }



        /* ------------------------------
           SEND TO FORMSPREE
        ------------------------------ */

        submitButton.disabled = true;

        submitButton.textContent =
            "SENDING...";


        try {

            const response =
                await fetch(
                    "https://formspree.io/f/mrpgnrew",
                    {
                        method: "POST",

                        body: new FormData(form),

                        headers: {
                            "Accept":
                                "application/json"
                        }
                    }
                );


            if (response.ok) {

                /* SUCCESS */

                form
                    .querySelectorAll(
                        ".field"
                    )
                    .forEach(
                        function(field) {

                            field.style.display =
                                "none";

                        }
                    );


                submitButton.style.display =
                    "none";


                successMessage.style.display =
                    "block";

            }


            else {

                throw new Error(
                    "Form submission failed"
                );

            }

        }


        catch (error) {

            submitError.style.display =
                "block";


            submitButton.disabled =
                false;


            submitButton.textContent =
                "SEND APPLICATION";

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