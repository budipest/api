const { Router } = require("express");
const router = new Router();

const {
  fetchToilets,
  fetchToilet,
  addToilet,
  vote,
  addNote,
  editNote,
  removeNote,
} = require("./toilets.js");

router.get("/toilets", fetchToilets);
router.get("/toilets/:toiletID", fetchToilet);
router.post("/toilets", addToilet);
router.post("/toilets/:toiletID/votes/:userID", vote);
router.post("/toilets/:toiletID/notes/:userID", addNote);
router.put("/toilets/:toiletID/notes/:userID", editNote);
router.delete("/toilets/:toiletID/notes/:userID", removeNote);

module.exports = router;
