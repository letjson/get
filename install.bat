@ECHO OFF
echo I will install NPM packages on this project ...
WHERE npm
IF %ERRORLEVEL% NEQ 0 (
    echo npm is not installed on this system!
) else (
    npm install
)
