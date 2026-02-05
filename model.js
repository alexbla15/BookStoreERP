'use strict';

class Book{
    constructor(id, title, author, price, url, rate){
        this.id = id;
        this.title = title;
        this.author = author;
        this.price = price;
        this.url = url;
        this.rate = rate;
    }

    addRate(){
        if (this.rate < 5) {
            this.rate += 0.5;
        }
    }

    decRate(){
        if (this.rate > 0) {
            this.rate -= 0.5;
        }
    }

    edit(title, author, price, url)
    {
        console.log(title, author, price, url);
        if (!title || !author || isNaN(price) || price < 0 || !url)
            return false;

        this.title = title;
        this.author = author;
        this.price = price;
        this.url = url;
        return true;
    }

    static fromJson(obj)
    {
        return new Book(obj.id, obj.title, obj.author, obj.price, obj.url, obj.rate);
    }
}

// model constants and variable

//#region Constants

const GbooksPerPage = 2;

// minimal book data
const Gbooks = [
    new Book(1, "The Greate Gatsby", "F. Scott Fitzgerald", 10.99, 
        "https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg",
    1),
    new Book(2, "1984", "George Orwell", 8.79, 
        "https://upload.wikimedia.org/wikipedia/commons/5/51/1984_first_edition_cover.jpg",
    2),
    new Book(3, "To Kill a Mockingbird", "Harper Lee", 12.49, 
        "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
    3),
    new Book(4, "Pride and Prejudice", "Jane Austen", 1.04, 
        "https://upload.wikimedia.org/wikipedia/commons/1/17/PrideAndPrejudiceTitlePage.jpg",
    4),
    new Book(5, "The Catcher in the Rye", "J.D. Salinger", 11.50, 
        "https://upload.wikimedia.org/wikipedia/commons/8/8e/Catcher-in-the-rye-red-cover.jpg",
    5)
];

//#endregion

//#region Variables

let currentLanguage = 'eng';
let tableToInject = '';

let booksInventory = [];

//#endregion

function getBooksFromLocalStorage(){
    const cachedBooks = localStorage.getItem('books');
    const jsonArray = JSON.parse(cachedBooks);
    booksInventory = jsonArray.map(Book.fromJson);
    
    if (!Array.isArray(booksInventory))
    {
        console.log("local storage damaged");
        return;
    }
}

function resetData(){
    booksInventory = JSON.parse(JSON.stringify(Gbooks));;
    console.log(Gbooks);
}

function cacheBooks(){
    // save initial books inventory in local storage
    const booksJson = JSON.stringify(booksInventory);
    localStorage.setItem('books', booksJson);
}

// count total pages
function countPages() {
    return Math.ceil(booksInventory.length / GbooksPerPage);
}

// get books for a specific page
function getBooks(page) {
    const startIndex = (page - 1) * GbooksPerPage;
    const endIndex = startIndex + GbooksPerPage;
    return booksInventory.slice(startIndex, endIndex);
}

// get book by ID
function getBookById(bookId) {
    return booksInventory.find(book => book.id === bookId);
}

// edit existing book details
function editBookDetails(bookId, newTitle, newAuthor, newPrice, newUrl) {
    const book = getBookById(bookId);
    console.log(book);
    if (!book)
        return false;

    return book.edit(newTitle, newAuthor, newPrice, newUrl);
}

// delete book by ID
function deleteBookById(bookId) {
    const bookIndex = booksInventory.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
        booksInventory.splice(bookIndex, 1);
        return true;
    }
    return false;
}

// add a new book
function addBookDetails(newTitle, newAuthor, newPrice, newUrl) {
    if (newTitle && newAuthor && !isNaN(newPrice) && newPrice >= 0 && newUrl) {
        const newId = booksInventory.length > 0 ? booksInventory[booksInventory.length - 1].id + 1 : 1;
        const newBook = new Book(newId, newTitle, newAuthor, newPrice, newUrl, 0);
        booksInventory.push(newBook);
        return booksInventory[booksInventory.length - 1];
    }
    return false;
}

// increment page number
function incrementPageNumber() {
    if (currentPage < countPages())
        currentPage++;
    else
        alert('You are already on the last page.');
}

// decrement page number
function decreasePageNumber() {
    if (currentPage > 1)
        currentPage--;
    else
        alert('You are already on the first page.');
}

// set current page number
function setPageNumber(pageNumber) {
    currentPage = pageNumber;
    if (currentPage < 1 || currentPage > countPages()) {
        alert('Invalid page number.');
        currentPage = 1;
    }
}

function setLanguage(lang) {
    currentLanguage = lang;
}

// function the resets the ids according to order of the array
function resetIds()
{
    booksInventory.forEach(book => book.id = booksInventory.indexOf(book) + 1);
}