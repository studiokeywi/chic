const install = (chic) => ({
  check,
  labels = ["Event Occurred"],
  level = "log",
  repeat = false,
  styles = [""]
}) => {
  const log = () => (chic[level](labels, ...styles), repeat && start());
  const poll = () => !((ready = check()) instanceof Promise) ? result(ready) : ready.then(result);
  const result = (ready2) => (ready2 ? log : start)();
  const start = () => void (running && stop(), running = requestAnimationFrame(poll));
  const stop = () => void cancelAnimationFrame(running);
  let ready = false;
  let running;
  start();
  return { start, stop, uninstall: stop };
};
const snoop = { id: "snoop", install };
export {
  snoop
};
//# sourceMappingURL=snoop.js.map
