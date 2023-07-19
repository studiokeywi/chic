<!-- links -->

[webpack]: https://webpackjs.org
[rollup]: https://rollupjs.org
[snowpack]: https://snowpack.dev/
[vite]: https://vitejs.dev
[esbuild]: https://esbuild.github.io/
[jsdelivr]: https://jsdelivr.net
[styling console output]: https://developer.mozilla.org/en-US/docs/Web/API/console#styling_console_output
[`chalk`]: https://npmjs.org/package/chalk
[css builder syntax]: #css-builder-syntax
[fix]: #fixed-styles
[inject]: #injecting-styles
[the plugins page]: https://github.studiokeywi.dev/chic/blob/primary/chic/plugins.md

<!--  -->

# chic

`Chic` is a tiny assistant for helping make browser `console.log()` output prettier.

The information on MDN about [styling console output] applies to browser-based uses. Attempting to use `Chic` in NodeJS will result in the styling being entirely stripped, due to the lack of CSS support. `Chic` is expected (but not guaranteed) to still output text to the console for NodeJS, but there are no attempts to convert potentially available CSS styles into console-compatible command sequences. If you need something to bring styling to your NodeJS console messages, consider [`chalk`].

[![version](https://badgen.net/npm/v/@studiokeywi/chic)](https://badgen.net/npm/v/@studiokeywi/chic)
[![license](https://badgen.net/npm/license/@studiokeywi/chic)](https://badgen.net/npm/license/@studiokeywi/chic)
[![types](https://badgen.net/npm/types/@studiokeywi/chic)](https://badgen.net/npm/types/@studiokeywi/chic)
[![publish size](https://badgen.net/packagephobia/publish/@studiokeywi/chic)](https://badgen.net/packagephobia/publish/@studiokeywi/chic)
[![install size](https://badgen.net/packagephobia/install/@studiokeywi/chic)](https://badgen.net/packagephobia/install/@studiokeywi/chic)
[![minzipped size](https://badgen.net/bundlephobia/minzip/@studiokeywi/chic)](https://badgen.net/bundlephobia/minzip/@studiokeywi/chic)
[![Libraries.io dependency status for latest release, scoped npm package](https://img.shields.io/librariesio/release/npm/@studiokeywi/chic?style=for-the-badge)](https://img.shields.io/librariesio/release/npm/@studiokeywi/chic?style=for-the-badge)

## Getting Started

`Chic` is meant to be used and viewed in the browser, and so it is assumed that you will either be importing directly from a CDN or using a bundler (such as [webpack]/[rollup]/[snowpack]/[vite]/[esbuild]/...). The easiest way to get started is via CDN. Since `Chic` is publically available through NPM, you can use one of the CDN URLs provided by [jsdelivr]:

`https://cdn.jsdelivr.net/npm/@studiokeywi/chic/dist/index.min.js`

Example:

```html
<script type="module">
  import { chic } from 'https://cdn.jsdelivr.net/npm/@studiokeywi/chic/dist/index.min.js';

  chic.log`Hello, World!${chic.fontSize._2rem()}`;
</script>
```

If you are using a modern front end framework or bundler for front end, then you can download and install via npm:

`npm i @studiokeywi/chic` (or use `npm i -D @studiokeywi/chic` if your bundler/compiler will manage development dependencies).

And then import it at the top of your file(s):

```javascript
import { chic } from '@studiokeywi/chic';

chic.log`Hello, World!${chic.fontSize._2rem()}`;
```

If you want a preview without requiring a project to embed or install `Chic`, you can open up your browser's console and use the following snippet:

```javascript
window.chic = (await import('https://cdn.jsdelivr.net/npm/@studiokeywi/chic/dist/index.min.js')).chic;

chic.log`Hello, World!${chic.fontSize._2rem()}`;
```

## API

### CSS Tagged Template Literal Logging

> **NOTE:** If you have `Chic` embedded in a project or loaded into the browser as described above, you can run any of these examples below to see what the styled output looks like.

`Chic` wraps around the styleable logging methods provided by the browser's `console` object, but with a tagged template. This syntax means that styled logging is performed in a slightly different fashion than traditional methods:

```javascript
chic.log`Hello World`;
```

Each section of text can receive it's own styling. Simply interpolate the style string directly afterwards the text with the [CSS Builder syntax]:

```javascript
chic.log`Hello World${chic.background.darkslategray.color.lightgray()}`;
chic.log`Hello${chic.color.red()} World${chic.color.blue()}`;
```

Templates without interpolated style strings will be unstyled, as will any text that follows the final style string in a template:

```javascript
chic.log`Hello${chic['font-size']['1rem']()} World`;
```

#### What About Styled Variable Interpolation?

Since `Chic` assumes that values passed through interpolation are styles, you may be wondering how to apply styles to variables. The traditional function call for tagged templates take in an array-like for the first param, and then all styles as the remaining params:

```javascript
const someUsername = 'Gary Garrison';
chic.log(['User: ', someUsername], chic['font-weight'].bolder.padding['1rem'](), chic.color.yellow());
```

<h3 id="css-builder-syntax">CSS Builder Syntax</h3>

> **NOTE:** Different browsers may offer different styling options. See the list on MDN about [styling console output] for a list of potentially available CSS properties for your browser

Behind the scenes, `Chic` uses a JavaScript Proxy object. This allows the use of object property access notations to be converted into CSS-friendly strings, while allowing access to dedicated `Chic` properties (eg logging functions, the [inject] and [fix] functions, or use of the `plugin` object).

As seen above, the simplest way to use this syntax is with simple text values. You can build up a new style string by alternating between CSS properties and values via property access on the `Chic` object, then executing a function. For instance, to build the style string `color: green;`, you can use `chic.color.green()`.

Since CSS styles often require characters that are invalid in JavaScript identifiers, there are two options available. The first is to use bracket notation for property access (as used in previous examples):

```javascript
chic.background['#c0c0c0']['border-radius']['0.5rem'].border['0.125rem solid blue']();
// returns 'background:#c0c0c0;border-radius:0.5rem;border:0.125rem solid blue'
```

The second is to use special formatting as described in this chart:

| Special Formatting                | Replacement                   |
| --------------------------------- | ----------------------------- |
| Camel case text (eg `sampleText`) | Kebab case (eg `sample-text`) |
| `$`                               | `#`                           |
| `_` (at start of string)          | (empty string)                |
| `_` (in between digits)           | `.`                           |
| `_` (other positions)             | (single space)                |

```javascript
chic.background.$c0c0c0.borderRadius._0_5rem.border._0_125rem_solid_blue();
// returns 'background:#c0c0c0;border-radius:0.5rem;border:0.125rem solid blue'
```

> **NOTES:**
>
> - As seen in the bracket syntax example, you can mix and match approaches based on your preference or needs. `chic['color'].green()` is the same as `chic.color.$008000()` for the final display purposes.
> - When using `$` substitution, use lowercase characters in your hex to prevent the styling from being treated as camelCase for kebab-case conversion:
>   ```javascript
>   // Don't Use
>   chic.color.$C0C0C0(); // returns "color:#-c0-c0-c0"
>   // Use Instead
>   chic.color.$c0c0c0(); // returns "color:#c0c0c0"
>   ```
> - Certain CSS properties can include commas and/or quotation marks, which do not have a variable substitution. However, bracket notation can allow these to be used:
>   ```javascript
>   chic.fontFamily['"Fira Code", monospace']();
>   // returns 'font-family:"Fira Code", monospace'
>   ```
> - Due to the use of underscores in numbers, you cannot perform shorthand numeric definitions for properties (eg `margin: 0 0.25rem 0 0`) with this special syntax. As with quotation marks, bracket notation can allow these to be used:
>   ```javascript
>   // Don't Use
>   chic.margin._0_0_25rem_0_0(); // returns 'margin:0.0 25rem 0.0'
>   // Use Instead
>   chic.margin['0 0.25rem 0 0'](); // returns 'margin:0 0.25rem 0 0'
>   ```
>   - Using shorthand notation with units should work as expected:
>     ```javascript
>     chic.margin._0rem_0_25rem_0rem_0rem(); // returns 'margin:0rem 0.25rem 0rem 0rem;'
>     ```

<h4 id="fixed-styles">Fixed Styles</h4>

If there are certain base styles you want to apply to multiple areas, you could start by building up a partial string and then append it to another style string manually:

```javascript
const infoStyle = chic.background.$c0c0c0.color.white();
const boxStyle = chic.padding['1rem'].border['0.125rem solid blue']();
const infoBox = `${infoStyle};${boxStyle}`;
chic.log`Something to know${infoBox}`;
```

Using `chic.fix()` allows you to fix the current level of styling by returning a new `Chic` object so that you can more easily create style definitions with shared properties:

```javascript
const infoStyle = chic.background.$c0c0c0.color.white.fix();
const infoBox = infoStyle.padding['1rem'].border['0.125rem solid blue']();
chic.log`Something to know${infoBox}`;
```

<h4 id="injecting-styles">Injecting Styles</h4>

Sometimes, you may find yourself with several `Chic` styles that you may want to compose together. With the `chic.inject()` function, you can create new instances of `Chic` that merge together styles:

```javascript
const borderBox = chic.border['0.125rem solid blue']();
const largeFont = chic.fontSize['2rem']();
const smallFont = chic.fontSize['1rem']();
const titleBox = chic.inject(borderBox).inject(largeFont)();
const textBox = chic.inject(borderBox, smallFont)();
chic.log`My Title${titleBox}
My Text${textBox}`;
```

#### Note About Fixing/Injecting Styles

Since `chic.fix()` and `chic.inject()` return a new `Chic` object, you can also use the return value as a logger itself; just don't forget to pass in the styles -- `Chic` will persist your fixed styles when creating new style strings, but does not know when to use them for logging:

```javascript
const infoStyle = chic.background.$c0c0c0.color.white.fix();
const infoBox = infoStyle.padding['1rem'].border['0.125rem solid blue'].fix();
infoBox.log`Something to know${infoBox()}`;

const borderBox = chic.border['0.125rem solid blue']();
const largeFont = chic.fontSize['2rem']();
const boxLog = chic.inject(borderBox, largeFont);
boxLog.log`Another Title${boxLog()}`;
```

## Advanced

### Build

Beyond the default `Chic` object, you can also import the `Chic` builder function to have a more customized logger:

```typescript
import { buildChic } from '@studiokeywi/chic';

const chic = buildChic();

/** Configuration for building Chic instances */
type ChicConfig = {
  /** Fixed styles to always apply when building style strings */
  fixed?: string[][];
  /** Plugins to extend Chic functionality */
  plugins?: ChicPlugin[];
};
```

`buildChic` takes an optional configuration object, with two optional properties: `fixed` and `plugins`. `fixed` is an array of strings representing a fixed portion of styling; internally, this is how the `.fix()` function continues styles to the new instance. `plugins` is an array of plugin objects (as defined in the section below).

> **NOTE:** It's generally not recommended to pass `fixed` values to the `buildChic` config object as compared to using the `.fix()` function. If you want to manually pass values to `fixed` while using `buildChic` anyway, make sure that each entry in the array matches the pattern `[cssProperty, cssValue]`

#### Why would I want this?

The default `Chic` object installs certain plugins automatically. For smaller bundling, you may wish to omit these by building a custom instance.

### Plugins

> **NOTE:** Experimental. May disappear at any time

Plugins can be used to extend `Chic` functionality. Plugin objects can be assigned in the `plugins` param for `buildChic`:

```javascript
// loggers.js
import { buildChic } from '@studiokeywi/chic';
import somePlugin from './plugins/myPlugin.js';

export const chic = buildChic({ plugins: [somePlugin] });
```

They can also be added to an existing instance after the fact:

```javascript
import { chic } from './loggers.js';
import anotherPlugin from './plugins/anotherPlugin.js';

chic.plugins.install(anotherPlugin);
chic.plugins.doSomeThing(); // installed from `somePlugin`
chic.plugins.doAnotherThing(); // installed from `anotherPlugin`
```

See [the plugins page] for more information.
