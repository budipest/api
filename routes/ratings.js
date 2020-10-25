async function upvote(req, res) {
  try {
    res.send({ hey: "hi!" });
  } catch (e) {
    console.error(e);
    res.send("error!");
  }
}

async function downvote(req, res) {
  try {
    res.send({ hey: "hi!" });
  } catch (e) {
    console.error(e);
    res.send("error!");
  }
}

async function addNote(req, res) {
  try {
    res.send({ hey: "hi!" });
  } catch (e) {
    console.error(e);
    res.send("error!");
  }
}

async function removeNote(req, res) {
  try {
    res.send({ hey: "hi!" });
  } catch (e) {
    console.error(e);
    res.send("error!");
  }
}

module.exports = {
  upvote,
  downvote,
  addNote,
  removeNote,
};
