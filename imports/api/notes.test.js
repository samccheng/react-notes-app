import { Meteor } from 'meteor/meteor'
import { chai } from 'meteor/practicalmeteor:chai'

import { Notes } from './notes'

if(Meteor.isServer) {
  describe('notes', function() {
    beforeEach(function() {
      Notes.remove({})
      Notes.insert({
        _id: 'testId1',
        title: 'title',
        body: 'this is the body',
        updatedAt: 0,
        userId: 'test'
      })
    })

    it('should insert new note', function() {
      const userId = 'testId'
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId })

      chai.expect(Notes.findOne({ _id, userId })).to.exist
    })

    it('should remove note', function() {
      Meteor.server.method_handlers['notes.remove'].apply({ userId: 'test'}, ['testId1'])

      chai.expect(Notes.findOne({_id: 'testId1'})).to.not.exist
    })
  })
}
