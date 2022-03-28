const { Schema, model, Types} = require('mongoose')
const ReactionSchema = new Schema(
    {
        reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true, 
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON: {
          virtuals: true
        },
        id: false
      }
)

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required:true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
        type: String,
        required: true,
        trim: true
        // ask why is it not hooked up to object ID
        //   type: Schema.Types.ObjectId,
        //   ref: 'User'  
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
          virtuals: true
        },
        id: false
      }
)

ThoughtSchema.virtual('reactionCount').get(function(){
    // return this.reactions.length
    console.log(this, 'test')
})

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought