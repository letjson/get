@ECHO OFF
type ".\src\meta\*.js" > .\jloads-file.js
type ".\src\core\*.js" >> .\jloads-file.js
type "..\apifunc-js\src\*.js" >> .\jloads-file.js
:: load content remotely if not exist
type ".\src\include\*.js" >> .\jloads-file.js
type ".\src\*.js" >> .\jloads-file.js
type ".\src\load\*.js" >> .\jloads-file.js
type ".\src\all\*.js" >> .\jloads-file.js
type ".\src\file\*.js" >> .\jloads-file.js
::type ".\src\target\*.js" >> .\jloads-file.js
::type ".\src\event\*.js" >> .\jloads-file.js
::type ".\src\form\*.js" >> .\jloads-file.js
::type ".\src\obj\*.js" >> .\jloads-file.js
