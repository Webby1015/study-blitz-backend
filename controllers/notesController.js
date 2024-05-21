const asyncHandler = require("express-async-handler");
// const mongoose = require("mongoose");
const notesModel = require("../models/notesModel");


const getNotes = asyncHandler(async (req, res) => {
  const notes = await notesModel.find();
  res.status(200).json({
    message: "All Notes Loaded",
    size: notes.length,
    data: notes,
  });
});


const createNote = asyncHandler(async (req, res) => {
  const { title, URL} = req.body;
  if (!title || !URL) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const note = await notesModel.create({
    title:title,
    URL:URL
  });

  res.status(201).json({ message: "Note Created", data: note });
});


module.exports = {
    getNotes,
  createNote,
};
