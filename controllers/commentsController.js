const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const commentsModel = require("../models/commentsModel");


const getComments = asyncHandler(async (req, res) => {
  const contacts = await commentsModel.find({ ref_id: req.params.id });
  res.status(200).json({
    message: "All Contacts Loaded",
    size: contacts.length,
    data: contacts,
  });
});


const createDiscussion = asyncHandler(async (req, res) => {
  const { ref_id, text } = req.body;
  if (!ref_id || !text) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const comment = await commentsModel.create({
    ref_id: ref_id,
    text:text
  });

  res.status(201).json({ message: "Discussion Created", data: comment });
});



module.exports = {
    getComments,
  createDiscussion,
};
