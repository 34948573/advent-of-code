import { calculateGameIdsSumAndPowers } from '../../src/day 2'
import { puzzleData, sampleData } from './testData'

describe('part 1', () => {
  it('sample data test - part 1', () => {
    const { gameIdsSum } = calculateGameIdsSumAndPowers(sampleData)
    expect(gameIdsSum).toEqual(8)
  })

  it('puzzle data test - part 1', () => {
    const { gameIdsSum } = calculateGameIdsSumAndPowers(puzzleData)
    expect(gameIdsSum).toEqual(2600)
  })
})

describe('part 2', () => {
  it('sample data - part 2', () => {
    const { minimumCubePowers } = calculateGameIdsSumAndPowers(sampleData)
    expect(minimumCubePowers).toEqual(2286)
  })

  it('puzzle data - part 2', () => {
    const { minimumCubePowers } = calculateGameIdsSumAndPowers(puzzleData)
    expect(minimumCubePowers).toEqual(86036)
  })
})
