const express = require('express');
const router = express.Router();
const { getNotes, createNote, updateNote, deleteNote, searchNotes } = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/search', searchNotes);
router.route('/').get(getNotes).post(createNote);
router.route('/:id').put(updateNote).delete(deleteNote);

module.exports = router;
