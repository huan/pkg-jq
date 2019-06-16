#!/usr/bin/env node

import { ArgumentParser }   from 'argparse'
import updateNotifier       from 'update-notifier'
import pkgUp                from 'pkg-up'

import {
  jqFile,
  // FIXME: Unused JqOptions ???
  // eslint-disable-next-line
  JqOptions,
}                       from '../src/node-jq'
import { resolveFile }   from '../src/resolve-file'
import { saveFile }      from '../src/save-file'

import {
  VERSION,
}               from '../src/'

async function checkUpdate () {
  const pkgFile   = await pkgUp({ cwd: __dirname })
  if (!pkgFile) {
    throw new Error('package.json not found!')
  }

  const pkg = require(pkgFile)
  const updateCheckInterval = 1000 * 60 * 60 * 24 * 7  // 1 week

  const notifier = updateNotifier({
    pkg,
    updateCheckInterval,
  })

  notifier.notify()
}

async function main (args: Args): Promise<number> {
  checkUpdate().catch(console.info)

  const file   = await resolveFile(args.path)

  const options: JqOptions = {}

  if (args.raw) {
    options['raw'] = true
  }

  let result = await jqFile(args.filter, file, options)

  if (args.inplace) {
    await saveFile(file, result)
  } else {
    console.info(result)
  }

  return 0
}

interface Args {
  filter  : string
  inplace : boolean
  path    : string
  raw     : boolean
}

function parseArguments (): Args {
  const parser = new ArgumentParser({
    addHelp     : true,
    description : 'Node.js Package jq Utility',
    epilog      : `Exmaple: pkg-jq -i '.publishConfig.tag="next"'`,
    prog        : 'pkg-jq',
    version     : VERSION,
  })

  parser.addArgument(
    [ 'filter' ],
    {
      help: `jq filter.`,
    },
  )

  parser.addArgument(
    [ 'path' ],
    {
      help         : 'npm project subdir, or json file. default: $PWD.',
      nargs        : '?',
      defaultValue : process.cwd(),
    },
  )

  parser.addArgument(
    [ '-i', '--in-place' ],
    {
      help: 'edit files in place.',
      action: 'storeConst',
      constant: true,
      defaultValue: false,
      dest: 'inplace',
    },
  )

  parser.addArgument(
    [ '-r', '--raw' ],
    {
      help: 'output raw strings, not JSON texts.',
      action: 'storeConst',
      constant: true,
      defaultValue: false,
      dest: 'raw',
    },
  )

  return parser.parseArgs()
}

process.on('warning', (warning) => {
  console.info(warning.name)    // Print the warning name
  console.info(warning.message) // Print the warning message
  console.info(warning.stack)   // Print the stack trace
})

main(parseArguments())
  .then(process.exit)
  .catch(e => {
    console.info(e)
    process.exit(1)
  })
