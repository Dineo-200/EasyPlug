# Starts backend and frontend in separate PowerShell windows using local Node
$nodeDir = 'C:\Program Files\Microsoft Visual Studio\18\Community\MSBuild\Microsoft\VisualStudio\NodeJs'
if (Test-Path $nodeDir) {
  $env:PATH = "$nodeDir;$env:PATH"
}

$backendDir = 'C:\Users\DINEO\Downloads\easy plug\backend'
$frontendDir = 'C:\Users\DINEO\Downloads\easy plug\frontend'

Start-Process powershell -ArgumentList @('-NoExit','-NoProfile','-Command', "cd '$backendDir'; npm.cmd start") -WindowStyle Normal -WorkingDirectory $backendDir
Start-Process powershell -ArgumentList @('-NoExit','-NoProfile','-Command', "cd '$frontendDir'; npm.cmd start") -WindowStyle Normal -WorkingDirectory $frontendDir
Write-Output 'Started backend and frontend in separate PowerShell windows.'
