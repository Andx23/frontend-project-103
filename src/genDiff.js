import lodash from 'lodash';
import parse from './parsers/parser.js';
import getFormatter from './formatters/index.js';

const { sortBy } = lodash;

const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);

const buildDiff = (data1, data2) => {
  const keys = sortBy([...new Set([...Object.keys(data1), ...Object.keys(data2)])]);

  return keys.map((key) => {
    const hasInFirst = Object.hasOwn(data1, key);
    const hasInSecond = Object.hasOwn(data2, key);

    if (hasInFirst && hasInSecond && isObject(data1[key]) && isObject(data2[key])) {
      return {
        key,
        status: 'nested',
        children: buildDiff(data1[key], data2[key]),
      };
    }

    if (hasInFirst && hasInSecond && data1[key] === data2[key]) {
      return {
        key,
        status: 'unchanged',
        value: data1[key],
      };
    }

    if (hasInFirst && hasInSecond) {
      return {
        key,
        status: 'changed',
        oldValue: data1[key],
        newValue: data2[key],
      };
    }

    if (hasInFirst) {
      return {
        key,
        status: 'removed',
        value: data1[key],
      };
    }

    return {
      key,
      status: 'added',
      value: data2[key],
    };
  });
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);
  const diff = buildDiff(data1, data2);
  const formatter = getFormatter(formatName);

  if (!formatter) {
    throw new Error(`Unknown format: ${formatName}`);
  }

  return formatter(diff);
};

export default genDiff;