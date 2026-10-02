@echo off
rem Run the Cortex test suite. See dev.cmd for why this is a .cmd file.
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
  echo Could not find a conda environment named "cortex" containing Node.
  exit /b 1
)

set "PATH=!ENVDIR!;!ENVDIR!\Scripts;!ENVDIR!\Library\bin;%PATH%"
call npm run content
call npm test
