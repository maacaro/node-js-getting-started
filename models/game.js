let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PlayerSchema = new Schema(
    {
        id: { type: String, required: true },
        name: { type: String, required: true },
        fieldPosition: { type: String, required: true },
    }
);

let GameSchema = new Schema(
  {
    id: { type: String, required: true },
    author: { type: String, required: true },
    team: { type: String, required: true },
    players: [PlayerSchema],
    createdAt: { type: Date, default: Date.now },    
  }, 
  { 
    versionKey: false
  }
);

GameSchema.pre('save', next => {
    now = new Date();
    if(!this.createdAt) {
      this.createdAt = now;
    }
    next();
  });
  
  module.exports = mongoose.model('game', GameSchema);