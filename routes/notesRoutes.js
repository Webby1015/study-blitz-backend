const express = require("express");
const router = express.Router();
const {getNotes,createNote} = require("../controllers/notesController");
const validateToken = require("../middleware/validationTokenHandler");

router.use(validateToken);
// router.route('/').get(getContacts).post(createContact)
// router.route('/:id').put(updateContact).delete(deleteContact).get(getContact)
router.get('/',getNotes)
router.post('/',createNote)

module.exports = router;