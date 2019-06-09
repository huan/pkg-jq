import { run } from 'node-jq'

export async function jqFile (
  filter: string,
  file: string,
): Promise<string> {
  const result = await run(filter, file)
  return result as string // FIXME
}

export async function jqString (
  filter: string,
  text: string,
): Promise<string> {
  const result = await run(filter, text, { input: 'string' })
  return result as string // FIXME
}

export async function jqJson (
  filter : string,
  json   : object,
): Promise<string> {
  const result = await run(filter, json, { input: 'json' })
  return result as string // FIXME
}
