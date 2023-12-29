enum Categories {
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
  from: Categories
  to: Categories
  maps: RangeMap[]
}

export function execute(input: string[]): number {
  const { seeds, preparedData } = prepareData(input)

  console.log(seeds)
  console.dir(preparedData, { depth: null, colors: true })
  return 35
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
        from: line.split('-')[0] as Categories,
        to: line.split('-')[2].split(' ')[0] as Categories,
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
