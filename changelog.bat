@ECHO OFF
setlocal enabledelayedexpansion
for %%f in (Ticket\*.md) do (
  set /p val=<%%f
  ::echo "fullname: %%f"
  echo # %%~nf >> changelog.md
  ::echo "contents: !val!"
  echo !val! >> changelog.md
)
