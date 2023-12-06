import { calculateSum } from '../../src/day1'
import { smallTestData, challengeData } from './testData'

it('sample data test', () => {
  expect(calculateSum(smallTestData)).toEqual(281)
})

it('challenge data test', () => {
  expect(calculateSum(challengeData)).toEqual(53644)
})
