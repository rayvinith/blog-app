const express = require("express");
const { getAllTeachersController, createTeacherController, updateTeacherController, getTeacherByIdController, deleteTeacherController, userTeacherControlller } = require("../controllers/teacherController");

//router object
const router = express.Router();

//routes
// GET || all blogs
router.get("/all-teacher", getAllTeachersController);

//POST || create blog
router.post("/create-teacher", createTeacherController);

//PUT || update blog
router.put("/update-teacher/:id", updateTeacherController);

//GET || SIngle Blog Details
router.get("/get-teacher/:id", getTeacherByIdController);

//DELETE || delete blog
router.delete("/delete-teacher/:id", deleteTeacherController);

//GET || user blog
router.get("/user-teacher/:id", userTeacherControlller);

module.exports = router;
