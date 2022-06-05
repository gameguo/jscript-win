// include common.js
var common = WScript.ScriptFullName.split("\\").slice(0, -1).join("\\") + "\\common.js";
eval(new ActiveXObject("Scripting.FileSystemObject").OpenTextFile(common, 1).ReadAll());

// main
function main() {
    var inputPath = args.input;
    var outputPath = args.output;
    console.log("input: " + inputPath);
    console.log("output: " + outputPath);
    var logTxt = [];
    function logAndWrite(text) {
        logTxt.push(text);
        console.log(text);
    }
    function saveLog() {
        var txt = logTxt.join('\n');
        fs.writeFile(path.join([inputPath, "log.txt"]), txt);
    }

    var nameMap = {};
    var count = 0;
    var successCount = 0;
    var errorCount = 0;
    var allTxtCount = 0;
    var subFolders = fs.getFolders(inputPath);
    subFolders.forEach(function (folder) {
        logAndWrite("\nhandle folder: " + folder);
        var files = fs.getFiles(folder, true);
        var folderName = path.basename(folder);
        var lastCount = files.length;
        files = files.filter(function (f) { return path.exname(f).toLowerCase() != "txt"; });
        var newCount = files.length;
        var txtCount = newCount - lastCount;
        if (files.length != 0) {
            var first = files[0];
            var fileName = path.basenameNoExName(first);
            var baseDir = path.dirname(first);
            var names = fileName.split(' ');
            var lastSpace = names[names.length - 1];
            var name = names.slice(0, -1).join(" ");
            var startStr = "\u8822\u6cab\u6cab"; // chun mo mo de zhong wen
            var index = name.indexOf(startStr);
            if (index >= 0) {
                name = name.substring(index).trim();
            }
            if (isNaN(lastSpace)) {
                console.log("warning lastName: " + lastSpace);
                name = folderName;
            }
            if (nameMap[name] != null) {
                logAndWrite("warning: path: " + first + ", name repet: " + name);
            }
            nameMap[name] = {};
            logAndWrite("name: " + name);
            var subCount = files.length;
            var subSuccessCount = 0;
            var subErrorCount = 0;
            files.forEach(function (file) {
                var fileName = path.basename(file);
                var dir = path.dirname(file);
                var newName = name;
                if (dir != baseDir) {
                    var dirIndex = dir.lastIndexOf(baseDir);
                    if (dirIndex >= 0) {
                        var sub = dirIndex + baseDir.length;
                        newName = path.join([name, dir.substring(sub).trim()]).trim();
                        logAndWrite("update name: " + name);
                    }
                }
                var output = path.join([outputPath, newName, fileName]);
                try {
                    // logAndWrite('copy file: "' + file + '" ==> to: "' + output + '"');
                    fs.copyFile(file, output, true);
                    subSuccessCount++;
                    successCount++;
                }
                catch (err) {
                    logAndWrite(err);
                    subErrorCount++;
                    errorCount++;
                }
            });
            logAndWrite("subCount: " + subCount + ", subFolder success: " + subSuccessCount + ", subError: " + subErrorCount + ", txtCount: " + txtCount);
            count++;
        } else {
            logAndWrite("length 0: " + folder);
        }
    });

    logAndWrite("");
    logAndWrite("count: " + count + ", success: " + successCount + ", error: " + errorCount + ", allTxtCount: " + allTxtCount);
    saveLog();
}
main();