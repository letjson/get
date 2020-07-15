@ECHO OFF
type ".\src\meta\*.js" > .\jloads-url.js
type ".\src\core\*.js" >> .\jloads-url.js
type "..\apifunc-js\src\*.js" >> .\jloads-url.js
type ".\src\*.js" >> .\jloads-url.js
type ".\src\include\*.js" >> .\jloads-url.js
type ".\src\target\*.js" >> .\jloads-url.js
type ".\src\load\*.js" >> .\jloads-url.js
