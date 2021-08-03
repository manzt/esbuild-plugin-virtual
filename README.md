[npm]: https://img.shields.io/npm/v/esbuild-plugin-virtual
[npm-url]: https://www.npmjs.com/package/esbuild-plugin-virtual
[size]: https://packagephobia.now.sh/badge?p=esbuild-plugin-virtual
[size-url]: https://packagephobia.now.sh/result?p=esbuild-plugin-virtual

[![npm][npm]][npm-url]
[![size][size]][size-url]

# esbuild-plugin-virtual

💠 An esbuild plugin which loads virtual modules from memory.
Inspired from [`@rollup/plugin-virtual`](https://www.npmjs.com/package/@rollup/plugin-virtual).

## Install

Using npm:

```console
npm install esbuild-plugin-virtual --save-dev
```

## Usage


```js
// src/entry.ts
import batman from 'batman';
import { robin } from 'robin';
console.log(batman, robin);
```

### Node

```js
// build.js
import * as esbuild from 'esbuild';
import virtual from 'esbuild-plugin-virtual';

esbuild.build({
  entryPoints: ['src/entry.ts'],
  bundle: true,
  plugins: [
    virtual({
      batman: `export default 'na na na na na';`,
      robin: `export const robin = 'batmannnnn';`,
    }),
  ],
})
```

```bash
$ node build.js
# (() => {
#   // virtual:batman
#   var batman_default = "na na na na na";
#
#   // virtual:robin
#   var robin = "batmannnnn";
#
#   // entry.ts
#   console.log(batman_default, robin);
# })();
```

### Deno

```typescript
import * as esbuild from "https://deno.land/x/esbuild@v0.12.5/mod.js";
import virtual from "https://cdn.skypack.dev/esbuild-plugin-virtual";

await esbuild.build({
  entryPoints: ['entry.ts'],
  bundle: true,
  plugins: [
    virtual({
      batman: `export default 'na na na na na'`,
      robin: `export const robin = 'batmannnnn'`,
    }),
  ],
})

esbuild.stop()
```

```bash
$ deno run -A build.ts
# (() => {
#   // virtual:batman
#   var batman_default = "na na na na na";
#
#   // virtual:robin
#   var robin = "batmannnnn";
#
#   // entry.ts
#   console.log(batman_default, robin);
# })();
```

## License

[MIT](LICENSE)
