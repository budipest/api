const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, { useUnifiedTopology: true });

const toiletSchema = mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  addDate: String,
  category: String,
  openHours: [Number],
  tags: { BABY_ROOM: Boolean, WHEELCHAIR_ACCESSIBLE: Boolean },

  entryMethod: String,
  price: Number,
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
    res.send("error!");
  }
}

async function fetchToilet(req, res) {
  try {
    const toilet = await Toilet.findOne({ _id: req.params.toiletID });
    res.send({ toilet });
  } catch (e) {
    console.error(e);
    res.send("error!");
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
    res.send("error!");
  }
}

module.exports = {
  fetchToilets,
  fetchToilet,
  addToilet,
};
