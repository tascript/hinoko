import app from '../index'
import { expect, test, describe, spyOn } from "bun:test"
import * as Account  from '../usecase/account'

describe('Test API', () => {
  test('GET /', async () => {
    const res = await app.request('/')
    expect(res.status).toBe(200)
  })

  describe('POST /accounts' , () => {
    test('return 400 when payload is invalid', async () => {
      const method = 'POST'
      const headers = { "Content-Type": "application/json" }
      const body = JSON.stringify({
        name: 'tascript',
        age: undefined
      })
      const res = await app.fetch(new Request ('http://localhost/accounts', {
        method,
        headers,
        body
      }))
      expect(res.status).toBe(400)
    })

    test('return 201', async () => {
      const method = 'POST'
      const headers = { "Content-Type": "application/json" }
      const body = JSON.stringify({
        name: 'tascript',
        age: 34
      })
      const mockSaveAccount = spyOn(Account, 'saveAccount').mockImplementation(() => new Promise ((res) => res(undefined)))
      const res = await app.fetch(new Request ('http://localhost/accounts', {
        method,
        headers,
        body
      }), {
        DB: 'test'
      })
      expect(mockSaveAccount).toHaveBeenCalled()
      expect(res.status).toBe(201)
    })
  })
})