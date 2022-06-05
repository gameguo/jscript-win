var path = {};

path.basename = function (p) {
    return p.split(/[\\/]/).pop();
}
path.basenameNoExName = function (p) {
    var fileName = path.basename(p);
    var strs = fileName.split(".");
    if (strs.length < 2) {
        return path;
    }
    var result = "";
    for (var i = 0; i < strs.length - 1; i++) {
        result += strs[i];
        if (i != strs.length - 2) {
            result += ".";
        }
    }
    return result;
}
path.dirname = function (p) {
    return replaceAll(p, '\\', '/').split("/").slice(0, -1).join("/");
}
path.exname = function (p) {
    var s = p.split(/[/\\]/);
    var fileName = s[s.length - 1];
    var strs = fileName.split(".");
    if (strs.length < 2) {
        return "";
    }
    return strs[strs.length - 1];
}
path.join = function (paths) {
    var result = [];
    for (var i = 0; i < paths.length; i++) {
        var part = paths[i];
        var data;
        if (i === 0) {
            data = part.trim().replace(/[\/]*$/g, '')
        } else {
            data = part.trim().replace(/(^[\/]*|[\/]*$)/g, '')
        }
        if (data.length) {
            result.push(data);
        }
    }
    return result.join('/');
}
