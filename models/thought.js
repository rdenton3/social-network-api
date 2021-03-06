const { Schema, model, Types} = require('mongoose')
const dateFormat = require('../utils/dateFormat');
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
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
          getters: true
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
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
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
          virtuals: true,
          getters: true
        },
        id: false
      }
)

ThoughtSchema.virtual('reactionCount').get(function(){
    // console.log(this, 'test')
    if (this.reactions) {return this.reactions.length}
    else {return 0}
})

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought