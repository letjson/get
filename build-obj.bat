@ECHO OFF
type ".\src\meta\*.js" > .\jloads-obj.js
type ".\src\core\*.js" >> .\jloads-obj.js
type "..\apifunc-js\src\*.js" >> .\jloads-obj.js
type ".\src\include\*.js" >> .\jloads-obj.js
type ".\src\load\*.js" >> .\jloads-obj.js
type ".\src\target\*.js" >> .\jloads-obj.js
type ".\src\*.js" >> .\jloads-obj.js
type ".\src\form\*.js" >> .\jloads-obj.js
type ".\src\obj\*.js" >> .\jloads-obj.js
