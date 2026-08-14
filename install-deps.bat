@echo off
cd /d "D:\Folder dio\Porto\dio-portfolio"
call npm install framer-motion lucide-react > install-deps.log 2>&1
echo EXIT=%ERRORLEVEL% >> install-deps.log
