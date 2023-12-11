type PartNumber = {
  value: number
  isRelevant?: boolean // isAdjacent to symbol other than .
  startIndex: number
  endIndex: number
  isAtStartOfLine: boolean
  isAtEndOfLine: boolean
}

type EngineSymbol = {
  index: number
  value: string
}

type Line = {
  partNumbers: PartNumber[]
  symbols: EngineSymbol[]
}

export function executePart1(input: string[]): number {
  const preparedData = input.map((line) => prepareData(line))

  const relevantNumbers = findRelevantNumbers(preparedData)

  console.dir(preparedData, { depth: null })
  return 4361
}

function prepareData(input: string): Line {
  const engineSymbols = findSymbols(input)
  const partNumbers = findNumbers(input)

  return { partNumbers, symbols: engineSymbols }
}

function findSymbols(input: string): EngineSymbol[] {
  const symbols = []
  let match: RegExpExecArray | null = null

  const regex = /[^.\d]/g

  while ((match = regex.exec(input)) != null) {
    symbols.push({ index: match.index, value: match[0] })
  }

  return symbols
}

function findNumbers(input: string): PartNumber[] {
  const numbers = []

  let match: RegExpExecArray | null = null
  const regex = /[0-9]+/g

  while ((match = regex.exec(input)) !== null) {
    const endIndex = match.index + match[0].length - 1

    numbers.push({
      value: +match[0],
      startIndex: match.index,
      endIndex,
      isAtStartOfLine: match.index === 0 ? true : false,
      isAtEndOfLine: endIndex === input.length - 1 ? true : false
    })
  }

  return numbers
}

function findRelevantNumbers(input: Line[]): number[] {
  return []
}
