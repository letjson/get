var form = new RestForm('form', response, error, success);

form.cfg({
    "target": "form",
    // "url": "//php.jloads.com/index.php",
    "url": "/deploy",
    "method": "POST",
    "event": "submit"
});

// form.url((window.location.hostname === 'localhost') ? "//localhost:8000/index.php" : "//php.jloads.com/index.php");

form.submit();
