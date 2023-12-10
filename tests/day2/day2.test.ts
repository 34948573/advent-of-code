import { calculateGameIdsSum } from '../../src/day 2'
import { puzzleData, sampleData } from './testData'

it('sample data test', () => {
  expect(calculateGameIdsSum(sampleData)).toEqual(8)
})

it('puzzle data test', () => {
  expect(calculateGameIdsSum(puzzleData)).toEqual(2600)
})
