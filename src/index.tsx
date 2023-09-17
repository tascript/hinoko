import { Hono } from 'hono'
import { Greet } from './components/Greet'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

const app = new Hono()

app.get('/', (c) => {
  const greet = ['hi', 'hey', 'yeah']
  return c.html(<Greet greet={greet} />)
})

const schema =  z.object({
  name: z.string(),
  age: z.number()
})

app.post('/profile', zValidator('json', schema, (result, c) => {
  if (!result.success) {
    return c.json({
      message: `payload is invavlid: ${JSON.parse(result.error.message)[0].message}`
    }, 400)
  }
}), (c) => {
  const payload = c.req.valid('json')
  return c.json({
    message: `${payload.name} turned ${payload.age}!`
  }, 201)
})

export default app