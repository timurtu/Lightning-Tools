#!/usr/bin/env node

const fs = require('fs')
const glob = require('glob')
const chalk = require('chalk')

const keywords = ['document']

console.log(process.argv)

const path = process.argv[3] ? process.argv[3] : 'src'

const filenames = glob.sync(path + '/**/*.js', {})
let hasErrors = false

filenames.forEach(filename => {
  const contents = fs.readFileSync(filename, 'utf8')
  const lines = contents.split('\n')

  lines.forEach((line, number) => {
    keywords.forEach(keyword => {
      if (line.includes(keyword)) {
        hasErrors = true
        console.log(chalk.red(`Error: ${filename} line ${number + 1} ${line}`))
      }
    })
  })
})

if (hasErrors) {
  process.exit(1)
}

console.log(chalk.greenBright('App is compatible'))
