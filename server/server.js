const Koa = require('koa')

const app = new Koa()

const isDev = process.env.NODE_ENV === 'development'

const pageRouter = require('./routers/dev-ssr')

app.use(async (ctx, next) => {
  try {
    console.log(`request width path ${ctx.path}`)
    await next()
  } catch (e) {
    console.log(e)
    ctx.status = 500
    if (isDev) {
      ctx.body = e.message
    } else {
      ctx.body = 'please try again later'
    }
  }
})

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
