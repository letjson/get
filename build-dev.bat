@ECHO OFF
:: Prepare the developer version without minimizing the content in file jloads.min.js
type ".\src\meta\*.js" > .\jloads.js
type ".\src\core\*.js" >> .\jloads.js
type "..\apifunc-js\src\*.js" >> .\jloads.js
type ".\src\event\*.js" >> .\jloads.js
type ".\src\include\*.js" >> .\jloads.js
type ".\src\load\*.js" >> .\jloads.js
type ".\src\*.js" >> .\jloads.js
type ".\src\form\*.js" >> .\jloads.js
type ".\src\url\*.js" >> .\jloads.js
type ".\src\jloads\*.js" >> .\jloads.js
type ".\src\all\*.js" >> .\jloads.js
xcopy /y/r jloads.js jloads.min.js
