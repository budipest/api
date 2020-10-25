const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, { useUnifiedTopology: true });

const toiletSchema = mongoose.Schema({
  id: String,
  name: String,
  addDate: String,
  category: String,
  openHours: [Number],
  tags: { BABY_ROOM: Boolean, WHEELCHAIR_ACCESSIBLE: Boolean },

  entryMethod: String,
  price: Number,
  code: String,

  location: {
    latitude: Number,
    longitude: Number,
  },

  // reports: [{ userId: String, addDate: String, .... }],
  notes: [{ userId: String, addDate: String, text: String }],
  votes: [{ userId: String, value: Number }],
});

const Toilet = mongoose.model("Toilet", toiletSchema);

async function nearbyToilets(req, res) {
  try {
    res.send({ hey: "hi!" });
  } catch (e) {
    console.error(e);
    res.send("error!");
  }
}

async function addToilet(req, res) {
  try {
    res.send({ hey: "hi!" });
  } catch (e) {
    console.error(e);
    res.send("error!");
  }
}

async function fetchToilet(req, res) {
  try {
    res.send({ hey: "hi!" });
  } catch (e) {
    console.error(e);
    res.send("error!");
  }
}

module.exports = {
  nearbyToilets,
  addToilet,
  fetchToilet,
};
