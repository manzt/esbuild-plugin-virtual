/**
 * @param {Record<string, string | Uint8Array>} options
 * @return {import('esbuild').Plugin}
 */
export default (options = {}) => {
  const namespace = "virtual";
  const filter = new RegExp(
    Object.keys(options).map((name) => `^${name}$`).join("|"),
  );
  return {
    name: namespace,
    setup(build) {
      build.onResolve({ filter }, (args) => ({ path: args.path, namespace }));
      build.onLoad(
        { filter: /.*/, namespace },
        (args) => ({ contents: options[args.path], loader: "js" }),
      );
    },
  };
};
