@ECHO OFF
type ".\src\meta\*.js" > .\jloads-target.js
type ".\src\core\*.js" >> .\jloads-target.js
type ".\src\lib\*.js" >> .\jloads-target.js
type ".\src\target\*.js" >> .\jloads-target.js
type ".\src\include\*.js" >> .\jloads-target.js
type ".\src\load\*.js" >> .\jloads-target.js
type ".\src\*.js" >> .\jloads-target.js
