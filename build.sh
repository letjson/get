cat src/ver.js src/jlogs.js src/map.js  src/jloads-url.js src/xhr.js src/is-empty.js src/has-domain.js src/time.js  src/get-target.js src/e.js src/include-script.js src/include-style.js src/include-html.js src/include-image.js src/load.js src/is-array.js > jloads-url.js
setlocal enabledelayedexpansion
del /f jloads-url.js
for %%f in (src\*.js) do (
  set /p val=<%%f
  ::echo "fullname: %%f"
  echo // %%~nf >> jloads-url.js
  ::echo "contents: !val!"
  echo !val! >> jloads-url.js
)
