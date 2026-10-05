const stringifyValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return String(value);
};

const plain = (diff, path = []) => {
  const lines = diff.flatMap((item) => {
    const currentPath = [...path, item.key].join('.');

    switch (item.status) {
      case 'nested':
        return plain(item.children, [...path, item.key]);

      case 'added':
        return `Property '${currentPath}' was added with value: ${stringifyValue(item.value)}`;

      case 'removed':
        return `Property '${currentPath}' was removed`;

      case 'changed':
        return `Property '${currentPath}' was updated. From ${stringifyValue(item.oldValue)} to ${stringifyValue(item.newValue)}`;

      case 'unchanged':
        return [];

      default:
        return [];
    }
  });

  return lines.join('\n');
};

export default plain;