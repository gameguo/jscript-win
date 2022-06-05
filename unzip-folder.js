// include common.js
var common = WScript.ScriptFullName.split("\\").slice(0, -1).join("\\") + "\\common.js";
eval(new ActiveXObject("Scripting.FileSystemObject").OpenTextFile(common, 1).ReadAll());

// main
function main() {
    var inputFolder = args["input"];
    var isRecursion = args.recursion != null? args.recursion : false;
    var isRemove = args.remove != null? args.remove : false;
    var password = args.password != null? args.password :  "";

    console.log("inputFolder: " + inputFolder + ", common password: " + password + ", recursion: " + isRecursion);

    // https://sparanoid.com/lab/7z/
    var unzipExNames = [
        "7z", "zx", "bzip2", "gzip", "tar", "zip", "wim", "ar", "arj", "cab", "chm", "cpio", "cramfs", "dmg", "ext", "fat", "gpt", "hfs", "ihex", "iso", "lzh", "lzma", "mbr", "msi", "nsis", "qcow2", "rar", "rpm", "squashfs", "udf", "uefi", "vdi", "vhd", "vmdk", "xar", "z",
    ];
    function isSupportUnzip(exName) {
        var exName = exName.toLowerCase();
        for (var i = 0; i < unzipExNames.length; i++) {
            if (exName == unzipExNames[i]) {
                return true;
            }
        }
        return false;
    }
    console.log("");

    var files = fs.getFiles(inputFolder, isRecursion);

    var allCount = files.length;
    var unzipCount = 0;
    var removeCount = 0;

    console.log("input files: " + allCount + "");
    console.log("start unzip...\n");

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var exName = path.exname(file);
        if (!isSupportUnzip(exName)) {
            console.log("not support exName: " + exName);
            if (isRemove) {
                console.log("remove file: " + file);
                removeCount++;
                fs.deleteFile(file);
            }
            continue;
        }
        var folder = path.join([path.dirname(file), path.basenameNoExName(file).trim()]);
        console.log("unzip file: \"" + file + "\" to folder: \"" + folder + "\"");
        var cmdStr = '"C:\\Program Files\\soft\\7-Zip\\7z.exe" x "' + file + '" -o"' + folder + '" -p"' + password + '"';
        // console.log("run cmd: " + cmd);
        cmd.runCmd(cmdStr);
        unzipCount++;
        console.log("unzip file success");
        if (isRemove) {
            console.log("remove file: " + file);
            removeCount++;
            fs.deleteFile(file);
        }
        console.log("");
    }
    if (removeCount > 0) {
        console.log("\n\nall success: inputCount: " + allCount + ", unzipCount: " + unzipCount + ", removeCount: " + removeCount);
    } else {
        console.log("\n\nall success: inputCount: " + allCount + ", unzipCount: " + unzipCount);
    }
}
main();
