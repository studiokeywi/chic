let running;
const install = (chic) => ({ check, labels = ["Event Occurred"], level = "log", repeat = false, styles = [""] }) => {
  const log = () => (chic[level](labels, ...styles), repeat && start());
  const poll = () => {
    const ready = check();
    const result = (ready2) => (ready2 ? log : start)();
    if (!(ready instanceof Promise))
      return result(ready);
    ready.then(result);
  };
  const start = () => {
    if (running)
      stop();
    running = requestAnimationFrame(poll);
  };
  const stop = () => {
    cancelAnimationFrame(running);
  };
  start();
  return { start, stop };
};
var snoop_default = { id: "snoop", install, uninstall: () => cancelAnimationFrame(running) };
export {
  snoop_default as default
};
//# sourceMappingURL=snoop.js.map
