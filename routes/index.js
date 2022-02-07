const { Router } = require("express");
const { authMiddleware } = require("../middlewares");
const router = new Router();

const {
  fetchToilets,
  fetchToiletsWODetails,
  fetchToilet,
  addToilet,
  addVote,
  addNote,
  removeNote,
} = require("./toilets.js");

router.get("/toilets", fetchToilets);
router.get("/toilets/:toiletID", fetchToilet);
router.get("/toiletsWODetails", authMiddleware, fetchToiletsWODetails);
router.post("/toilets", addToilet);
router.post("/toilets/:toiletID/votes/:userID", addVote); // add or modify vote
router.post("/toilets/:toiletID/notes/:userID", addNote); // add or update note
router.delete("/toilets/:toiletID/notes/:userID", removeNote);

module.exports = router;
