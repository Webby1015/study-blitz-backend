const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const discussionsModel = require("../models/discussionsModel");


const getDiscussions = asyncHandler(async (req, res) => {
  const contacts = await discussionsModel.find({ owner_id: req.user.id });
  res.status(200).json({
    message: "All Contacts Loaded",
    size: contacts.length,
    data: contacts,
  });
});


const createDiscussion = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const contact = await discussionsModel.create({
    owner_id: req.user.id,
    title:title,
    content:content
  });

  res.status(201).json({ message: "Discussion Created", data: contact });
});


const deleteDiscussion = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error(`Invalid contact ID: ${req.params.id}`);
  }

  const discussionAvailable = await discussionsModel.findById(req.params.id);

  if (
    !discussionAvailable ||
    discussionAvailable.user_id !== req.user.id
  ) {
    res.status(404);
    throw new Error(`Discussion not found by id ${req.params.id}`);
  }

  await discussionsModel.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: `Discussion deleted by ID ${req.params.id}`,
    data: contactAvailable,
  });
});

module.exports = {
  getDiscussions,
  createDiscussion,
  deleteDiscussion,
};
