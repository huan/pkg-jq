#!/usr/bin/env node

import { ArgumentParser }   from 'argparse'
import updateNotifier       from 'update-notifier'
import pkgUp                from 'pkg-up'

import { jqFile }       from '../src/node-jq'
import { resolveFile }  from '../src/resolve-file'
import { saveFile }     from '../src/save-file'

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

  const options = {} as { [key: string]: any }

  if (args.raw) {
    // SEE: https://github.com/sanack/node-jq/pull/173
    options['raw'] = true
  }

  let result = await jqFile(args.filter, file, options)

  // FIXME: wait for https://github.com/sanack/node-jq/pull/173 to be merged
  if (args.raw) {
    if (result[0] === '"') {
      result = result.substr(1, result.length - 2)
    }
  }

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
    [ '-r' ],
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
