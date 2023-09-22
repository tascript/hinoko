import app from '../index'

describe('Test API', () => {
  test('GET /', async () => {
    const res = await app.request('/')
    expect(res.status).toBe(200)
  })

  describe('POST /profile' , () => {
    test('return 400 when payload is invalid', async () => {
      const method = 'POST'
      const body = JSON.stringify({
        name: 'tascript',
        age: undefined
      })
      const res = await app.request('/profile', {
        method,
        body
      })
      expect(res.status).toBe(400)
    })

    test('return 201', async () => {
      const method = 'POST'
      const body = JSON.stringify({
        name: 'tascript',
        age: 34
      })
      const res = await app.request('/profile', {
        method,
        body
      })
      expect(res.status).toBe(201)
      expect(JSON.parse(await res.text())).toEqual({
        message: "tascript turned 34!"
      })
    })
  })
})