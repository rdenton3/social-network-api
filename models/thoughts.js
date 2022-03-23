const { Schema, model, Types} = require('mongoose')

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
          type: Schema.Types.ObjectId,
          ref: 'User'  
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {

        }
    }
)

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
            type: Schema.Types.ObjectId,
            ref: 'User'  
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
)

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
})

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought