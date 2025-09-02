@echo off
REM --------------------------
REM open.bat for Vite + React
REM --------------------------

REM প্রকল্পের ফোল্ডারে যাও
cd /d "C:\Users\USER\Desktop\my-project"

REM npm run dev চালাও নতুন CMD উইন্ডোতে (forces cmd.exe)
start "" cmd.exe /k "npm run dev"

REM ব্রাউজারে Vite dev server খুলো (default: localhost:5173)
start "" "http://localhost:5173/"

REM বন্ধ করার জন্য pause (optional)
pause
