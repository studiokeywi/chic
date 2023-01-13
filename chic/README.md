<!-- links -->

[webpack]: https://webpackjs.org
[rollup]: https://rollupjs.org
[snowpack]: https://snowpack.dev/
[vite]: https://vitejs.dev
[esbuild]: https://esbuild.github.io/
[jsdelivr]: https://jsdelivr.net
[css builder syntax]: #css-builder-syntax
[fix]: #fixed-styles
[the plugins page]: https://github.studiokeywi.dev/chic/blob/primary/chic/plugins.md

<!--  -->

# chic

`Chic` is a tiny assistant for helping make browser `console.log()` output prettier

## Getting Started

`Chic` is meant to be used and viewed in the browser, and so it is assumed that you will either be importing directly from a CDN or using a bundler (such as [webpack]/[rollup]/[snowpack]/[vite]/[esbuild]/...). The easiest way to get started is via CDN. Since `Chic` is publically available through GitHub and NPM, you can use one of the CDN URLs provided by [jsdelivr]:

`https://cdn.jsdelivr.net/npm/@studiokeywi/chic/index.js` (NPM mirror)  
`https://cdn.jsdelivr.net/gh/studiokeywi/chic/chic/index.js` (GitHub mirror)

Example:

```html
<script type="module">
  import chic from 'https://cdn.jsdelivr.net/npm/@studiokeywi/chic/index.js';
  // code where you would use chic below...
</script>
```

If you are using a modern front end framework or bundler for front end, then you can download and install via npm:

`npm i @studiokeywi/chic` (or use `npm i -D @studiokeywi/chic` if your bundler/compiler will manage development dependencies)

And then import it at the top of your file(s):

```javascript
import chic from '@studiokeywi/chic';
// code where you would use chic below...
```

If you want a preview without requiring a project to embed or install `Chic`, you can open up your browser's console and use the following snippet:

```javascript
window.chic = (await import('https://cdn.jsdelivr.net/gh/studiokeywi/chic/chic/index.js')).default;
// code where you would use chic below...
```

## API

### CSS Tagged Template Literal Logging

> **NOTE:** If you have `Chic` embedded in a project or loaded into the browser as described above, you can run any of these examples below to see what the styled output looks like.

`Chic` wraps around the styleable logging methods provided by the browser's `console` object, but with a tagged template. This syntax means that styled logging is performed in a slightly different fashion:

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

> **NOTE:** Firefox may offer different styling options than Chrome. I do not have access to Safari and cannot speak to the styling options there.

Behind the scenes, `Chic` uses a JavaScript Proxy object. This allows transformation of CSS-friendly strings when not using a logging function or the [fix] function. Since CSS styles often require characters that are invalid in JavaScript identifiers, there are two options available. The first is to use bracket notation for property access (as used in previous examples):

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
const infoBox = `${infoStyle};${chic.padding['1rem'].border['0.125rem solid blue']()}`;
chic.log`Something to know${infoBox}`;
```

Using `chic.fix()` allows you to fix the current level of styling by returning a new `Chic` object so that you can more easily create style definitions with shared properties:

```javascript
const infoStyle = chic.background.$c0c0c0.color.white.fix();
const infoBox = infoStyle.padding['1rem'].border['0.125rem solid blue']();
chic.log`Something to know${infoBox}`;
```

Since `chic.fix()` returns a new `Chic` object, you can also use the return value as a logger itself; just don't forget to pass in the styles -- `Chic` will persist your fixed styles when creating new styles, but not when logging:

```javascript
const infoStyle = chic.background.$c0c0c0.color.white.fix();
const infoBox = infoStyle.padding['1rem'].border['0.125rem solid blue'].fix();
infoBox.log`Something to know${infoBox()}`;
```

## Advanced

### Build

Beyond the default `Chic` object, you can also import the `Chic` builder function to have a more customized logger:

```javascript
import { buildChic } from '@studiokeywi/chic';

const chic = buildChic();
```

`buildChic` takes an optional configuration object, with two optional properties: `fixed` and `plugins`. `fixed` is an array of strings representing a fixed portion of styling; internally, this is how the `.fix()` function continues styles to the new instance. `plugins` is an array of plugin objects (as defined in the section below).

#### Why would I want this?

The default `Chic` object installs certain plugins automatically. For smaller bundling, you may wish to omit these by building a custom instance.

### Plugins

See [the plugins page] for more information
