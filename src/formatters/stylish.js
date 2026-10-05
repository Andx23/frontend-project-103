const stringifyValue = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }

  const indent = ' '.repeat(depth * 4);

  const lines = Object.entries(value).map(([key, val]) => {
    if (typeof val === 'object' && val !== null) {
      return `${indent}${key}: ${stringifyValue(val, depth + 1)}`;
    }

    return `${indent}${key}: ${val}`;
  });

  const closingIndent = ' '.repeat((depth - 1) * 4);

  return `{\n${lines.join('\n')}\n${closingIndent}}`;
};

const stylish = (diff, depth = 1) => {
  const indent = ' '.repeat(depth * 4 - 2);

  const lines = diff.map((item) => {
    switch (item.status) {
      case 'unchanged':
        return `${indent}  ${item.key}: ${stringifyValue(item.value, depth + 1)}`;

      case 'removed':
        return `${indent}- ${item.key}: ${stringifyValue(item.value, depth + 1)}`;

      case 'added':
        return `${indent}+ ${item.key}: ${stringifyValue(item.value, depth + 1)}`;

      case 'changed':
        return [
          `${indent}- ${item.key}: ${stringifyValue(item.oldValue, depth + 1)}`,
          `${indent}+ ${item.key}: ${stringifyValue(item.newValue, depth + 1)}`,
        ].join('\n');

      case 'nested':
        return [
          `${indent}  ${item.key}: {`,
          stylish(item.children, depth + 1),
          `${indent}  }`,
        ].join('\n');

      default:
        return '';
    }
  });

  return lines.join('\n');
};

export default stylish;