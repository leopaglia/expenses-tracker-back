// this could be a middleware
export const controller = (options, fn) => async (req, res, next) => {
  console.log(req.body)

  if (options.required?.length) {
    const paramsLocation = ['GET', 'DELETE'].includes(req.method)
      ? 'query'
      : 'body'

    for (let param of options.required) {
      if (!req[paramsLocation][param]) {
        const initial = options.required.slice(0, -1)
        const last = options.required[options.required.length - 1]
        const message = `${initial
          .map((p) => `'${p}'`)
          .join(', ')} and '${last}' parameters should not be empty.`

        return res.status(400).json({ error: message })
      }
    }
  }

  try {
    return await fn(req, res, next)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: e.message || e })
  }
}
