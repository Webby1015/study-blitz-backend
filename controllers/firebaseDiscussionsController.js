const {
  getFirestore,
  getDocs,
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
    }));
    res
      .status(200)
      .json({ message: "Discussions", data: formattedDiscussions });
  } catch (error) {
    res.status(500).json({ message: "Error fetching discussions", error });
  }
});

module.exports = { getDiscussions };
