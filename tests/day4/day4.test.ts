import fs from 'fs'
import path from 'path'
import { execute as executePart1 } from '../../src/day4/part1'
import { execute as executePart2 } from '../../src/day4/part2'

const sampleData = fs
  .readFileSync(path.resolve(__dirname, 'sampleData.txt'), 'utf8')
  .split('\n')

const puzzleData = fs
  .readFileSync(path.resolve(__dirname, 'puzzleData.txt'), 'utf8')
  .split('\n')

describe('day 4', () => {
  describe('part 1', () => {
    it('sample data', () => {
      expect(executePart1(sampleData)).toEqual(13)
    })

    it('puzzle data', () => {
      expect(executePart1(puzzleData)).toEqual(21105)
    })
  })

  describe('part 2', () => {
    it('sample data', () => {
      expect(executePart2(sampleData)).toEqual(30)
    })

    it('puzzle data', () => {
      expect(executePart2(puzzleData)).toEqual(5329815)
    })
  })
})
