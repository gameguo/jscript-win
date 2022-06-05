@echo OFF
cscript %~dp0unzip-folder.js --input "%cd%" --recursion --password "%1"