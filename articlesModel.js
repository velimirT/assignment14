var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var Articles = new Schema({
  /* TODO:
   * Add four entries into our schema. These should be:
   *
   * 1: username: A string that will be be required, and also trimmed.
   * 2: password: A string that will be required, trimmed, and at least 6 characters.
   * 3: email: A string that must be a valid email address and unique in our collection.
   * 4: userCreated: A date that will default to the current date.
   *
   * TIP: The regex for checking if a string is an email is: /.+\@.+\..+/
   * Use that with the model attribute that checks for a valid match.
   * -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/ */
   title:{
      type: String,
      trim: true,
      required: [true, "Title is a required field!"],
      minlength: 6
   },
   summary:{
      type: String,
      trim: true,
      required: [true, "Summary is a required field!"],
      minlength: 15
   },
   url:{
      type: String,
   },
   created:{
      type: Date,
      default: Date.now
   }
});

Articles.pre('save', function (next) {
    var self = this;
    Articles.find({url : self.url}, function (err, docs) {
        if (!docs.length){
            console.log("saved");
            next();
        }else{                
            console.log('user exists: ',self.name);
            next(new Error("User exists!"));
        }
    });
}) ;

// This creates our model from the above schema, using mongoose's model method
var Articles = mongoose.model("articles", Articles);

// Export the User model
module.exports = Articles;
