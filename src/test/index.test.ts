import app from '../index'

describe('Test API', () => {
  test('POST /profile', async () => {
    const res = await app.request('/profile')
    expect(res.status).toBe(200)
  })
})