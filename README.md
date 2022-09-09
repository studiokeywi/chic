<!-- links -->

[webpack]: https://webpackjs.org
[rollup]: https://rollupjs.org
[snowpack]: https://snowpack.dev/
[vite]: https://vitejs.dev
[esbuild]: https://esbuild.github.io/
[jsdelivr]: https://jsdelivr.net
[css builder syntax]: #css-builder-syntax
[fix]: #fixed-styles

<!--  -->

# chic

`chic` is a tiny assistant for helping make browser `console.log()` output prettier

## Getting Started

`chic` is meant to be used and viewed in the browser, and so it is assumed that you will either be importing directly from a CDN or using a bundler (such as [webpack]/[rollup]/[snowpack]/[vite]/[esbuild]/...). The easiest way to get started is via CDN. Since `chic` is publically available through GitHub and NPM, you can use one of the CDN URLs provided by [jsdelivr]:

`https://cdn.jsdelivr.net/npm/@studiokeywi/chic/index.js` (NPM mirror)  
`https://cdn.jsdelivr.net/gh/studiokeywi/chic/index.js` (GitHub mirror)

Example:

```html
<script type="module">
  import chic from 'https://cdn.jsdelivr.net/npm/@studiokeywi/chic/index.js';
  // code where you would use chic below...
</script>
```

If you are using a bundler, then you can download and install via npm:

`npm i @studiokeywi/chic` (if you want users to see pretty messages when using their browser console)  
`npm i -D @studiokeywi/chic` (if you want pretty messages for your development only)

And then import it at the top of your file(s):

```javascript
import chic from '@studiokeywi/chic';
// code where you would use chic below...
```

If you want a preview without requiring a project to embed or install `chic`, you can open up your browser's console and use the following snippet:

```javascript
window.chic = (await import('https://cdn.jsdelivr.net/gh/studiokeywi/chic/index.js')).default;
// code where you would use chic below...
```

## API

### CSS Tagged Template Literal Logging

**NOTE:** If you have `chic` embedded in a project, you can run any of these examples below to see what the styled output looks like.

`chic` wraps around the styleable logging methods provided by the `console` object, but with a tagged template. This syntax means that styled logging is performed in a slightly different fashion:

```javascript
chic.log`Hello World`;
```

Each section of text can receive it's own styling. Simply interpolate the style string directly afterwards the text with the [CSS Builder syntax]:

```javascript
chic.log`Hello World${chic.background.black.color.white()}`;
chic.log`Hello${chic.color.red()} World${chic.color.blue()}`;
```

Templates without interpolated style strings will be unstyled, as will any text that follows the final style string in a template:

```javascript
chic.log`Hello${chic['font-size']['1rem']()} World`;
```

#### What About Variable Interpolation?

Since `chic` assumes that values passed through interpolation are styles, you may be wondering how to apply styles to variables. The traditionally function call for tagged templates take in an array for the first param, and then all styles as the remaining params:

```javascript
const someUsername = 'Gary Garrison';
chic.log(['User: ', someUsername], chic['font-weight'].bolder.padding['1rem'](), chic.color.yellow());
```

### CSS Builder Syntax

Behind the scenes, `chic` uses a JavaScript Proxy object. This allows transformation of CSS-friendly strings when not using a logging function or the [fix] function. Since CSS styles often require characters that are invalid in JavaScript identifiers, there are two options available. The first is to use bracket notation for property access (as used in previous examples):

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

#### Fixed Styles

If there are certain base styles you want to apply to multiple areas, you could start by building up a partial string and then appending it with another built style string manually:

```javascript
const infoStyle = chic.background.$c0c0c0.color.white();
const infoBox = `${infoStyle};${chic.padding['1rem'].border['0.125rem solid blue']()}`;
chic.log`Something to know${infoBox}`;
```

Using `chic.fix()` allows you to fix the current level of styling by returning a new `chic` object so that you can more easily create style definitions with shared properties:

```javascript
const infoStyle = chic.background.$c0c0c0.color.white.fix();
const infoBox = infoStyle.padding['1rem'].border['0.125rem solid blue']();
chic.log`Something to know${infoBox}`;
```

Since `chic.fix()` returns a new `chic` object, you can also use the value as a logger itself (just don't forget to pass in the styles -- `chic` will persist your fixed styles when creating new styles, but not when logging):

```javascript
const infoStyle = chic.background.$c0c0c0.color.white.fix();
const infoBox = infoStyle.padding['1rem'].border['0.125rem solid blue'].fix();
infoBox.log`Something to know${infoBox()}`;
```
