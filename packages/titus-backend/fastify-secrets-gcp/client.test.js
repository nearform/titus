'use strict'

const GcpClient = require('./client')

describe('gcp client', () => {
  const FAKE_SDK = {
    accessSecretVersion: jest.fn()
  }

  beforeAll(() => {
    jest.resetModules()
    jest.mock('@google-cloud/secret-manager', () => ({
      SecretManagerServiceClient: jest.fn().mockImplementation(() => FAKE_SDK)
    }))
  })

  beforeEach(() => jest.restoreAllMocks())

  describe('get', async () => {
    it('converts payload buffer to string and return', async () => {
      const client = new GcpClient()

      FAKE_SDK.accessSecretVersion.mockResolvedValue([
        {
          payload: {
            data: Buffer.from('secret payload')
          }
        }
      ])

      const secret = await client.get(
        'projects/project-id/secrets/secret-key/versions/latest'
      )

      expect(secret).toEqual('secret payload')
      expect(
        FAKE_SDK.accessSecretVersion.toHaveBeenCalledWith({
          name: 'projects/project-id/secrets/secret-key/versions/latest'
        })
      )
    })

    it('throw error on sdk error', async () => {
      const client = new GcpClient()

      FAKE_SDK.accessSecretVersion.mockRejectedValue(new Error())

      await expect(
        client.get('projects/project-id/secrets/secret-key/versions/latest')
      ).rejects.toThrow(`Secret not found: secret-key`)
    })
  })
})
