import fs from 'fs'
import path from 'path'
import { executePart1 } from '../../src/day3/part1'

describe('part 1', () => {
  it('sample data', () => {
    const input = fs
      .readFileSync(path.resolve(__dirname, 'sampleData.txt'), 'utf8')
      .split('\n')

    expect(executePart1(input)).toEqual(4361)
  })

  it('puzzle data', () => {
    const input = fs
      .readFileSync(path.resolve(__dirname, 'puzzleData.txt'), 'utf8')
      .split('\n')

    // expect(executePart1(input)).toEqual(4361)
  })
})
