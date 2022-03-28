import axios from "axios";
import buffer from "buffer/";
const Buffer = buffer.Buffer;
import dayjs from "dayjs";
import {ref} from "vue";
const loading = ref(false);

/**
 * Opens specified URL in a new window or tab (depending on browser settings)
 * and ensures that it is in focus.
 * @param url The URL to navigate to.
 */
function openInNewTab(url) {
    window.open(url, '_blank', 'noopener, noreferrer');
}


/**
 * Downloads an image and returns it as Base64 string.
 * @param url The URL of the image to download.
 */
function fetchImage(url) {
    loading.value = true;
    return axios.get(url, { responseType: "arraybuffer" })
        .then((response) => {
            const mediatype = response.headers["content-type"];
            const buff = Buffer.from(response.data, "binary").toString("base64");
            loading.value = false;
            return `data:${mediatype};base64,${buff}`;
        });
}




function dateObjToDateString(date) {
    return dayjs(date).format("DD MMM YYYY");
}




function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? "successful" : "unsuccessful";
        console.log("Copy to clipboard (fallback), copied: ", text);
    } catch (err) {
        console.error("Copy to clipboard (fallback), could NOT copy text: ", err);
    }

    document.body.removeChild(textArea);
}




function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function() {
        console.log("Copy to clipboard (async), copied: ", text);
    }, function(err) {
        console.error("Copy to clipboard (async), could NOT copy text: ", err);
    });
}



export default {
    install(app, options) {
        app.provide("$utils", {
            openInNewTab,
            fetchImage,
            dateObjToDateString,
            copyTextToClipboard,
            loading
        });
    }
}
