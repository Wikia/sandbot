const fs = require('fs');
const { execSync } = require('child_process');

async function setup() {
  fs.readdir(`${__dirname}`, async (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    const toProcess = [];

    files.forEach((file) => {
      // console.log(file);
      if (/[\d]{3}.+\.js/.test(file)) {
        toProcess.push(file);
      }
    });

    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
    const sorted = toProcess.sort((a, b) => collator.compare(a, b));
    await sorted.forEach((file) => {
      console.log(`==> Processing file: ${file}`);
      const stdOut = execSync(`node ${file}`);
      console.log(stdOut.toString());
    });
  });
}

setup();
