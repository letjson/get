@ECHO OFF
echo I will stop the nodejs application ...
::tasklist /v | find "node.exe"
taskkill /F /IM node.exe
