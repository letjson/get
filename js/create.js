// create.js

document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();
    loader();
    console.log("form is submitted");
});

function loader() {
    var x = document.forms["myForm"]["json"].value;
    if (x == "") {
        alert("Name must be filled out");
        return false;
    }

    var script = document.createElement('script');
    // script.src = (window.location.hostname === 'localhost') ? "//localhost:8080/load.js" : "//load.jloads.com/load.js";
    // script.src = "//load.jloads.com/load.js";
    var b64 = btoa(x);
    console.log(b64);

    script.src = "//get.wapka.pl/b64/" + b64;
    // script.src = "//localhost:80/b64/" + b64;
    document.head.appendChild(script);

    document.forms["myForm"]["url"].value = script.src;
}
