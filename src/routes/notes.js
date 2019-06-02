const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Models
const Note = require('../models/Note');

// New Note
router.get('/notes/add', (req, res) => {
  res.render('notes/new-note');
});

router.post('/notes/new-note', async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({text: 'Please Write a Title.'});
  }
  if (!description) {
    errors.push({text: 'Please Write a Description'});
  }
  if (errors.length > 0) {
    res.render('notes/new-note', {
      errors,
      title,
      description
    });
  } else {
    const newNote = new Note({title, description});
    console.log(req.cookies.id3);
    console.log(req.cookies['id3']);
    newNote.user = req.cookies.id3;
    await newNote.save();
    res.redirect('/notes');
  }
});

// Get All Notes
router.get('/notes', async (req, res) => {
  const notes = await Note.find({ user: mongoose.Types.ObjectId(req.cookies.id3) });
  res.render('notes/all-notes', { notes: notes, signin: true});
});

// Edit Notes
router.get('/notes/edit/:id', async (req, res) => {
  const note = await Note.findById(req.params.id);
  if(note.user != req.cookies.id3) {
    return res.redirect('/notes');
  } 
  res.render('notes/edit-note', { note });
});

router.put('/notes/edit-note/:id', async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, {title, description});
  res.redirect('/notes');
});

// Delete Notes
router.delete('/notes/delete/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.redirect('/notes');
});

module.exports = router;
