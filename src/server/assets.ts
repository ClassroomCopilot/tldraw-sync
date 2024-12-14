import { mkdir, readFile, writeFile } from 'fs/promises'
import { join, resolve } from 'path'
import { Readable } from 'stream'
import crypto from 'crypto'

// We are just using the filesystem to store assets
const DIR = resolve('./.assets')

function hashFileName(fileName: string): string {
  return crypto.createHash('md5').update(fileName).digest('hex')
}

export async function storeAsset(id: string, stream: Readable) {
  console.log(`Storing asset with ID: ${id}`)
  console.log(`Asset directory: ${DIR}`)
  
  try {
    await mkdir(DIR, { recursive: true })
    console.log(`Directory created or already exists: ${DIR}`)
    
    const hashedFileName = hashFileName(id)
    const filePath = join(DIR, hashedFileName)
    console.log(`Writing file to path: ${filePath}`)
    
    const chunks = []
    for await (const chunk of stream) {
      chunks.push(chunk)
    }
    const buffer = Buffer.concat(chunks)
    
    await writeFile(filePath, buffer)
    console.log(`Asset stored successfully with ID: ${id}`)
  } catch (error) {
    console.error(`Error storing asset with ID: ${id}`, error)
    throw error
  }
}

export async function loadAsset(id: string) {
  console.log(`Loading asset with ID: ${id}`)
  const hashedFileName = hashFileName(id)
  const filePath = join(DIR, hashedFileName)
  console.log(`Reading file from path: ${filePath}`)
  
  try {
    const data = await readFile(filePath)
    console.log(`Asset loaded successfully with ID: ${id}`)
    return data
  } catch (error) {
    console.error(`Error loading asset with ID: ${id}`, error)
    throw error
  }
}