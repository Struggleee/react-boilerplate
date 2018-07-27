const req = require.context('./', false, /\.json$/);

export default req.keys().reduce((result: string[], path: any) => {
  const index = path
    .split(/(\\|\/)/g)
    .pop()
    .split(/\.json$/)
    .shift();

  result[index] = req(path) || {};

  return result;
}, []);
