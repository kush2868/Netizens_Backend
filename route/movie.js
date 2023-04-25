const express = require("express");

const router = express.Router();

const movieController = require("../controller/movie");

router.route("/").get(movieController.GetAll).post(movieController.Create);

router
  .route("/:id")
  .get(movieController.GetById)
  .put(movieController.Update)
  .delete(movieController.delete);

module.exports = router;