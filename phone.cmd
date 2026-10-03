@echo off
rem Serve Cortex to other devices on your home WiFi, so you can use it on your
rem phone while the laptop is on.
rem
rem This is NOT the same as installing it. Over plain http your phone will run
rem the app but cannot install it to the home screen and cannot work offline -
rem browsers only allow that over https. For a real install, Cortex has to be
rem deployed to a web host. This is the no-setup option for using it at home.
setlocal enabledelayedexpansion
cd /d "%~dp0"

set "ENVDIR="
for %%D in (
  "%USERPROFILE%\miniconda3\envs\cortex"
  "%USERPROFILE%\anaconda3\envs\cortex"
  "%USERPROFILE%\Miniforge3\envs\cortex"
  "%LOCALAPPDATA%\miniconda3\envs\cortex"
  "%LOCALAPPDATA%\anaconda3\envs\cortex"
  "C:\ProgramData\miniconda3\envs\cortex"
  "C:\ProgramData\anaconda3\envs\cortex"
) do (
  if exist "%%~D\node.exe" set "ENVDIR=%%~D"
)

if "!ENVDIR!"=="" (
  echo   Could not find a conda environment named "cortex" containing Node.
  pause
  exit /b 1
)

set "PATH=!ENVDIR!;!ENVDIR!\Scripts;!ENVDIR!\Library\bin;%PATH%"

echo.
echo   Building the questions...
call npm run content
if errorlevel 1 (
  echo.
  echo   A question file has a problem, so Cortex did not start.
  pause
  exit /b 1
)

echo.
echo   ====================================================================
echo    On your phone, connect to the SAME WiFi as this laptop, then open
echo    the address printed below next to "Network".
echo.
echo    It will look like   http://192.168.x.x:5173
echo.
echo    KEEP THIS WINDOW OPEN. Closing it stops the app on your phone too.
echo   ====================================================================
echo.

call npx vite --host
