const Note = require('../models/Note');

// @desc    Get all notes for user
// @route   GET /api/notes
const getNotes = async (req, res) => {
  try {
    const { sort = '-createdAt' } = req.query;
    const notes = await Note.find({ user: req.user._id }).sort(sort);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create note
// @route   POST /api/notes
const createNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const note = await Note.create({
      title,
      content,
      tags: tags || [],
      user: req.user._id
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update note
// @route   PUT /api/notes/:id
const updateNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    const { title, content, isPinned, isFavorite, tags } = req.body;

    note.title = title !== undefined ? title : note.title;
    note.content = content !== undefined ? content : note.content;
    note.isPinned = isPinned !== undefined ? isPinned : note.isPinned;
    note.isFavorite = isFavorite !== undefined ? isFavorite : note.isFavorite;
    note.tags = tags !== undefined ? tags : note.tags;

    const updated = await note.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete note
// @route   DELETE /api/notes/:id
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search notes
// @route   GET /api/notes/search?q=
const searchNotes = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === '') {
      const notes = await Note.find({ user: req.user._id }).sort('-createdAt');
      return res.json(notes);
    }

    const notes = await Note.find({
      user: req.user._id,
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } }
      ]
    }).sort('-createdAt');

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getNotes, createNote, updateNote, deleteNote, searchNotes };
