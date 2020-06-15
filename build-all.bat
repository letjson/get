@ECHO OFF
type ".\src\meta\*.js" > .\jloads-all.js
type ".\src\core\*.js" >> .\jloads-all.js
type ".\src\lib\*.js" >> .\jloads-all.js
type ".\src\*.js" >> .\jloads-all.js
type ".\src\target\*.js" >> .\jloads-all.js
type ".\src\event\*.js" >> .\jloads-all.js
