import { Hono } from 'hono'
import { Greet } from './components/Greet'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { saveAccount, getAllAccounts } from './usecase/account'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{Bindings: Bindings}>()

app.get('/', (c) => {
  const greet = ['hi', 'hey', 'yeah']
  return c.html(<Greet greet={greet} />)
})

const schema =  z.object({
  name: z.string(),
  age: z.number()
})

app.post('/accounts', zValidator('json', schema, (result, c) => {
  if (!result.success) {
    return c.json({
      message: `payload is invavlid: ${JSON.parse(result.error.message)[0].message}`
    }, 400)
  }
}), async (c) => {
  const payload = c.req.valid('json')
  await saveAccount(c.env.DB, payload.name, payload.age)
  return c.text('Created', 201)
})

app.get('/accounts', async (c) => {
  const res = await getAllAccounts(c.env.DB)
  return c.json(res)
})

export default app