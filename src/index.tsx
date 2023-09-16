import { Hono } from 'hono'
import { Greet } from './components/Greet'

const app = new Hono()

app.get('/', (c) => {
  const greet = ['hi', 'hey', 'yeah']
  return c.html(<Greet greet={greet} />)
})

export default app