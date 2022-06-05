// str
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 'g'), replace);
}

// path
function getScriptPath() {
    return replaceAll(WScript.ScriptFullName, "\\", "/");
}
function getScriptFolder() {
    return getScriptPath().split("/").slice(0, -1).join("/");
}
function relToAbs(sRelPath) {
    var nUpLn, sDir = "", sPath = getScriptPath().replace(/[^\/]*$/, sRelPath.replace(/(\/|^)(?:\.?\/+)+/g, "$1"));
    for (var nEnd, nStart = 0; nEnd = sPath.indexOf("/../", nStart), nEnd > -1; nStart = nEnd + nUpLn) {
        nUpLn = /^\/(?:\.\.\/)*/.exec(sPath.slice(nEnd))[0].length;
        sDir = (sDir + sPath.substring(nStart, nEnd)).replace(new RegExp("(?:\\\/+[^\\\/]*){0," + ((nUpLn - 1) / 3) + "}$"), "/");
    }
    return sDir + sPath.substring(nStart);
}

// include
var includes = [
    "./utils/object.js",
    "./utils/array.js",
    "./utils/json2.js",
    "./utils/console.js",
    "./utils/string.js",
    "./utils/path.js",
    "./utils/fs.js",
    "./utils/cmd.js",
    "./utils/args.js"
];
for (var i = 0; i < includes.length; i++) {
    var include = includes[i];
    // WScript.Echo("i: " + i + ", include: " + include);
    var fullPath = relToAbs(include);
    eval(new ActiveXObject("Scripting.FileSystemObject").OpenTextFile(fullPath, 1).ReadAll());
}


