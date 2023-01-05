// TODO: documentation
const labelMaker = {
    install: chic => {
        // TODO: documentation
        const makeLabeled = (mode, config) => {
            const { label, style } = config[mode];
            return (strs, ...styles) => {
                chic[mode]([label, ...strs], ...[style, ...styles]);
            };
        };
        // TODO: documentation
        // TODO: figure out how to apply intellisense from here to actual object, if possible
        const labelMaker = (config) => ({
            debug: makeLabeled('debug', config),
            error: makeLabeled('error', config),
            group: makeLabeled('group', config),
            groupCollapsed: makeLabeled('groupCollapsed', config),
            groupEnd: () => chic.groupEnd(),
            info: makeLabeled('info', config),
            log: makeLabeled('log', config),
            warn: makeLabeled('warn', config),
        });
        chic.plugins.labelMaker = labelMaker;
    },
};
export default labelMaker;
//# sourceMappingURL=labelMaker.js.map