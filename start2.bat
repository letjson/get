@ECHO OFF
echo I will start NODEJS server for this project ...
WHERE node
IF %ERRORLEVEL% NEQ 0 (
    echo nodejs is not installed on this system!
) else (
    forever start server.js
)

::node my_app.js > my_app_log.log 2> my_app_err.log
