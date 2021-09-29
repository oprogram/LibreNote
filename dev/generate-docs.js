/* eslint-disable */

/**
 * Requires jsdoc and jsdoc-to-markdown
 */
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const { execSync } = require('child_process')
const jsdoc2md = require('jsdoc-to-markdown')

function generateDocs() {
  console.log('Generating package docs')
  // Use glob to get all js/ts files
  const pathPattern = path.join(__dirname, '../src/**/*.js')
  const filePaths = glob.sync(pathPattern, {
    ignore: [
      '**/node_modules/**',
      '**/cypress/**',
      '**/__tests__/**',
      '**/*.test.js',
      '**/*_spec.js',
    ],
  })

  // Delete everything in docs/code folder
  const docsFolder = path.join(__dirname, '../docs/docs/code');
  fs.rmdirSync(docsFolder, { recursive: true });
  fs.mkdirSync(docsFolder);

  // Pass README.md to docs directory
  const readme = fs.readFileSync(path.join(__dirname, '../README.md'));
  fs.writeFileSync(path.join(__dirname, '../docs/docs/README.md'), `---\nid: readme\nslug: /\n---\n\n${readme}`);

  // grab all js files
  filePaths.forEach((filePath) => {
    // Generate markdown from JSDoc comments
    const markdown = jsdoc2md.renderSync({
      files: filePath,
      configure: path.join(__dirname, '../jsdoc.conf.json')
    })

    // if there's markdown, do stuff
    if (markdown && markdown.length > 0) {
      const fileName = /[^/]*$/.exec(filePath)[0];
      const directory = /[^/]*$/.exec(filePath.slice(0, -(4+fileName.length)))[0];

      console.log(directory, fileName);

      const writeDir = path.join(
        __dirname,
        `../docs/docs/${directory}`,
      )

      if (!fs.existsSync(writeDir)) {
        // create the directory
        fs.mkdirSync(writeDir, { recursive: true })
      }

      fs.writeFileSync(`${writeDir}/${fileName}.md`, `---\nid: ${fileName}\n---\n\n${markdown}`)
    }
  })
  // Let the user know what step we're on
  console.log('\u001B[32m', '✔️ Package docs generated', '\u001B[0m')
}

generateDocs()
process.exit(0)