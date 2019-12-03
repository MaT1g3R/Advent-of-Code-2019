const fs = require('fs');
const path = require('path');

// First, get the contents of the input file for today's puzzle
const inputFilePath = path.join(process.env.TQ_AOC_INPUT_FOLDER, 'day2.txt');
const inputFileContents = fs.readFileSync(inputFilePath, 'utf-8');

// Next, let's put every line in the input file into an array
const input = inputFileContents.split('\n');
// If the last line is blank, remove it
if (input[input.length - 1].trim() === '') {
  input.pop();
}

// Replace the code below with the code you'll need to solve the puzzle!
const parsedInput = input[0].split(",").map(i => parseInt(i,10));

function asm(memory, pc) {
  const newMemory = memory.slice();
  const op = newMemory[pc]
  if (op === 99) {
    return newMemory[0];
  }

  const aPointer = newMemory[pc + 1];
  const bPointer = newMemory[pc + 2];
  const outPointer = newMemory[pc + 3];
  if (op === 1) {
    newMemory[outPointer] = newMemory[aPointer] + newMemory[bPointer];
  }
  else if (op === 2) {
    newMemory[outPointer] = newMemory[aPointer] * newMemory[bPointer];
  }
  else {
    throw `Invalid op code: ${op}`
  }
  return asm(newMemory, pc + 4);
}

function findPair() {
  const target = 19690720;
  for (let noun = 0; noun < 100; ++noun) {
    for (let verb = 0; verb < 100; ++verb) {
      try {
        const newInput = parsedInput.slice();
        newInput[1] = noun;
        newInput[2] = verb;
        if (asm(newInput, 0) === target) {
         return 100 * noun + verb;
        }
      }
      catch (e) {}
    }
  }
}

console.log(findPair());
