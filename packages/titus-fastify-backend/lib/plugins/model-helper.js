module.exports = (pg) => (fn) => async (opts) => ({ data: await fn(pg, opts) })
