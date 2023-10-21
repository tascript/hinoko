import app from '../index'
import { expect, test, describe, spyOn, jest, mock } from "bun:test"
import * as Account  from '../usecase/account'

describe('Test API', () => {
  test('GET /', async () => {
    const res = await app.request('/')
    expect(res.status).toBe(200)
  })

  describe('POST /accounts' , () => {
    test('return 400 when payload is invalid', async () => {
      const method = 'POST'
      const body = JSON.stringify({
        name: 'tascript',
        age: undefined
      })
      const res = await app.request('/accounts', {
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
      // FIXME: Not working for ESM spyOn
      const mockSaveAccount = spyOn(Account, 'saveAccount').mockImplementation(() => new Promise ((res) => res(undefined)))
      const res = await app.request('/accounts', {
        method,
        body
      }, {
        DB: 'test'
      })
      expect(mockSaveAccount).toHaveBeenCalled()
      expect(res.status).toBe(201)
      expect(await res.json()).toEqual({
        message: "Created"
      })
    })
  })
})