// installDependencies.js

const dependencies = [
  '@editorjs/embed',
  '@editorjs/table',
  '@editorjs/paragraph',
  '@editorjs/list',
  '@editorjs/warning',
  '@editorjs/code',
  '@editorjs/link',
  '@editorjs/image',
  '@editorjs/raw',
  '@editorjs/header',
  '@editorjs/quote',
  '@editorjs/marker',
  '@editorjs/checklist',
  '@editorjs/delimiter',
  '@editorjs/inline-code',
  '@editorjs/simple-image',
]

const execSync = require('child_process').execSync

dependencies.forEach((dependency) => {
  try {
    console.log(`Installing ${dependency}...`)
    execSync(`npm install ${dependency} --save-dev`)
    console.log(`${dependency} installed successfully.`)
  } catch (error) {
    console.error(`Error installing ${dependency}: ${error}`)
  }
})
