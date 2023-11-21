import app from '../index'
import { expect, test, describe, spyOn } from "bun:test"
import { genRequest } from './utils/request'
import * as Account  from '../usecase/account'

describe('Test API', () => {
  test('GET /', async () => {
    const res = await app.request('/')
    expect(res.status).toBe(200)
  })

  describe('POST /accounts' , () => {
    test('return 400 when payload is invalid', async () => {
      const res = await app.fetch(genRequest({
        path: '/accounts',
        method: 'POST',
        body: JSON.stringify({
          name: 'tascript',
          age: undefined
        })
      }))
      expect(res.status).toBe(400)
    })

    test('return 201', async () => {
      const mockSaveAccount = spyOn(Account, 'saveAccount').mockImplementation(() => new Promise ((res) => res(undefined)))
      const res = await app.fetch(genRequest({
        path: '/accounts',
        method: 'POST',
        body: JSON.stringify({
          name: 'tascript',
          age: 34
        })
      }), {
        DB: 'test'
      })
      expect(mockSaveAccount).toHaveBeenCalled()
      expect(res.status).toBe(201)
      const blob = await res.blob()
      expect(await blob.text()).toBe('Created')
    })
  })

  describe('DELETE /accounts', () => {
    test('return 200', async () => {
      const mockBulkDeleteAccounts = spyOn(Account, 'bulkDeleteAccounts').mockImplementation(() => new Promise ((res) => res(undefined)))
      const res = await app.fetch(genRequest({
        path: `/accounts`,
        method: 'DELETE',
      }), {
        DB: 'test'
      })
      expect(mockBulkDeleteAccounts).toHaveBeenCalled()
      expect(res.status).toBe(200)
      const blob = await res.blob()
      expect(await blob.text()).toBe('Deleted All of Accouts Table')
    })
  })

  describe('DELETE /accounts/:id' , () => {
    test('reutrn 200', async () => {
      const id = 'dummy-id'
      const mockDeleteAccount = spyOn(Account, 'deleteAccount').mockImplementation(() => new Promise ((res) => res({id})))
      const res = await app.fetch(genRequest({
        path: `/accounts/${id}`,
        method: 'DELETE',
      }), {
        DB: 'test'
      })
      expect(mockDeleteAccount).toHaveBeenCalled()
      expect(res.status).toBe(200)
      const blob = await res.blob()
      expect(await blob.text()).toBe(`Deleted Account: ${id}`)
    })
  })
})