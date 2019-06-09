declare module'node-jq' {
  export function run (filter: string, json: string | object, options?: object): Promise<string | object>
}
