const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const discussionsModel = require("../models/discussionsModel");


const getDiscussions = asyncHandler(async (req, res) => {
  const discussions = await discussionsModel.find();
  res.status(200).json({
    message: "All discussions Loaded",
    size: discussions.length,
    data: discussions,
  });
});


const createDiscussion = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const discussion = await discussionsModel.create({
    owner_id: req.user.id,
    title:title,
    content:content
  });

  res.status(201).json({ message: "Discussion Created", data: discussion });
});


const deleteDiscussion = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error(`Invalid discussion ID: ${req.params.id}`);
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
    data: discussionAvailable,
  });
});

module.exports = {
  getDiscussions,
  createDiscussion,
  deleteDiscussion,
};
