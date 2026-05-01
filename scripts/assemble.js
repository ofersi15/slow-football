import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const shell = readFileSync(resolve(root, 'src', 'index.html'), 'utf8')
const partials = (shell.match(/<!-- include:(\S+) -->/g) || []).map(m => m.match(/<!-- include:(\S+) -->/)[1])

const assembled = shell.replace(/<!-- include:(\S+) -->\n?/g, (_, name) => {
  return readFileSync(resolve(root, 'src', 'templates', `${name}.html`), 'utf8')
})

writeFileSync(resolve(root, 'index.html'), assembled)
console.log(`index.html assembled (${partials.length} partials: ${partials.join(', ')})`)
