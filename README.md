In development....

Sources:

https://www.npmjs.com/package/an-array-of-spanish-words

https://www.npmjs.com/package/redux-persist#basic-usage

Frontend:
Base features:

- Vocabulary page where user can view their “bank” as well as stats (ranked 1-5) associated with each word presented by a notecard\*
- Use AI to provide “enhanced” lists. When the user creates a new set, they can at any point add new words that are related but distinct. If they are creating a brand new set, they will have the option to choose from a predefined list of word types, automatically filling the set.
-

\*Notecard: Word or phrase on the front, definition/conjugations, example usage, link to resources, etc

- Tutor page, with chaGPT-like interface , which will act as ai tutor; core Duolingo user data and metadata(tough)
  - Lesson section where user can ask questions related to their Duolingo data, progress, areas to direct focus, etc
  - Daily, weekly, monthly, and yearly lesson and progress recaps, along with rank and achievement system (dopamine)

**\*\*\***OLD MODELS **\*\*\***

Deck Model

importmongoosefrom"mongoose";

constWordDeckSchema=newmongoose.Schema({

user:{

type:mongoose.Schema.Types.ObjectId,

required:true,

ref:"User",

},

name:{

type:String,

required:true,

},

description:String,

tags:[String],

creationDate:{

type:Date,

default:Date.now,

immutable:false,

},

preferences:{

insertOrder:[String],

favorited:Boolean,

// color: String,

},

words:[

{

type:mongoose.Schema.Types.ObjectId,

ref:"Word",

},

],

lastStudied:{

type:Date,

default:newDate(4),

},

// Gaamification Fields (This needs to be implemented in the frontend )

experiencePoints:{

type:Number,

default:0,

},

level:{

type:Number,

default:1,

},

completedChallenges:[String],// IDs or names of completed challenges

badges:[String],// IDs or names of earned badges

streak:{

type:Number,

default:0,

},

lastStreakDate:{

type:Date,

},

});

constDeckModel=mongoose.model("Decks",WordDeckSchema,"decks");

export{DeckModel};
