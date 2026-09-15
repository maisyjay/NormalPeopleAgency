/* ------------------------------
   TEST MODE
------------------------------ */

/*
   true  = testing mode
           nothing is sent to Formspree

   false = live mode
           applications are sent to Formspree
*/

const TEST_MODE = true;


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


const thankYouScreen =
    document.getElementById(
        "thankYouScreen"
    );


const submissionError =
    document.getElementById(
        "submissionError"
    );


/* ------------------------------
   FORM SUBMISSION
------------------------------ */

form.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();

        let valid = true;


        const fields =
            form.querySelectorAll(
                ".field input"
            );


        /* --------------------------
           VALIDATE FIELDS
        -------------------------- */

        fields.forEach(
            function(field) {

                const container =
                    field.closest(
                        ".field"
                    );


                const value =
                    field.value.trim();


                /* EMPTY FIELD */

                if (value === "") {

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


        /* --------------------------
           STOP IF INVALID
        -------------------------- */

        if (!valid) {

            return;

        }


        /* --------------------------
           SENDING STATE
        -------------------------- */

        submitButton.disabled =
            true;

        submitButton.textContent =
            "SENDING...";


        /* --------------------------
           TEST MODE
        -------------------------- */

        if (TEST_MODE) {

            /*
               Wait a moment so the
               test feels like a real
               submission.
            */

            setTimeout(
                function() {

                    /*
                       Hide the application
                    */

                    document
                        .getElementById(
                            "application"
                        )
                        .classList
                        .remove("active");


                    /*
                       Hide the dark overlay
                    */

                    document
                        .getElementById(
                            "overlay"
                        )
                        .classList
                        .remove("active");


                    /*
                       Show thank you screen
                    */

                    thankYouScreen
                        .classList
                        .add("active");


                    /*
                       Reset button
                    */

                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        "SEND APPLICATION";

                },
                700
            );


            return;

        }


        /* --------------------------
           REAL FORMSPREE SUBMISSION
        -------------------------- */

        try {

            const response =
                await fetch(
                    "https://formspree.io/f/mrpgnrew",
                    {
                        method: "POST",

                        body:
                            new FormData(form),

                        headers: {
                            "Accept":
                                "application/json"
                        }

                    }
                );


            /* --------------------------
               SUCCESS
            -------------------------- */

            if (
                response.ok
            ) {

                /*
                   Hide the application
                   and dark overlay
                */

                document
                    .getElementById(
                        "application"
                    )
                    .classList
                    .remove("active");


                document
                    .getElementById(
                        "overlay"
                    )
                    .classList
                    .remove("active");


                /*
                   Show our own
                   full-screen message
                */

                thankYouScreen
                    .classList
                    .add("active");


                return;

            }


            /* --------------------------
               FORMSPREE ERROR
            -------------------------- */

            throw new Error(
                "Formspree submission failed"
            );

        }


        catch (error) {

            console.error(
                "Form submission error:",
                error
            );


            submitButton.disabled =
                false;


            submitButton.textContent =
                "SEND APPLICATION";


            submissionError
                .classList
                .add("active");

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


                    submissionError
                        .classList
                        .remove("active");

                }

            );

        }
    );