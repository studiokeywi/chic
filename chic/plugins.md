<!-- links -->

[readme]: https://github.studiokeywi.dev/chic/blob/primary/chic/README.md

<!--  -->

<small>&lt; Back to [README]</small>

# Plugins

> **NOTE:** Very experimental. May disappear at any time

Plugins can be used to extend `Chic` functionality. Plugin objects are assigned in the `plugins` param for `buildChic`:

```javascript
import { buildChic } from '@studiokeywi/chic';
import somePlugin from './plugins/myPlugin.js';

const chic = buildChic({ plugins: [somePlugin] });
chic.plugins.doSomething();
```

They can also be added to an existing instance after the fact:

```javascript
import { chic } from './loggers.js';
import anotherPlugin from './plugins/anotherPlugin.js';

chic.plugins.install(anotherPlugin);
```

A plugin takes the following shape:

```typescript
/** A plugin to modify or add new Chic behaviors */
type ChicPlugin = {
  /** Identifier for plugin's exported function */
  id: string;
  /** The installer function for this plugin
   * @param chic The instance of Chic where this plugin is installed */
  install(chic: Chic): ChicPluginFunction;
  /** Optional cleanup function when uninstalled
   * @param chic The instance of Chic where this plugin was installed */
  uninstall?(chic: Chic): void;
};
```

The `id` value is what is assigned to `chic.plugins`. It is also what is used to uninstall a plugin (with `chic.uninstall(id)`). The `install` function is used to provide whatever setup may be needed for the plugin. It must return a function, which will be assigned to the `chic.plugins` object. The `uninstall` function is optional, but may be used to run additional cleanup as needed.

## Default Plugins

The default `Chic` object automatically builds with the following plugins: `drawImage`, `labelMaker`, `snoop`, and `timestamp`

### drawImage

Draws an image to the console. Works best with small pixel artwork no larger than 256 x 256 (or approximately 65,536 pixels). Internally uses an `HTMLCanvasElement` to obtain pixel color data

```typescript
chic.plugins.drawImage: (image: CanvasImageSource) => void
```

- `image`: The image to draw

### labelMaker

Creates a set of `Chic` loggers that automatically prepend a styled label before the provided message.

```typescript
chic.plugins.labelMaker: ({
  debug?: LabelConfig,
  error?: LabelConfig,
  group?: LabelConfig,
  groupCollapsed?: LabelConfig,
  info?: LabelConfig,
  log?: LabelConfig,
  warn?: LabelConfig }) => ChicLoggers
```

- `LabelConfig = { label: string, style: string }`
- Any property may be omitted and default styling will apply. All default styling shares the following CSS: `border:solid 0.125rem;border-radius:0.5rem;font-size:1rem;margin:0.25rem;padding:0.5rem`
- Default styling for `debug` appends `border-color:cyan;color:cyan`
- Default styling for `error` appends `border-color:red;color:red`
- Default styling for `group` appends `border-color:initial`
- Default styling for `groupCollapsed` appends `border-color:initial`
- Default styling for `info` appends `border-color:green;color:green`
- Default styling for `log` appends `border-color:green;color:green`
- Default styling for `warn` appends `border-color:yellow;color:yellow`

### snoop

Allows simple messages to be automatically logged when a given condition occurs

```typescript
chic.plugins.snoop: ({
  check: (...args: any[]) => boolean,
  labels?: string[],
  level?: keyof ChicLoggers,
  repeat?: boolean,
  styles?: string[]
}) => { start: () => void, stop: () => void }
```

- `check`: Function that returns (or resolves) to a value. When this returns (or resolves) to a truthy value, `Chic` automatically logs `labels` with `styles` and stops checking (unless `repeat` is set to true)
- `labels`: Text values to display when automatically logging, with `styles` applied (default `['Event Occured']`)
- `level`: `Chic` logger level to use (default `'log'`)
- `repeat`: Controls whether or not to stop checking once a message has been logged once (default `false`)
- `styles`: CSS strings to style the `labels` when automatically logging (default `['']`)

The returned `start` and `stop` functions can be used to further customize when you are snooping or not. See the examples project for more.

**NOTE:** The `snoop` plugin uses `requestAnimationFrame` internally to prevent execution while the window is not in focus. Do not rely on this for time-sensitive purposes unless you intend to monitor the window during the entire time of its use.

### timestamp

Creates a set of `Chic` loggers that automatically prepend a styleable timestamp before the provided message.

```typescript
chic.plugins.timestamp: ({ style?: string }) => ChicLoggers
```

- `style`: CSS style to apply to the timestamp (default `'font-style:italic;margin-right:0.5rem'`)
