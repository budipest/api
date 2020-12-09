const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const toiletSchema = mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  addDate: String,
  category: String,
  openHours: [Number],
  tags: { BABY_ROOM: Boolean, WHEELCHAIR_ACCESSIBLE: Boolean },

  entryMethod: String,
  price: {
    HUF: Number,
    EUR: Number,
  },
  code: String,

  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },

  // reports: [{ userId: String, addDate: String, .... }],
  notes: [{ userId: String, addDate: String, text: String }],
  votes: [{ userId: String, value: Number }],
});

const Toilet = mongoose.model("Toilet", toiletSchema);

async function fetchToilets(req, res) {
  try {
    const toilets = await Toilet.find({});
    res.send({ data: toilets });
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

async function fetchToilet(req, res) {
  try {
    const toilet = await Toilet.findOne({ _id: req.params.toiletID });
    res.send({ toilet });
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

async function addToilet(req, res) {
  try {
    const newToilet = new Toilet(req.body);
    const error = newToilet.validateSync();
    if (error) {
      throw error;
    } else {
      Toilet.create(newToilet);

      const toilet = await Toilet.findOne({
        name: req.body.name,
        location: req.body.location,
      });

      console.log(toilet);

      res.send({ toilet });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

async function vote(req, res) {
  try {
    const toilet = await Toilet.findOne({ _id: req.params.toiletID });
    const voteUserID = req.params.userID;
    const voteValue = req.body.vote;

    let voteIndex = -1;

    if (toilet.votes != null) {
      for (let i = 0; i < toilet.votes.length; i++) {
        if (toilet.votes[i].userId == voteUserID) {
          voteIndex = i;
        }
      }
    } else {
      toilet.votes = [];
    }

    if (voteIndex == -1 && voteValue != 0) {
      toilet.votes.push({ userId: voteUserID, value: voteValue });
    }

    if (voteValue == 0) {
      toilet.votes.splice(voteIndex, 1);
    } else if (voteIndex != -1) {
      toilet.votes[voteIndex].value = voteValue;
    }

    toilet.save();

    res.send({ toilet });
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

async function addNote(req, res) {
  try {
    if (req.body.note.length < 3) {
      res.status(400).send("Note is too short!");
    }

    const toilet = await Toilet.findOne({ _id: req.params.toiletID });
    const noteUserID = req.params.userID;

    let noteIndex = -1;

    if (toilet.notes != null) {
      for (let i = 0; i < toilet.notes.length; i++) {
        if (toilet.notes[i].userId == noteUserID) {
          noteIndex = i;
        }
      }
    } else {
      toilet.notes = [];
    }

    const vote = {
      userId: noteUserID,
      text: req.body.note,
      addDate: new Date().toISOString(),
    };

    if (noteIndex == -1) {
      toilet.notes.push(vote);
    } else {
      toilet.notes[noteIndex] = vote;
    }

    toilet.notes.sort((a, b) => (a.addDate < b.addDate ? 1 : -1));

    toilet.save();

    res.send({ toilet });
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

async function removeNote(req, res) {
  try {
    const toilet = await Toilet.findOne({ _id: req.params.toiletID });
    const noteUserID = req.params.userID;

    let noteIndex = -1;

    if (toilet.notes != null) {
      for (let i = 0; i < toilet.notes.length; i++) {
        if (toilet.notes[i].userId == noteUserID) {
          noteIndex = i;
        }
      }
    } else {
      toilet.notes = [];
    }

    if (noteIndex != -1) {
      toilet.notes.splice(noteIndex, 1);
    }

    toilet.save();

    res.send({ toilet });
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

module.exports = {
  fetchToilets,
  fetchToilet,
  addToilet,
  vote,
  addNote,
  removeNote,
};
