@ECHO OFF
type ".\src\meta\*.js" > .\jloads.js
type ".\src\core\*.js" >> .\jloads.js
type ".\src\lib\*.js" >> .\jloads.js
type ".\src\include\*.js" >> .\jloads.js
type ".\src\load\*.js" >> .\jloads.js
type ".\src\*.js" >> .\jloads.js
type ".\src\all\*.js" >> .\jloads.js
::type ".\src\target\*.js" >> .\jloads.js
::type ".\src\event\*.js" >> .\jloads.js
::type ".\src\form\*.js" >> .\jloads.js
::type ".\src\obj\*.js" >> .\jloads.js
