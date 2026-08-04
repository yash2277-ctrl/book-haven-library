@echo off
title Book Haven - One Click Launcher

set "ROOT=%~dp0"
set "APPDIR=%ROOT%book-haven-display-main"

if not exist "%APPDIR%\" (
  echo Could not find: %APPDIR%
  echo Please keep this file next to the "book-haven-display-main" folder.
  pause
  exit /b 1
)

cd /d "%APPDIR%"

if exist "START_SERVERS.bat" (
  call "START_SERVERS.bat"
  exit /b %errorlevel%
)

echo START_SERVERS.bat was not found in %APPDIR%.
echo Try running: npm run dev
pause
exit /b 1

