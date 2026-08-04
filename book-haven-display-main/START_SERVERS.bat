@echo off
title Book Haven - Library Management System

echo.
echo ================================================
echo   Starting Book Haven Servers
echo ================================================
echo.

cd /d "%~dp0"

echo Backend Server: http://localhost:5000
echo Frontend App: http://localhost:8080
echo.
echo Press Ctrl+C in any window to stop that server
echo.

echo [1/2] Starting Backend Server...
start "Book Haven - Backend API" cmd /k "cd /d %~dp0\backend && npm run dev"

timeout /t 3 /nobreak >nul

echo [2/2] Starting Frontend Server...
start "Book Haven - Frontend" cmd /k "cd /d %~dp0 && npm run dev"

echo.
echo Both servers are starting...
echo Check the opened terminal windows for status
echo.
pause
