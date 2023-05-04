#! /usr/bin/env node

const fs = require('fs');
const path = require('path');

const willWritePath = process.argv[2];

const isCreateFolder = !willWritePath.endsWith('.tsx');

const write = () => {
  fs.readFile(path.join(__dirname, './tsx.template'), (err, data) => {
    if (err) throw err;

    const filename = willWritePath.split('/').at(-1).replace('.tsx', '');

    const fileContet = data.toString().replace(/\$\$File/g, filename);

    const filePath = path.join(
      process.cwd(),
      isCreateFolder ? `${willWritePath}/index.tsx` : willWritePath
    );

    if (isCreateFolder) {
      createFolder(path.join(process.cwd(), willWritePath));
    }

    if (fs.existsSync(filePath)) {
      return console.log(`❌ ${filePath} already exists！`);
    }

    fs.writeFile(filePath, fileContet, (err) => {
      if (err) throw err;
      console.log(`✅ ${filePath} created successfully！`);
    });
  });
};

const createFolder = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

write();
