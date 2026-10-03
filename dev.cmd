@echo off
rem Start Cortex and open it in your browser.
rem
rem Double-click this file, or run it from any terminal. It finds the `cortex`
rem conda environment itself, so it needs no `conda activate` and is unaffected
rem by the PowerShell execution policy that blocks profile scripts.
rem
rem Leave the window open while using the app. Closing it stops the app.
setlocal enabledelayedexpansion
cd /d "%~dp0"

call :find_env
if "!ENVDIR!"=="" goto :no_env

set "PATH=!ENVDIR!;!ENVDIR!\Scripts;!ENVDIR!\Library\bin;%PATH%"

echo.
echo   Building the questions...
call npm run content
if errorlevel 1 goto :content_failed

echo.
echo   Starting Cortex. Your browser should open on its own.
echo   If it does not, go to:  http://localhost:5173
echo.
echo   KEEP THIS WINDOW OPEN while you use the app.
echo   Close it (or press Ctrl+C) when you are finished.
echo.
call npx vite --open
goto :eof

:find_env
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
goto :eof

:content_failed
echo.
echo   A question file has a problem, so Cortex did not start.
echo   The error is printed above - it names the file and what is wrong.
echo.
pause
exit /b 1

:no_env
echo.
echo   Could not find a conda environment named "cortex" containing Node.
echo   Create it with:
echo.
echo       conda create -n cortex -c conda-forge python=3.12 nodejs=22 git
echo.
pause
exit /b 1
