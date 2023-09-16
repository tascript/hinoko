import type { FC } from 'hono/jsx'

const Base: FC = (props) => {
  return(
    <html>
      <body>
        {props.children}
      </body>
    </html>
  )
}

export default Base