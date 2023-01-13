let running;
var snoop_default = {
  id: "snoop",
  // TODO: documentation
  install: (chic) => ({ check, labels = ["Event Occurred"], level = "log", rate = 100, repeat = false, styles = [""] }) => {
    const log = () => (chic[level](labels, ...styles), !repeat && stop());
    const poll = () => {
      const ready = check();
      if (!(ready instanceof Promise))
        return ready ? log() : void 0;
      ready.then((ready2) => ready2 ? log() : void 0);
    };
    const start = () => (running && stop(), running = setInterval(poll, rate));
    const stop = () => clearInterval(running);
    start();
    return { start, stop };
  },
  uninstall: () => clearInterval(running)
};
export {
  snoop_default as default
};
//# sourceMappingURL=snoop.js.map
