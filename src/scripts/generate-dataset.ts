import {config} from 'dotenv'
config()

import { writeFile } from 'fs/promises'
import { resolve } from 'path'
import { getAllCostumes } from '../models/character'
import { getAllWeapons } from '../models/weapon'

async function writeDataset() {
  try {
    console.time('Fetching all costumes and weapons...')
    const [costumes, weapons] = await Promise.all([
      getAllCostumes({ allStats: false }),
      getAllWeapons()
    ])
    console.timeEnd('Fetching all costumes and weapons...')

    const charactersFile = resolve(__dirname, '../datasets/characters.json')
    const weaponsFile = resolve(__dirname, '../datasets/weapons.json')

    console.log('Success. Writing files...')

    console.time('Writing...')
    await Promise.all([
      writeFile(charactersFile, JSON.stringify(costumes, null, 2)),
      writeFile(weaponsFile, JSON.stringify(weapons, null, 2))
    ])
    console.timeEnd('Writing...')
    console.log('Done!')
  } catch (error) {
    console.error('Error writing dataset', error)
    process.exit(1);
  }
}

writeDataset()