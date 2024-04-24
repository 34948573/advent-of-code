type RangeMap = {
  destinationRangeStart: number
  sourceRangeStart: number
  rangeLength: number
}

type FromToMap = {
  maps: RangeMap[]
}

type Range = {
  from: number
  to: number
}

export function execute(input: string[]): number {
  const { seeds, preparedData } = prepareData(input)

  const sourceSeedRanges: Range[] = []
  const excludedRanges: Range[] = []

  for (let i = 0; i < seeds[i + 1]; i++) {
    const isEven = i % 2 === 0
    if (isEven) {
      sourceSeedRanges.push({ from: seeds[i], to: seeds[i] + seeds[i + 1] })
    }
  }

  console.log('source seed ranges: ', sourceSeedRanges)

  let result: number | null = null

  sourceSeedRanges.forEach((sourceSeedRange) => {
    loop1: for (let i = sourceSeedRange.from; i <= sourceSeedRange.to; i++) {
      for (let j = 0; j < excludedRanges.length; j++) {
        console.log('excluded ranges: ', excludedRanges)
        if (i >= excludedRanges[j].from && i <= excludedRanges[j].to) {
          continue loop1 // continue outer loop, seed is in excluded range from earlier run
        }
      }
      const seedResult: number[] = [i]

      preparedData.forEach((fromToMap, outerMapIndex) => {
        let target: number | null = null

        fromToMap.maps.forEach((numberMaps, innerMapIndex) => {
          if (target) return

          if (
            seedResult[outerMapIndex] >= numberMaps.sourceRangeStart &&
            numberMaps.sourceRangeStart + numberMaps.rangeLength >=
              seedResult[outerMapIndex]
          ) {
            target =
              numberMaps.destinationRangeStart +
              (seedResult[outerMapIndex] - numberMaps.sourceRangeStart)
          } else if (innerMapIndex === fromToMap.maps.length - 1) {
            target = seedResult[outerMapIndex]
          }
        })

        seedResult.push(target!)
      })
      if (!result || seedResult.at(-1)! < result) result = seedResult.at(-1)!

      // exclude this range from future runs
      if (i == sourceSeedRange.to) {
        excludedRanges.push({
          from: sourceSeedRange.from,
          to: sourceSeedRange.to
        })
      }
    }
  })

  return result!
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
