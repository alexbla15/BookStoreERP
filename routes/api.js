const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const resetDataJsonPath = '../data/resetData.json';
const dynamicDataJsonPath = '../data/data.json';

// get list of all books in ResetData.json
router.get('/resetBooks', (req, res) => {
    try {
        // load data
        const data = require(resetDataJsonPath);

        // check data
        if (!data || !data.books) {
            return res.status(404).json({ 
                success: false, 
                message: "No data found" 
            });
        }

        // send result
        res.json(data.books);

    } catch (error) {
        // print error for debugging
        console.error("Error fetching books:", error.message);

        // return error to client
        res.status(500).json({ 
            success: false, 
            message: "Inner system error in fetching data"
        });
    }
});

// get list of all books in Data.json
// this is a dynamic list
router.get('/books', (req, res) => {
    try {
        // load data
        const dataPath = path.join(__dirname, dynamicDataJsonPath);
        let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        // check data
        if (!data || !data.books) {
            return res.status(404).json({ 
                success: false, 
                message: "No data found" 
            });
        }

        // send result
        res.json(data.books);

    } catch (error) {
        // print error for debugging
        console.error("Error fetching books:", error.message);

        // return error to client
        res.status(500).json({ 
            success: false, 
            message: "Inner system error in fetching data"
        });
    }
});

// save new list of books within the file
router.put('/cacheBooks', (req, res) => {
    try {
        const updatedData = req.body;

        // find file
        const dataPath = path.join(__dirname, dynamicDataJsonPath);
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));


        // write to file
        data.books = updatedData;
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 4));

        res.json({ message: "Caching succesful" });

    } catch (error) {
        console.error("PUT Error:", error);
        res.status(500).json({ message: "System error" });
    }
});

// increase rate of a specific book
router.put('/addrate/:id', (req, res) => {
    try {
        const bookId = parseInt(req.params.id);

        // find file
        const dataPath = path.join(__dirname, dynamicDataJsonPath);
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        // find book in array
        const bookIndex = data.books.findIndex(b => b.id === bookId);

        if (bookIndex === -1) {
            return res.status(404).json({ message: `book id ${bookId} not found` });
        }

        let currRate = data.books[bookIndex].rate;
        if (currRate !== 5)
            currRate += 0.5;

        data.books[bookIndex].rate = currRate;

        // write to file
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 4));

        res.json(data.books[bookIndex]);

    } catch (error) {
        console.error("PUT Error:", error);
        res.status(500).json({ message: "System error" });
    }
});

// decrease rate of a specific book
router.put('/decrate/:id', (req, res) => {
    try {
        const bookId = parseInt(req.params.id);

        // find file
        const dataPath = path.join(__dirname, dynamicDataJsonPath);
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        // find book in array
        const bookIndex = data.books.findIndex(b => b.id === bookId);

        if (bookIndex === -1) {
            return res.status(404).json({ message: `book id ${bookId} not found` });
        }

        let currRate = data.books[bookIndex].rate;
        if (currRate !== 0)
            currRate -= 0.5;

        data.books[bookIndex].rate = currRate;

        // write to file
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 4));

        res.json(data.books[bookIndex]);

    } catch (error) {
        console.error("PUT Error:", error);
        res.status(500).json({ message: "System error" });
    }
});

// update a specific book
router.put('/books/:id', (req, res) => {
    try {
        const bookId = parseInt(req.params.id);
        console.log('UPDATING BOOK ', bookId);

        const updatedBook = req.body;
        if (!updatedBook)
        {
            return res.status(400).json({ message: "Updated book empty json" });
        }

        // check updated book details
        if (!updatedBook.title || !updatedBook.author || !updatedBook.price || isNaN(updatedBook.price) || updatedBook.price < 0 || !updatedBook.url)
            return res.status(400).json({ message: "Updated book bad details" });

        // find file
        const dataPath = path.join(__dirname, dynamicDataJsonPath);
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        // Check if the book exists
        const bookExists = data.books.some(b => b.id === bookId);
        if (!bookExists) {
            return res.status(404).json({ message: "Book not found" });
        }

        data.books[bookId-1] = updatedBook;
        console.log(data);

        // write to file
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 4));

        res.json({ message: `Book with ID ${bookId} updated successfully` });

    } catch (error) {
        console.error("PUT Error:", error);
        res.status(500).json({ message: "System error" });
    }
});

// add a new book
router.post('/books', (req, res) => {
    try {
        console.log('INSERTING NEW BOOK');

        const newBook = req.body;
        if (!newBook)
        {
            return res.status(400).json({ message: "New book is empty" });
        }

        // check updated book details
        if ( !newBook.id || !newBook.title || !newBook.author || !newBook.price || isNaN(newBook.price) || newBook.price < 0 || !newBook.url)
            return res.status(400).json({ message: "New book bad details" });

        // find file
        const dataPath = path.join(__dirname, dynamicDataJsonPath);
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        // Check if the book exists
        const bookExists = data.books.some(b => b.id === newBook.id);
        if (bookExists) {
            return res.status(404).json({ message: "Book of this id already exists!" });
        }

        data.books.push(newBook);
        console.log(data);

        // write to file
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 4));

        res.json({ message: `Book added successfully` });

    } catch (error) {
        console.error("POST Error:", error);
        res.status(500).json({ message: "System error" });
    }
});


// save new list of books within the file
router.delete('/books/:id', (req, res) => {
    try {
        const bookId = parseInt(req.params.id);
        console.log('DELETING BOOK ', bookId);

        // find file
        const dataPath = path.join(__dirname, dynamicDataJsonPath);
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        // Check if the book exists
        const bookExists = data.books.some(b => b.id === bookId);
        if (!bookExists) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Filter out the book with the matching ID
        data.books.splice(bookId-1, 1);

        console.log(data.books);

        // change the ids
        data.books.forEach((book, index) => {
            book.id = index + 1;
        });

        // write to file
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 4));

        res.json({ message: `Book with ID ${bookId} deleted successfully` });

    } catch (error) {
        console.error("DELETE Error:", error);
        res.status(500).json({ message: "System error" });
    }
});

module.exports = router; // export router to use within the server