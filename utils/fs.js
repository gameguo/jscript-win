// fs
var fs = {};

fs.fso = new ActiveXObject("Scripting.FileSystemObject");

function __getFolderList(folderspec) {
    var fso, f, fc;
    fso = fs.fso;
    f = fso.GetFolder(folderspec);
    fc = new Enumerator(f.SubFolders);
    return (fc);
}
function __getFolderFileList(folderspec) {
    var fso, folder, files;
    fso = fs.fso;
    folder = fso.GetFolder(folderspec);
    files = new Enumerator(folder.files);
    return files;
}

fs.getFolders = function(folderPath) {
    var list = [];
    var folders = __getFolderList(folderPath);
    for (; !folders.atEnd(); folders.moveNext()) {
        var folderName = String(folders.item());
        list.push(folderName);
        // console.log("folder: " + folderName);
    }
    return list;
}
fs.getFiles = function(folderPath, recursion) {
    var list = [];
    var files = __getFolderFileList(folderPath);
    for (; !files.atEnd(); files.moveNext()) {
        var fileName = String(files.item());
        list.push(fileName);
        // console.log("fileName: " + fileName);
    }
    if (recursion) {
        var folders = fs.getFolders(folderPath);
        for (var i = 0; i < folders.length; i++) {
            var folder = folders[i];
            var f = fs.getFiles(folder, recursion);
            for (var j = 0; j < f.length; j++) {
                list.push(f[j]);
            }
        }
    }
    return list;
}
fs.deleteFile = function(path) {
    var fso = fs.fso;
    fso.DeleteFile(path);
}
fs.deleteFolder = function(path) {
    var fso = fs.fso;
    fso.DeleteFolder(path);
}
fs.existFile = function (file) {
    var fso = fs.fso;
    return fso.FileExists(file);
}
fs.existFolfer = function (folder) {
    var fso = fs.fso;
    return fso.FolderExists(folder);
}
fs.createFolder = function (folder) {
    var fso = fs.fso;
    if (!fs.existFolfer(folder)) {
        fso.CreateFolder(folder);
    }
}
fs.copyFile = function (source, destination, overwrite) {
    var fso = fs.fso;
    fs.createFolder(path.dirname(destination));
    fso.CopyFile(source, destination, overwrite);
}
fs.copyFolder = function (source, destination, overwrite) {
    var fso = fs.fso;
    fs.createFolder(path.dirname(destination));
    fso.CopyFolder(source, destination, overwrite);
}
fs.moveFile = function (source, destination) {
    var fso = fs.fso;
    fs.createFolder(path.dirname(destination));
    fso.MoveFile(source, destination);
}
fs.moveFolder = function (source, destination) {
    var fso = fs.fso;
    fs.createFolder(path.dirname(destination));
    fso.MoveFolder(source, destination);
}
fs.writeFile = function (path, content) {
    var fso = fs.fso;
    var fh = fso.CreateTextFile(path, true);
    fh.WriteLine(content);
    fh.Close();
}
