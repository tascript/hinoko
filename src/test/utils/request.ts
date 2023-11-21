interface GenRequest {
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: string
}

export const genRequest = (arg: GenRequest) => {
  return new Request('http://localhost' + arg.path, {
    method: arg.method,
    headers: { "Content-Type": "application/json" },
    body: arg.body
  })
}