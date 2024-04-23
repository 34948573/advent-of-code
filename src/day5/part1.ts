enum Category {
  SEED = 'seed',
  SOIL = 'soil',
  FERTILIZER = 'fertilizer',
  WATER = 'water',
  LIGHT = 'light',
  TEMPERATURE = 'temperature',
  HUMIDITY = 'humidity',
  LOCATION = 'location'
}

type RangeMap = {
  destinationRangeStart: number
  sourceRangeStart: number
  rangeLength: number
}

type FromToMap = {
  from: Category
  to: Category
  maps: RangeMap[]
}

export function execute(input: string[]): number {
  const { seeds, preparedData } = prepareData(input)

  const result: number[] = []

  seeds.forEach((seed) => {
    const seedResult: number[] = [seed]
    preparedData.forEach((fromToMap, i) => {
      let target: number | null = null

      fromToMap.maps.forEach((numberMaps, j) => {
        if (target) return

        if (
          seedResult[i] >= numberMaps.sourceRangeStart &&
          numberMaps.sourceRangeStart + numberMaps.rangeLength >= seedResult[i]
        ) {
          target =
            numberMaps.destinationRangeStart +
            (seedResult[i] - numberMaps.sourceRangeStart)
        } else if (j === fromToMap.maps.length - 1) {
          target = seedResult[i]
        }
      })

      seedResult.push(target!)
    })

    result.push(seedResult.at(-1)!)
  })

  return result.sort((a, b) => a - b)[0]
}

function prepareData(input: string[]): {
  seeds: number[]
  preparedData: FromToMap[]
} {
  const preparedData: FromToMap[] = []
  let seeds: number[] = []
  let newMap = false
  input.forEach((line) => {
    if (line.length === 0) {
      newMap = true
      return
    }
    if (line.includes('seeds:')) {
      seeds = line
        .split(': ')[1]
        .split(' ')
        .map((x) => +x)
      newMap = false
      return
    }
    if (line.includes('map:')) {
      preparedData.push({
        from: line.split('-')[0] as Category,
        to: line.split('-')[2].split(' ')[0] as Category,
        maps: []
      })
      newMap = false
      return
    } else {
      preparedData.at(-1)?.maps.push({
        destinationRangeStart: +line.split(' ')[0],
        sourceRangeStart: +line.split(' ')[1],
        rangeLength: +line.split(' ')[2]
      })
      return
    }
  })

  return {
    seeds,
    preparedData
  }
}

function findMap(
  category: Category,
  preparedData: FromToMap[],
  direction: 'from' | 'to' = 'to'
): FromToMap {
  if (direction === 'from')
    return preparedData.find((x) => x.from === category)!
  return preparedData.find((x) => x.to === category)!
}
