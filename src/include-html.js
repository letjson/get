function includeHtml(url, target, error, success) {
    var xhttp;

    var el = new E(target);
    var elmnt = el.first();

    if (typeof success !== 'function') {
        success = function () {
            console.log('includeHtml success', "included");
        }
    }

    if (typeof error !== 'function') {
        error = function () {
            console.log('includeHtml error', "Page not found.");
        }
    }
    console.log('includeHtml url', url);

    if (url) {
        /* Make an HTTP request using the attribute value as the url name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            console.log('includeHtml el_id', target);

            if (this.readyState == 4) {
                if (this.status == 200) {
                    // console.log('elmnt', elmnt);
                    // console.log('responseText', this.responseText);
                    // elmnt.innerHTML = this.responseText;
                    // elmnt.appendChild(this.responseText);
                    // elmnt.insertAdjacentHTML('beforeend', this.responseText);
                    // var e = document.createElement('div');
                    // e.innerHTML = this.responseText;
                    // while(e.firstChild) {
                    // elmnt.appendChild(e);
                    // }

                    // elmnt.insertAdjacentHTML('afterend', this.responseText);
                    elmnt.insertAdjacentHTML('beforeend', this.responseText);

                    success(this);
                }
                if (this.status == 404) {
                    elmnt.innerHTML = "includeHtml Page not found.";
                    error(this);
                }
                /* Remove the attribute, and call this function once more: */
                // includeHtml(url, success, error);
            }
        }
        xhttp.open("GET", url, true);
        xhttp.send();
        /* Exit the function: */
        return this;
    }
}
