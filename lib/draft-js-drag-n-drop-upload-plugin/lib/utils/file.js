'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.containsFiles = containsFiles;
exports.readFile = readFile;
exports.readFiles = readFiles;
// Check if drag event contains files (not text)
function containsFiles(event) {
  if (event.dataTransfer.types) {
    for (var i = 0; i < event.dataTransfer.types.length; i += 1) {
      if (event.dataTransfer.types[i] === 'Files') {
        return true;
      }
    }
  }

  return false;
}

// Read file contents intelligently as plain text/json, image as dataUrl or
// anything else as binary
function readFile(file, fileFilter) {
  return new Promise(function (resolve) {
    var reader = new FileReader();

    // This is called when finished reading
    reader.onload = function (event) {
      // Return an array with one image
      resolve({
        // These are attributes like size, name, type, ...
        lastModifiedDate: file.lastModifiedDate,
        lastModified: file.lastModified,
        name: file.name,
        size: file.size,
        type: file.type,

        // This is the files content as base64
        src: event.target.result
      });
    };

    if (fileFilter && !fileFilter(file)) {
      resolve(null);
      return;
    }

    if (file.type.indexOf('text/') === 0 || file.type === 'application/json') {
      reader.readAsText(file);
    } else if (file.type.indexOf('image/') === 0) {
      reader.readAsDataURL(file);
    } else {
      reader.readAsBinaryString(file);
    }
  });
}

// Read multiple files using above function
function readFiles(files) {
  return Promise.all(files.map(readFile));
}