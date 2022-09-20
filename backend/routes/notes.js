const express = require('express')
const User = require('../models/User')
const Notes = require('../models/Notes')

const fetchUser = require('../middleware/fetchuser')

const { body, validationResult } = require('express-validator')
// const jwt = require('jsonwebtoken')
// const JSON_SECRET_KEY="Hell0Peter"
const router = express.Router();
router.get(
  '/allnotes', fetchUser, async (req, res) => {
    try {
      const user_id = req.user.id
      const notes = await Notes.find({ userid: user_id })

      res.json(notes);
    } catch (error) {
      console.log(error.message)
      res.status(500).send('Internal Server Error')
    }
  }
)
router.post('/createnote', fetchUser, [
  body('title',).isLength({ min: 5 }),
  body('description').isLength({ min: 5 }),

]
  , async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description, tag } = req.body
      let notes = await Notes.create({
        title, description, tag, userid: req.user.id,
      });
      let n = await notes.save()
      res.send(n)

    } catch (error) {
      console.log(error.message)
      res.status(500).send('Internal Server Error')
    }
  }
)
router.put('/updatenote/:id', fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  // Create a newNote object 
  const newNote = {};
  if (title) { newNote.title = title }
  if (description) { newNote.description = description };
  if (tag) { newNote.tag = tag };
  // Find the note to be updated and update it
  let note = await Notes.findById(req.params.id);
  if (!note) { return res.status(404).send("Not Found") }
  if (note.userid.toString() !== req.user.id) {
    return res.status(401).send("Not allowed")
  }
  note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
  res.json(newNote);
}
)
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  // Create a newNote object 

  // Find the note to be updated and update it
  let note = await Notes.findById(req.params.id);
  if (!note) { return res.status(404).send("Not Found") }
  if (note.userid.toString() !== req.user.id) {
    return res.status(401).send("Not allowed")
  }
  note = await Notes.findByIdAndDelete(req.params.id)
  res.json("Success:Note has been deleted");

}
)
module.exports = router;