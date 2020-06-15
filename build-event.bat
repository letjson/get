@ECHO OFF
type ".\src\meta\*.js" > .\build-event.js
type ".\src\core\*.js" >> .\build-event.js
type ".\src\lib\*.js" >> .\build-event.js
type ".\src\settings\*.js" >> .\build-event.js
type ".\src\form\*.js" >> .\build-event.js
type ".\src\*.js" >> .\build-event.js
type ".\src\event\*.js" >> .\build-event.js
