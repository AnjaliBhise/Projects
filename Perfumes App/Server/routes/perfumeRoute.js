const express =  require("express");

const {fetch,add,fetchById,submitReview} = require("../controller/perfumeController.js");

const route = express.Router();

route.get("/perfumes",fetch);
route.get("/perfume/:id",fetchById);
route.post("/perfumes/add",add);
route.post("/perfume/reviews/:id", submitReview);

module.exports = route;
