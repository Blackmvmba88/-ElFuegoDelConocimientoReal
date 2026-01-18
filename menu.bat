@echo off
REM 🔥 El Fuego del Conocimiento Real - Menu Launcher (Windows)

setlocal EnableDelayedExpansion

REM Get the directory where this batch file is located
set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%"

REM Check if Python is available
where python >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    set PYTHON_CMD=python
    goto :check_version
)

where python3 >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    set PYTHON_CMD=python3
    goto :check_version
)

where py >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    set PYTHON_CMD=py
    goto :check_version
)

echo Error: Python is not installed
echo Please install Python 3.7 or higher to use this menu
echo.
echo Download from: https://www.python.org/downloads/
pause
exit /b 1

:check_version
REM Check Python version
for /f "tokens=2" %%i in ('%PYTHON_CMD% --version 2^>^&1') do set PYTHON_VERSION=%%i

REM Extract major and minor version
for /f "tokens=1,2 delims=." %%a in ("%PYTHON_VERSION%") do (
    set MAJOR=%%a
    set MINOR=%%b
)

if %MAJOR% LSS 3 (
    echo Error: Python 3.7 or higher is required
    echo Current version: %PYTHON_VERSION%
    pause
    exit /b 1
)

if %MAJOR% EQU 3 if %MINOR% LSS 7 (
    echo Error: Python 3.7 or higher is required
    echo Current version: %PYTHON_VERSION%
    pause
    exit /b 1
)

REM Run the menu
echo 🔥 Starting El Fuego del Conocimiento Real Menu...
echo.

%PYTHON_CMD% menu.py %*

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Menu exited with error code %ERRORLEVEL%
    pause
)

endlocal
