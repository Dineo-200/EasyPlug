@echo off
REM Starts backend and frontend in separate cmd windows using Visual Studio NodeJs if available
set "NODE_DIR=C:\Program Files\Microsoft Visual Studio\18\Community\MSBuild\Microsoft\VisualStudio\NodeJs"
if exist "%NODE_DIR%\npm.cmd" (
  set "PATH=%NODE_DIR%;%PATH%"
)
start "EasyPlug Backend" cmd /k "cd /d "C:\Users\DINEO\Downloads\easy plug\backend" && npm.cmd start"
start "EasyPlug Frontend" cmd /k "cd /d "C:\Users\DINEO\Downloads\easy plug\frontend" && npm.cmd start"
necho Started backend and frontend in separate windows.
