import { Command } from 'commander';
import parse from './src/parser.js';
import genDiff from './src/genDiff.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>', 'first file')
  .argument('<filepath2>', 'second file')
  .action((filepath1, filepath2) => {
    const data1 = parse(filepath1);
    const data2 = parse(filepath2);
    const result = genDiff(data1, data2);

    console.log(result);
  });

program.parse();