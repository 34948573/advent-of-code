import { challengeData } from "../../tests/day1/testData";

const results: number[] = []

function extractNumbers(input: string): void {
    const regex = /(one|two|three|four|five|six|seven|eight|nine|\d)/g
    const matches = [...input.matchAll(regex)]

    if (!matches[0]) {
        console.log(`Couldn't find numbers in input ${input}`)
        return
    }

    const matchedNumbers = convertToNumber(matches[0][0]) + convertToNumber(matches[matches.length - 1][0])
    const result = parseInt(matchedNumbers)

    if (result < 11 || result > 99) {
        console.log(`Invalid result ${result} from input ${input}`)
        return
    }

    results.push(result)
}

function convertToNumber(number: string): string {
    switch (number) {
        case 'one':
            return "1"
        case 'two':
            return "2"
        case 'three':
            return "3"
        case 'four':
            return "4"
        case 'five':
            return "5"
        case 'six':
            return "6"
        case 'seven':
            return "7"
        case 'eight':
            return "8"
        case 'nine':
            return "9"
        default:
            return number
    }
}

export function calculateSum(input: string[]): number {
    input.forEach(x => extractNumbers(x))
    
    const sum = results.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    }, 0);
    
    // solution step 1: 52974
    // solution step 2: 53644
    console.log(sum) 

    return sum
}
