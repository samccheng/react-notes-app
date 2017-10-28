import { Meteor } from 'meteor/meteor'
import { chai } from 'meteor/practicalmeteor:chai'
import { validateNewUser } from './users'

if (Meteor.isServer) {
  describe ('users', function() {
    it ('should have valid email', function() {
      const testUser = {
        emails: [
          {
            address: 'test@test.com'
          }
        ]
      }
      const result = validateNewUser(testUser)
      chai.expect(result).to.be.true
    })
  })
}
