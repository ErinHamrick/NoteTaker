const router = require("express").Router();
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");
const fs = require("fs");

router.get("/", (req, res) => {
	readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

router.post("/", (req, res) => {
	const { title, text } = req.body;

	if (title && text) {
		const newNote = {
			title,
			text,
			id: uuid(),
		};
		readAndAppend(newNote, "./db/db.json");

		const response = {
			status: "success",
			body: newNote,
		};
		res.json(response);
	} else {
		res.json("Error in posting note");
	}
});

router.delete("/:id", (req, res) => {
	const noteId = req.params.id;

	readFromFile("./db/db.json")
		.then((data) => JSON.parse(data))
		.then((notes) => {
			const noteIndex = notes.findIndex((note) => note.id === noteId);

			if (noteIndex !== -1) {
				notes.splice(noteIndex, 1);

				fs.writeFileSync("./db/db.json", JSON.stringify(notes));

				res.json({ success: true, message: "Note deleted succesfully" });
			} else {
				res.status(404).json({ success: false, message: "Note not found" });
			}
		}).catch((err) => {
			res.status(500).json({success: false, messag: "Server error"}); 
		});
});

module.exports = router;
