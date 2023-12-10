class Cubes {
  r: number
  g: number
  b: number

  constructor(r: number, g: number, b: number) {
    this.r = r
    this.g = g
    this.b = b
  }
}

class Game {
  id: number
  revealedTimes: number
  cubes: Cubes[]

  constructor(id: number, revealedCount: number, cubes: Cubes[]) {
    this.id = id
    this.revealedTimes = revealedCount
    this.cubes = cubes
  }
}

export function calculateGameIdsSumAndPowers(input: string[]): {
  gameIdsSum: number
  minimumCubePowers: number
} {
  const totalCubes = new Cubes(12, 13, 14)
  const preparedData = input.map((game) => prepareData(game))

  //   console.dir(preparedData, { depth: null })

  let gameIdsSum = 0 // puzzle part 1
  let minimumCubePowers = 0 // puzzle part 2

  preparedData.forEach((game) => {
    if (isPossible(game.cubes, totalCubes)) gameIdsSum += game.id
    minimumCubePowers += calculateMinimumCubesPower(game.cubes)
  })

  return {
    gameIdsSum,
    minimumCubePowers
  }
}

function prepareData(game: string): Game {
  const gameId = parseInt(game.split(':')[0].split(' ')[1])
  const cubesPerGame = game
    .split(': ')[1]
    .split('; ')
    .map((cubes) => cubes.split(', '))
  const revealedTimes = cubesPerGame.length

  const cubes: Cubes[] = []

  cubesPerGame.forEach((revealedCubes) => {
    let red = 0
    let green = 0
    let blue = 0

    revealedCubes.forEach((colouredCubes) => {
      const numberOfCubes = parseInt(colouredCubes.split(' ')[0])
      const colour = colouredCubes.split(' ')[1]

      switch (colour) {
        case 'red':
          red = numberOfCubes
          break
        case 'green':
          green = numberOfCubes
          break
        case 'blue':
          blue = numberOfCubes
          break
        default:
          throw new Error(`no color found in colouredCubes: ${colouredCubes}`)
      }
    })

    cubes.push(new Cubes(red, green, blue))
  })

  return new Game(gameId, revealedTimes, cubes)
}

function isPossible(cubes: Cubes[], totalCubes: Cubes): boolean {
  let result = true

  cubes.forEach((revealedCubes) => {
    if (
      revealedCubes.r > totalCubes.r ||
      revealedCubes.g > totalCubes.g ||
      revealedCubes.b > totalCubes.b
    ) {
      //   console.log(
      //     `game with cubes ${JSON.stringify(revealedCubes)} is not possible`
      //   )
      result = false
    }
  })

  return result
}

function calculateMinimumCubesPower(cubes: Cubes[]): number {
  let red = 0
  let green = 0
  let blue = 0

  cubes.forEach((revealedCubes) => {
    if (revealedCubes.r > red) red = revealedCubes.r
    if (revealedCubes.g > green) green = revealedCubes.g
    if (revealedCubes.b > blue) blue = revealedCubes.b
  })

  return red * green * blue
}
