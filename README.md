# example-ts-visitor

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run ./src/index.ts ./test/simple-interface.ts
```

## Example Schema
I'm very open to the shape of this looking different.
This just seemed to contain enough information.

```typescript
{
  types: [
    {
      name: 'ButtonSize',
      types: [
        { name: 'small', value: 'small', type: String },
        { name: 'medium', value: 'medium', type: String },
        { name: 'large', value: 'large', type: String },
        { reference: 'ButtonSizeNumber', name: 'ButtonSizeNumber' }
      ]
    },
    {
      name: 'ButtonSizeNumber',
      types: [
        { name: '1', value: 1, type: Number },
        { name: '2', value: 2, type: Number },
        { name: '3', value: 3, type: Number },
      ]
    },
  ],
  functions: [
    {
      name: 'bar',
      returnTypes: [
        { name: 'HTMLButtonElement', type: 'HTMLButtonElement' },
        { name: 'void', value: 'void', type: undefined }
      ],
      params: [
        {
          name: 'props1',
          type: 'ButtonProps',
          isOptional: true,
          defaults: { size: 'small', color: 'primary', label: 'foo', onClick: () => {} }
        },
      ]
    }
  ]
 }
```
