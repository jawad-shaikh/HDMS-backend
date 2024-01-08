const nodeZip = require('node-zip');

const createZipArchive = (files) => {
  const zip = new nodeZip();

  files.forEach((file) => {
    const content = fs.readFileSync(file.path);
    zip.file(file.name, content);
  });

  const zipData = zip.generate({ base64: false, compression: 'DEFLATE' });

  return zipData;
};

module.exports = createZipArchive;
