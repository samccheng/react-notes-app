import { Meteor } from 'meteor/meteor'
import { chai } from 'meteor/practicalmeteor:chai'

import { Notes } from './notes'

if(Meteor.isServer) {
  describe('notes', function() {
    const noteOne = {
      _id: 'testId1',
      title: 'title',
      body: 'this is the body',
      updatedAt: 0,
      userId: 'test'
    }

    const noteTwo = {
      _id: 'testId2',
      title: 'another title',
      body: 'this is another body',
      updatedAt: 0,
      userId: 'test2'
    }
    beforeEach(function() {
      Notes.remove({})
      Notes.insert(noteOne)
      Notes.insert(noteTwo)
    })

    it('should insert new note', function() {
      const userId = 'testId'
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId })

      chai.expect(Notes.findOne({ _id, userId })).to.exist
    })

    it('should remove note', function() {
      Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId}, [noteOne._id])

      chai.expect(Notes.findOne({_id: noteOne._id})).to.not.exist
    })

    it('should not remove note if unauthenticated', function() {
      chai.expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id])
      }).to.throw()
    })

    it('should not remove note if invalid id', function() {
      chai.expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId })
      }).to.throw()
    })

    it('should update note', function() {
        const title = "updated title"
        Meteor.server.method_handlers['notes.update'].apply(
          { userId: noteOne.userId },
           [
             noteOne._id,
             { title }
           ])

           const note = Notes.findOne(noteOne._id)

           chai.expect(note.updatedAt).to.be.above(0)
           chai.expect(note).to.include({
             title,
             body: noteOne.body
           })
      })

    it('should throw error if extra updates', function() {
         chai.expect(() => {
           Meteor.server.method_handlers['notes.update'].apply(
             { userId: noteOne.userId },
              [
                noteOne._id,
                { name: 'me' }
              ])
         }).to.throw()
      })

    it('should not update note if not note creator', function() {
      const title = "updated title"
      Meteor.server.method_handlers['notes.update'].apply(
        { userId: 'kdkd' },
         [
           noteOne._id,
           { title }
         ])

         const note = Notes.findOne(noteOne._id)

         chai.expect(note).to.include(noteOne)
    })

    it('should not update note if unauthenticated', function() {
      chai.expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id])
      }).to.throw()
    })

    it('should not update note if invalid id', function() {
      chai.expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId })
      }).to.throw()
    })

    it('should return users notes', function() {
      const result = Meteor.server.publish_handlers.notes.apply({ userId: noteOne.userId })
      const notes = result.fetch()

      chai.expect(notes.length).equal(1)
      chai.expect(notes[0]).to.eql(noteOne)
    })

    it('should return users no notes if has none', function() {
      const result = Meteor.server.publish_handlers.notes.apply({ userId: "not user" })
      const notes = result.fetch()

      chai.expect(notes.length).equal(0)
    })
})
}
