const shareBtn = document.getElementById("shareBtn");

const copyBtn = document.getElementById("copyBtn");
const copyText = document.getElementById("copyText");
const copyIcon = document.getElementById("copyIcon");

const qrBtn = document.getElementById("qrBtn");
const qrClose = document.getElementById("qrClose");

const qrPanel = document.getElementById("qrPanel");
const qrImage = document.getElementById("qrImage");


/* SHARE */

shareBtn.addEventListener("click", async () => {

    const shareData = {
        title: "zero — Links",
        text: "Explore zero's links.",
        url: window.location.href
    };


    if (navigator.share) {

        try {

            await navigator.share(shareData);

        } catch (error) {

            if (error.name !== "AbortError") {

                console.log(
                    "Share failed:",
                    error
                );

            }

        }

    } else {

        try {

            await navigator.clipboard.writeText(
                window.location.href
            );

            showCopied();

        } catch (error) {

            console.log(
                "Copy failed:",
                error
            );

        }

    }

});


/* COPY */

copyBtn.addEventListener("click", async () => {

    try {

        await navigator.clipboard.writeText(
            window.location.href
        );

        showCopied();

    } catch (error) {

        console.log(
            "Copy failed:",
            error
        );

    }

});


function showCopied() {

    const oldText =
        copyText.textContent;

    const oldIcon =
        copyIcon.innerHTML;


    copyText.textContent =
        "Copied";


    copyIcon.innerHTML = `
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path
                d="M5 12.5l4 4L19 7"
            ></path>
        </svg>
    `;


    copyBtn.classList.add(
        "copied"
    );


    setTimeout(() => {

        copyText.textContent =
            oldText;

        copyIcon.innerHTML =
            oldIcon;

        copyBtn.classList.remove(
            "copied"
        );

    }, 1500);

}


/* QR */

qrBtn.addEventListener("click", () => {

    const pageUrl =
        window.location.href;


    qrImage.src =
        "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data="
        + encodeURIComponent(pageUrl);


    qrPanel.classList.add(
        "active"
    );


    qrPanel.setAttribute(
        "aria-hidden",
        "false"
    );

});


/* CLOSE QR */

qrClose.addEventListener("click", () => {

    qrPanel.classList.remove(
        "active"
    );


    qrPanel.setAttribute(
        "aria-hidden",
        "true"
    );

});


/* INTERNAL PAGE TRANSITION */

document
    .querySelectorAll(".page-link")
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const destination =
                    link.href;


                if (!destination) {
                    return;
                }


                event.preventDefault();


                document.body.classList.add(
                    "page-exit"
                );


                setTimeout(() => {

                    window.location.href =
                        destination;

                }, 180);

            }
        );

    });
