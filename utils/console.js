var console = {};

console.log = function (msg) {
    if (typeof msg == "object") {
        WScript.Echo(JSON.stringify(msg));
    } else {
        WScript.Echo(msg);
    }
}
