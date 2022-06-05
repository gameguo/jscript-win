
var cmd = {};

cmd.runCmd = function(cmdStr) {
    var cmd = new ActiveXObject("WScript.Shell");
    cmd.Run(cmdStr, 0, true);
    cmd = null;
}
