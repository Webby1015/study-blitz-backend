const {
  getFirestore,
  getDocs,
  addDoc,
  collection,
  doc,
} = require("firebase/firestore");
const { app } = require("../config/firebase");
const asyncHandler = require("express-async-handler");

const firestore = getFirestore(app);

const getDiscussions = asyncHandler(async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(firestore, "discussions"));
    const discussions = [];

    for (const docSnapshot of querySnapshot.docs) {
      const discussion = { id: docSnapshot.id, ...docSnapshot.data() };

      const commentsSnapshot = await getDocs(
        collection(firestore, "discussions", docSnapshot.id, "comments")
      );
      const comments = commentsSnapshot.docs.map((commentDoc) => ({
        id: commentDoc.id,
        ...commentDoc.data(),
      }));

      discussion.comments = comments;
      discussions.push(discussion);
    }
    const formattedDiscussions = discussions.map((discussion) => ({
      id: discussion.id,
      name: discussion.name,
      title: discussion.title,
      description: discussion.description, // Assuming 'description' is the correct key
      comments: discussion.comments,
      updatedAt: discussion.updatedAt
    }));
    res
      .status(200)
      .json({ message: "Discussions", data: formattedDiscussions });
  } catch (error) {
    res.status(500).json({ message: "Error fetching discussions", error });
  }
});

const createDiscussion = asyncHandler(async (req, res) => {
  try {
    const { name, title, description } = req.body;

    if (!name || !title || !description) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const newDiscussion = {
      name,
      title,
      description,
    };

    const docRef = await addDoc(collection(firestore, "discussions"), newDiscussion);

    res.status(201).json({ message: "Discussion created", id: docRef.id });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error creating discussion", error });
  }
});

const createComment = asyncHandler(async (req, res) => {
  try {
    const {discussionId, name, comment } = req.body;
 
    if (!discussionId|| !name || !comment) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const newComment = {
      name,
      comment,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(
      collection(firestore, "discussions", discussionId, "comments"),
      newComment
    );

    res.status(201).json({ message: "Comment created", id: docRef.id });
  } catch (error) {
    res.status(500).json({ message: "Error creating comment", error });
  }
});


module.exports = { getDiscussions,createComment,createDiscussion };
