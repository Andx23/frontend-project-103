import { describe, expect, test } from 'vitest';
import genDiff from '../src/genDiff.js';

describe('genDiff', () => {
  test('compares flat JSON objects', () => {
    const expected = `{
  - follow: false
    host: codica.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

    expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toBe(expected);
  });

  test('returns unchanged keys without signs', () => {
    const expected = `{
    host: codica.io
    timeout: 50
}`;

    expect(genDiff('__fixtures__/same1.json', '__fixtures__/same2.json')).toBe(expected);
  });

  test('detects added and removed keys', () => {
    const expected = `{
    host: codica.io
  - proxy: 123.234.53.22
  + verbose: true
}`;

    expect(genDiff('__fixtures__/different1.json', '__fixtures__/different2.json')).toBe(expected);
  });

  test('compares flat YAML files', () => {
    const expected = `{
  - follow: false
    host: codica.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

    expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml')).toBe(expected);
  });
});
