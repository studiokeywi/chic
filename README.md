<!-- links -->

[webpack]: https://webpackjs.org
[rollup]: https://rollupjs.org
[snowpack]: https://snowpack.dev/
[vite]: https://vitejs.dev

<!--  -->

# chic

chic is a tiny assistant for helping make browser `console.log()` output prettier

## Getting Started

chic is meant to be used and viewed in the browser, and so it is assumed that you will either be importing directly from a CDN or using a bundler (such as [webpack]/[rollup]/[snowpack]/[vite]/...). We suggest a script tag with imports pointing to the CDN urls provided by jsdelivr:

```html
<!-- only use ONE of these import statements in your code! -->
<script type="module">
  import chic from 'https://cdn.jsdelivr.net/npm/@studiokeywi/chic/index.js'; // NPM mirror
  import chic from 'https://cdn.jsdelivr.net/gh/studiokeywi/chic/index.js'; // GitHub mirror
</script>
```

If you are using a bundler, then you can download and install via npm, and then import it at the top of your file(s):

`npm i -D @studiokeywi/chic`

```js
import chic from '@studiokeywi/chic';
```

## API

### Chainable CSS syntax

Behind the scenes, chic uses a JavaScript Proxy object to transform property values into CSS-friendly strings. Since CSS styles often require characters that are invalid in JavaScript identifiers, there are two options available. The first is to use bracket notation for property access:

```js
chic.background['#c0c0c0']['border-radius']['0.5rem']();
// returns 'background:#c0c0c0;border-radius:0.5rem'
```

The second is to use special replacement characters as described in this chart:

| Special Character       | Replacement              |
| ----------------------- | ------------------------ |
| $                       | #                        |
| \_ (at start of string) | (empty string)           |
| \_ (in between digits)  | .                        |
| sampleText (camel case) | sample-text (kebab case) |
| \_ (other positioning)  | ' ' (single space)       |

```js
chic.background.$c0c0c0.borderRadius._0_5rem.border._0_125rem_solid_blue();
// returns 'background:#c0c0c0;border-radius:0.5rem;border:0.125rem solid blue'
```

### CSS Tagged Template Literal Logging

chic wraps around the styleable logging methods provided by the `console` object, but with a tagged template. This syntax means that styled logging is performed in a slightly different fashion:

```js
chic.log`Hello World${chic.background.black.color.white()}`;
```

Each section of text can receive it's own styling by providing the style string directly afterwards in the template:

```js
chic.log`Hello${chic.color.red()} World${chic.color.blue()}`;
```

Templates without interpolated style strings will be unstyled, as will any text that follows the final style string in a template:

```js
chic.log`Hello World`;
chic.log`Hello${chic.fontSize._1rem()} World`;
```
