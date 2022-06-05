// include common.js
var common = WScript.ScriptFullName.split("\\").slice(0, -1).join("\\") + "\\common.js";
eval(new ActiveXObject("Scripting.FileSystemObject").OpenTextFile(common, 1).ReadAll());

// main
function main() {
    console.log("test");
}
main();