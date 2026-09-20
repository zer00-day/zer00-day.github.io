const shareBtn = document.getElementById("shareBtn");

const copyBtn = document.getElementById("copyBtn");
const copyText = document.getElementById("copyText");
const copyIcon = document.getElementById("copyIcon");

const qrBtn = document.getElementById("qrBtn");
const qrClose = document.getElementById("qrClose");

const qrPanel = document.getElementById("qrPanel");
const qrImage = document.getElementById("qrImage");


/* STATE */

let copyResetTimer = null;
let qrPreviousFocus = null;


/* ACCESSIBILITY SETUP */

if (qrBtn) {
    qrBtn.setAttribute("aria-expanded", "false");
}

if (qrPanel) {
    qrPanel.setAttribute("aria-hidden", "true");
}


/* SHARE */

if (shareBtn) {

    shareBtn.addEventListener("click", async (event) => {

        event.preventDefault();
        event.stopPropagation();


        const shareData = {
            title: "zero — Links",
            text: "Explore zero's links.",
            url: window.location.href
        };


        if (!navigator.share) {

            alert(
                "Sharing is not supported in this browser. Please open this page in Chrome or your device browser."
            );

            return;
        }


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

    });

}


/* COPY */

if (copyBtn) {

    copyBtn.addEventListener("click", async (event) => {

        event.preventDefault();
        event.stopPropagation();


        const pageUrl =
            window.location.href;


        try {

            await copyToClipboard(pageUrl);

            showCopied();

        } catch (error) {

            console.log(
                "Copy failed:",
                error
            );

            alert(
                "Unable to copy the link. Please copy the address from your browser."
            );

        }

    });

}


/* CLIPBOARD */

async function copyToClipboard(text) {

    if (
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
    ) {

        await navigator.clipboard.writeText(text);

        return;
    }


    const textarea =
        document.createElement("textarea");


    textarea.value = text;

    textarea.setAttribute(
        "readonly",
        ""
    );

    textarea.style.position =
        "fixed";

    textarea.style.opacity =
        "0";

    textarea.style.pointerEvents =
        "none";


    document.body.appendChild(
        textarea
    );


    textarea.select();

    textarea.setSelectionRange(
        0,
        textarea.value.length
    );


    const successful =
        document.execCommand("copy");


    textarea.remove();


    if (!successful) {

        throw new Error(
            "Clipboard copy failed."
        );

    }

}


/* COPIED STATE */

function showCopied() {

    if (
        !copyBtn ||
        !copyText ||
        !copyIcon
    ) {
        return;
    }


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


    copyBtn.setAttribute(
        "aria-label",
        "Link copied"
    );


    if (copyResetTimer) {

        clearTimeout(
            copyResetTimer
        );

    }


    copyResetTimer =
        setTimeout(() => {

            copyText.textContent =
                oldText;

            copyIcon.innerHTML =
                oldIcon;

            copyBtn.classList.remove(
                "copied"
            );

            copyBtn.setAttribute(
                "aria-label",
                "Copy Zero's link"
            );

        }, 1500);

}


/* QR */

if (qrBtn) {

    qrBtn.addEventListener("click", (event) => {

        event.preventDefault();
        event.stopPropagation();


        if (
            qrPanel &&
            qrPanel.classList.contains("active")
        ) {

            closeQr();

            return;
        }


        openQr();

    });

}


/* OPEN QR */

function openQr() {

    if (
        !qrPanel ||
        !qrImage
    ) {
        return;
    }


    qrPreviousFocus =
        document.activeElement;


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


    if (qrBtn) {

        qrBtn.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    if (qrClose) {

        requestAnimationFrame(() => {

            qrClose.focus();

        });

    }

}


/* CLOSE QR */

if (qrClose) {

    qrClose.addEventListener("click", (event) => {

        event.preventDefault();
        event.stopPropagation();


        closeQr();

    });

}


/* CLOSE QR FUNCTION */

function closeQr() {

    if (!qrPanel) {
        return;
    }


    qrPanel.classList.remove(
        "active"
    );


    qrPanel.setAttribute(
        "aria-hidden",
        "true"
    );


    if (qrBtn) {

        qrBtn.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    if (
        qrPreviousFocus &&
        typeof qrPreviousFocus.focus === "function"
    ) {

        qrPreviousFocus.focus();

    }

}


/* ESCAPE TO CLOSE QR */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            qrPanel &&
            qrPanel.classList.contains("active")
        ) {

            closeQr();

        }

    }
);


/* INTERNAL PAGE TRANSITION */

document
    .querySelectorAll(".page-link")
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                /*
                 * Allow normal browser behavior for:
                 * - middle click
                 * - Ctrl + click
                 * - Cmd + click
                 * - Shift + click
                 * - Alt + click
                 */

                if (
                    event.button !== 0 ||
                    event.metaKey ||
                    event.ctrlKey ||
                    event.shiftKey ||
                    event.altKey
                ) {
                    return;
                }


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
