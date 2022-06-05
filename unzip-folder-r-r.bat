@echo OFF
cscript %~dp0unzip-folder.js --input "%cd%" --recursion --remove --password "%1"