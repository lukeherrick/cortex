@echo off
rem Start the Cortex dev server.
rem
rem Double-click this file, or run it from any terminal. It finds the `cortex`
rem conda environment itself, so it needs no `conda activate` and is unaffected
rem by the PowerShell execution policy that blocks profile scripts.
setlocal enabledelayedexpansion
cd /d "%~dp0"

call :find_env
if "!ENVDIR!"=="" goto :no_env

set "PATH=!ENVDIR!;!ENVDIR!\Scripts;!ENVDIR!\Library\bin;%PATH%"
echo Using Node from !ENVDIR!
call npm run dev
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

:no_env
echo.
echo Could not find a conda environment named "cortex" containing Node.
echo Create it with:
echo.
echo     conda create -n cortex -c conda-forge python=3.12 nodejs=22 git
echo.
exit /b 1
