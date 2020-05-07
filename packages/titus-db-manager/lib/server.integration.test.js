const buildServer = require('./build-server')

describe('Server Integration', () => {
  const fastify = buildServer()

  describe('/db/truncate', () => {
    it('runs truncate command in DB', done => {
      fastify.inject(
        {
          method: 'POST',
          url: '/db/truncate'
        },
        (err, response) => {
          if (err) {
            return done(err)
          }

          expect(response.json()).toEqual({
            success: true
          })

          done()
        }
      )
    })
  })

  describe('/db/migrate', () => {
    it('runs migrate command in DB', done => {
      fastify.inject(
        {
          method: 'POST',
          url: '/db/migrate'
        },
        (err, response) => {
          if (err) {
            return done(err)
          }

          expect(response.json()).toEqual({
            success: true
          })

          done()
        }
      )
    })
  })

  describe('/db/seed', () => {
    it('runs seed command in DB', done => {
      fastify.inject(
        {
          method: 'POST',
          url: '/db/seed'
        },
        (err, response) => {
          if (err) {
            return done(err)
          }

          expect(response.json()).toEqual({
            success: true
          })

          done()
        }
      )
    })
  })
})
