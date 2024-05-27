const {
    getFirestore,
    getDocs,
    collection,
} = require("firebase/firestore");
const { app } = require("../config/firebase");
const asyncHandler = require("express-async-handler");

const firestore = getFirestore(app);

const getNotes = asyncHandler(async (req, res) => {
    try {
        const querySnapshot = await getDocs(collection(firestore, "notes-data"));
        const notes = [];
        querySnapshot.forEach((doc) => {
            notes.push({ id: doc.id, ...doc.data() });
        });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching notes", error });
    }
});

module.exports = { getNotes };
