import type { FC } from 'hono/jsx'
import Default from '../layout/Default'

interface props {
  greet: string[]
}

export const Greet: FC<props> = ({ greet }) => {
  return (
    <Default>
      <h2>tascript is here !</h2>
      <ul>
        { greet.map((g) => {
          return <li>{g} !</li>
        }) }
      </ul>
    </Default>
  )
}