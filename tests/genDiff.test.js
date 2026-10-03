import { describe, expect, test } from 'vitest';
import genDiff from '../src/genDiff.js';

describe('genDiff', () => {
  test('compares flat JSON objects', () => {
    const data1 = {
      host: 'codica.io',
      timeout: 50,
      proxy: '123.234.53.22',
      follow: false,
    };

    const data2 = {
      timeout: 20,
      verbose: true,
      host: 'codica.io',
    };

    const expected = `{
  - follow: false
    host: codica.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

    expect(genDiff(data1, data2)).toBe(expected);
  });

  test('returns unchanged keys without signs', () => {
    const data1 = {
      host: 'codica.io',
      timeout: 50,
    };

    const data2 = {
      host: 'codica.io',
      timeout: 50,
    };

    const expected = `{
    host: codica.io
    timeout: 50
}`;

    expect(genDiff(data1, data2)).toBe(expected);
  });

  test('detects added and removed keys', () => {
    const data1 = {
      host: 'codica.io',
      proxy: '123.234.53.22',
    };

    const data2 = {
      host: 'codica.io',
      verbose: true,
    };

    const expected = `{
    host: codica.io
  - proxy: 123.234.53.22
  + verbose: true
}`;

    expect(genDiff(data1, data2)).toBe(expected);
  });
});