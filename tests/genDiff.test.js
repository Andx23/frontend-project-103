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

  test('compares nested JSON files', () => {
    const expected = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

    expect(genDiff('__fixtures__/nested1.json', '__fixtures__/nested2.json')).toBe(expected);
  });

  test('compares nested YAML files', () => {
    const expected = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

    expect(genDiff('__fixtures__/nested1.yml', '__fixtures__/nested2.yml')).toBe(expected);
  });

  test('generates plain format', () => {
    const expected = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

    expect(
      genDiff('__fixtures__/nested1.json', '__fixtures__/nested2.json', 'plain'),
    ).toBe(expected);
  });

  test('generates JSON format', () => {
    const expected = `[
  {
    "key": "common",
    "status": "nested",
    "children": [
      {
        "key": "follow",
        "status": "added",
        "value": false
      },
      {
        "key": "setting1",
        "status": "unchanged",
        "value": "Value 1"
      },
      {
        "key": "setting2",
        "status": "removed",
        "value": 200
      },
      {
        "key": "setting3",
        "status": "changed",
        "oldValue": true,
        "newValue": null
      },
      {
        "key": "setting4",
        "status": "added",
        "value": "blah blah"
      },
      {
        "key": "setting5",
        "status": "added",
        "value": {
          "key5": "value5"
        }
      },
      {
        "key": "setting6",
        "status": "nested",
        "children": [
          {
            "key": "doge",
            "status": "nested",
            "children": [
              {
                "key": "wow",
                "status": "changed",
                "oldValue": "",
                "newValue": "so much"
              }
            ]
          },
          {
            "key": "key",
            "status": "unchanged",
            "value": "value"
          },
          {
            "key": "ops",
            "status": "added",
            "value": "vops"
          }
        ]
      }
    ]
  },
  {
    "key": "group1",
    "status": "nested",
    "children": [
      {
        "key": "baz",
        "status": "changed",
        "oldValue": "bas",
        "newValue": "bars"
      },
      {
        "key": "foo",
        "status": "unchanged",
        "value": "bar"
      },
      {
        "key": "nest",
        "status": "changed",
        "oldValue": {
          "key": "value"
        },
        "newValue": "str"
      }
    ]
  },
  {
    "key": "group2",
    "status": "removed",
    "value": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  },
  {
    "key": "group3",
    "status": "added",
    "value": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    }
  }
]`;

    expect(
      genDiff('__fixtures__/nested1.json', '__fixtures__/nested2.json', 'json'),
    ).toBe(expected);
  });
});


