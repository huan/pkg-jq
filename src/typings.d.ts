declare module 'node-jq' {
  export function run (
    filter   : string,
    json     : string | object,
    options? : object,
  ): Promise<string | object>
}

declare module 'jq.node' {
  export function jq(
    input          : string,
    transformation : string,
    options        : object,
    callback       : (err: Error, output: string) => void,
  ): void
}
