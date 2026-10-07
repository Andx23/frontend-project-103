import fs from 'fs';
import path from 'path';
import { load } from 'js-yaml';

const parse = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(absolutePath, 'utf-8');
  const extension = path.extname(filepath);

  if (extension === '.json') {
    return JSON.parse(data);
  }

  if (extension === '.yml' || extension === '.yaml') {
    return load(data);
  }

  throw new Error(`Unsupported file format: ${extension}`);
};

export default parse;
