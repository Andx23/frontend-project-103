import lodash from 'lodash';

const { sortBy } = lodash;

const buildDiff = (data1, data2) => {
  const keys = sortBy([...new Set([...Object.keys(data1), ...Object.keys(data2)])]);

  return keys.map((key) => {
    const hasInFirst = Object.hasOwn(data1, key);
    const hasInSecond = Object.hasOwn(data2, key);

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

const stringifyValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }

  return String(value);
};

const formatDiff = (diff) => {
  const lines = diff.map((item) => {
    switch (item.status) {
      case 'unchanged':
        return `    ${item.key}: ${stringifyValue(item.value)}`;
      case 'removed':
        return `  - ${item.key}: ${stringifyValue(item.value)}`;
      case 'added':
        return `  + ${item.key}: ${stringifyValue(item.value)}`;
      case 'changed':
        return [
          `  - ${item.key}: ${stringifyValue(item.oldValue)}`,
          `  + ${item.key}: ${stringifyValue(item.newValue)}`,
        ].join('\n');
      default:
        return '';
    }
  });

  return `{\n${lines.join('\n')}\n}`;
};

const genDiff = (data1, data2) => {
  const diff = buildDiff(data1, data2);
  return formatDiff(diff);
};

export default genDiff;