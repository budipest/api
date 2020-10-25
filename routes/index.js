const { Router } = require("express");
const router = new Router();

const { fetchToilets, fetchToilet, addToilet } = require("./toilets.js");
const { upvote, downvote, addNote, removeNote } = require("./ratings.js");

router.get("/toilets", fetchToilets);
router.get("/toilets/:toiletID", fetchToilet);
router.post("/toilets", addToilet);
router.post("/toilets/:toiletID/upvote/:userID", upvote);
router.post("/toilets/:toiletID/downvote/:userID", downvote);
router.post("/toilets/:toiletID/notes/:userID", addNote);
router.delete("/toilets/:toiletID/notes/:userID", removeNote);

module.exports = router;
