const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    quizesTaken: [{type: mongoose.Schema.Types.ObjectId, ref: 'Quiz'}],//this is a many to many
    quizesCreated: [{type: mongoose.Schema.Types.ObjectId, ref: 'Quiz'}]//this is a one to many
});

//hashes the password
userSchema.pre('save', async function(next) {
    try {
      if (!this.isModified('password')) {
        return next();
      }
      const hashed = await bcrypt.hash(this.password, 10);
      this.password = hashed;
      return next();
    } catch (err) {
      return res.json(err);
    }
  });

module.exports = mongoose.model('User',userSchema);