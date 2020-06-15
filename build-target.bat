@ECHO OFF
type ".\src\meta\*.js" > .\build-target.bat
type ".\src\core\*.js" >> .\build-target.bat
type ".\src\lib\*.js" >> .\build-target.bat
type ".\src\settings\*.js" >> .\build-target.bat
type ".\src\form\*.js" >> .\build-target.bat
type ".\src\*.js" >> .\build-target.bat
type ".\src\target\*.js" >> .\build-target.bat
