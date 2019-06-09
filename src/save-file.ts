import fs from 'fs'

export async function saveFile (
  file: string,
  text: string,
): Promise<void> {
  // if (suffix) {
  //   const backupFile = this.jsonFile + suffix

  //   const readStream = fs.createReadStream(this.jsonFile)
  //   const writeStream = fs.createWriteStream(backupFile)

  //   const future = new Promise((resolve, reject) => {
  //     writeStream.on('close', resolve)
  //     writeStream.on('error', reject)
  //   })
  //   readStream.pipe(writeStream)
  //   await future  // wait file write over
  // }

  await fs.promises.writeFile(file, text)
}
