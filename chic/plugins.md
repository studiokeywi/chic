<!-- links -->

[readme]: https://github.studiokeywi.dev/chic/blob/primary/chic/README.md
[top level readme]: https://github.studiokeywi.dev/chic/blob/primary/README.md

<!--  -->

<small>&lt; Back to [README]</small>

# Plugins

## Interfaces and Types

### Plugin

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

The `id` value is used as the identifier for the `ChicPluginFunction` and will be assigned to the `chic.plugins` object. It is also used to uninstall a plugin with `chic.uninstall(id)`.

The `install` function is used to provide whatever setup may be needed for the plugin. It must return a function, which will be assigned to the `chic.plugins` object.

The `uninstall` function is optional, but may be used to run additional cleanup as needed.

### Plugin Function

```typescript
/** Extra functionality provided by a Chic plugin */
interface ChicPluginFunction {
  <PluginFunction extends (...args: any[]) => any>(...args: Parameters<PluginFunction>): ReturnType<PluginFunction>;
  /** Optional cleanup function when uninstalled
   * @param chic The instance of Chic where this plugin was installed */
  uninstall?(chic: Chic): void;
}
```

The return of a plugin's `install` function may contain a property called `uninstall`. This can be used if you need to use closures or similar methods of data separation that would prevent you from using an `uninstall` function on the plugin object.

> **NOTE:** Do not combine usage of the `uninstall` property on the returned `ChicPluginFunction` and the `uninstall` property on the `ChicPlugin` at the same time. The function on the `ChicPlugin` will override the `uninstall` function on `ChicPluginFunction`, potentially causing unintended behavior

## Default Plugins

The default `Chic` object automatically builds with the following plugins: `drawImage`, `labelMaker`, `snoop`, and `timestamp`.

### drawImage

Draws an image to the console. Works best with small pixel artwork no larger than 256 x 256 (or approximately 65,536 pixels). Internally uses an `HTMLCanvasElement` to obtain pixel color data.

```typescript
interface DrawImage {
  (image: CanvasImageSource): void;
}
```

### labelMaker

Creates a set of `Chic` loggers that automatically prepend a styled label before the provided message.

```typescript
const base = chic.border.solid_0_125rem.borderRadius._0_5rem.fontSize._1rem.margin._0_25rem.padding._0_5rem.fix();
type LabelConfig = {
  label: string;
  style: string;
};
type LabelMakerConfig = {
  debug?: LabelConfig = { label: 'DEBUG', style: base.borderColor.cyan.color.cyan() };
  error?: LabelConfig = { label: 'ERROR', style: base.borderColor.red.color.red() };
  group?: LabelConfig = { label: 'GROUP', style: base.borderColor.initial() };
  groupCollapsed?: LabelConfig = { label: 'GROUP', style: base.borderColor.initial() };
  info?: LabelConfig = { label: 'INFO', style: base.borderColor.green.color.green() };
  log?: LabelConfig = { label: 'LOG', style: base.borderColor.green.color.green() };
  warn?: LabelConfig = { label: 'WARN', style: base.borderColor.yellow.color.yellow() };
};
interface LabelMaker {
  (config: LabelMakerConfig): ChicLoggers;
}
```

### snoop

Allows simple messages to be automatically logged when a given condition occurs. The returned `start` and `stop` functions can be used to further control when you are snooping or not.

**NOTE:** The `snoop` plugin uses `requestAnimationFrame` internally to prevent execution while the window is not in focus. Do not rely on this for time-sensitive purposes unless you intend to monitor the window during the entire time of its use.

```typescript
type SnoopConfig = {
  check: (...args: any[]) => boolean | Promise<boolean>;
  labels?: string[] = ['Event Occurred'];
  level?: keyof ChicLoggers = 'log';
  repeat?: boolean = false;
  styles?: string[] = [''];
};
interface Snoop {
  (config: SnoopConfig): { start: () => void; stop: () => void };
}
```

### timestamp

Creates a set of `Chic` loggers that automatically prepend a styleable timestamp before the provided message.

```typescript
export type TimestampConfig = {
  format?: (date: Date) => string = (date: Date) => `[${date.toLocaleString()}]`;
  style?: string = chic.fontStyle.italic.marginRight._0_5rem();
};
export interface Timestamp {
  (config: TimestampConfig): ChicLoggers;
}
```

## Examples

All of the default plugins are available in the example library. See the [top level README] for more

## Development

Creating a plugin is as simple as following the type descriptions above, but there are additional features available to provide better IntelliSense during development.

When writing your plugin, the following types are commonly used and can be imported from `@studiokeywi/chic` directly:

- `Chic`
- `ChicLogger`
- `ChicLoggers`
- `ChicPlugin`

Additionally, you can augment the definition of the `ChicPlugins` interface so that your plugins will show up on an instance of `Chic` in your editor (eg `chic.plugins.yourPlugin`). Using TypeScript, simply include a `declare` block in your plugin file/type file that references the `ChicPlugins` interface, like this example from the `drawImage` plugin:

```typescript
declare module 'chic' {
  interface ChicPlugins {
    /** Draws an image to the console. Works best with small pixel artwork no larger than 256 x 256 (or approximately 65,536 pixels). Internally uses an `HTMLCanvasElement` to obtain pixel color data.
     * @internal */
    drawImage: (image: CanvasImageSource): void;
  }
}
```
