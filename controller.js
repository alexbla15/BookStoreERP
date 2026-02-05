'use strict';

const viewBookButtons = document.getElementsByClassName('table-cell action view');

function init() {
    getBooksFromLocalStorage();
    renderPage();
}

function renderPage(){
    currentPage = 1;
    renderTopNavBar();
    renderBookInventory();
}

function viewBook(id) {
    const book = getBookById(id);
    renderViewBook(book);
}

function viewEditBook(id) {
    const book = getBookById(id);
    renderEditBook(book);
    addFormListeners(book);
}

// edit a certain book, change the view
function editBook(bookId) {
    const book = getBookById(bookId);
    const newTitle = document.getElementById(`editTitle${bookId}`).value;
    const newAuthor = document.getElementById(`editAuthor${bookId}`).value;
    const newPrice = parseFloat(document.getElementById(`editPrice${bookId}`).value);
    const newUrl = document.getElementById(`editUrl${bookId}`).value;
    const result = editBookDetails(bookId, newTitle, newAuthor, newPrice, newUrl);
    if (result) {
        renderBooksTable();
        renderViewBook(book);
        cacheBooks();
    }
    else {
        alert('Invalid input.');
    }
}

// delete a book from inventory, change the view
function deleteBook(bookId) {
    const result = deleteBookById(bookId);
    if (result) {
        resetIds();
        renderBooksTable();
        cacheBooks();
    }
    else {
        alert('Book not found.');
    }
}

// add a book to inventory, change the view
function addBook() {
    const newTitle = document.getElementById(`addTitle`).value;
    const newAuthor = document.getElementById(`addAuthor`).value;
    const newPrice = parseFloat(document.getElementById(`addPrice`).value);
    const newUrl = document.getElementById(`addUrl`).value;
    const result = addBookDetails(newTitle, newAuthor, newPrice, newUrl);
    if (result) {
        resetIds();
        renderBooksTable();
        renderViewBook(result);
        cacheBooks();
    }
    else {
        alert('Invalid input.');
    }
}

// go to next inventory page
function goToNextPage() {
    incrementPageNumber();
    renderBooksTable();
}

// go to previous inventory page
function goToPreviousPage() {
    decreasePageNumber();
    renderBooksTable();
}

// change inventory page to a specific one
function goToPage(pageNumber) {
    setPageNumber(pageNumber);
    renderBooksTable();
}

// change language of page to a given language
function changeLanguage(lang) {
    setLanguage(lang);
    renderPage();
}

// reset data from cache
function loadData(){
    resetData();
    cacheBooks();
    console.log("DATA RESET: reading books from model.js");
    renderPage();
}

// change appearance of language picker
function languagePickerClicked(){
    const dropdown = document.getElementById('languagepickerdropdown');
    if (dropdown.classList.contains('is-active'))
    {
        dropdown.classList.remove('is-active');
    }
    else
    {
        dropdown.classList.add('is-active');
    }
}