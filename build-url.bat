@ECHO OFF
type ".\src\meta\*.js" > .\jloads-url.js
type ".\src\core\*.js" >> .\jloads-url.js
type ".\src\lib\*.js" >> .\jloads-url.js
type ".\src\target\*.js" >> .\jloads-url.js
type ".\src\*.js" >> .\jloads-url.js
