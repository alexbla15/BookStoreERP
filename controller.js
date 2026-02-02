'use strict';

const viewBookButtons = document.getElementsByClassName('table-cell action view');

function init() {
    renderBooksTable();
}

function viewBook(id) {
    const book = getBookById(id);
    renderViewBook(book);
}

function viewEditBook(id) {
    const book = getBookById(id);
    renderEditBook(book);
}

function editBook(bookId) {
    const book = getBookById(bookId);
    const newTitle = document.getElementById(`editTitle${bookId}`).value;
    const newPrice = parseFloat(document.getElementById(`editPrice${bookId}`).value);
    const newUrl = document.getElementById(`editUrl${bookId}`).value;
    const result = editBookDetails(bookId, newTitle, newPrice, newUrl);
    if (result) {
        renderBooksTable();
        renderViewBook(book);
    }
    else {
        alert('Invalid input.');
    }
}

function deleteBook(bookId) {
    const result = deleteBookById(bookId);
    if (result) {
        renderBooksTable();
    }
    else {
        alert('Book not found.');
    }
}

function addBook() {
    const newTitle = document.getElementById(`addTitle`).value;
    const newPrice = parseFloat(document.getElementById(`addPrice`).value);
    const newUrl = document.getElementById(`addUrl`).value;
    const result = addBookDetails(newTitle, newPrice, newUrl);
    if (result) {
        renderBooksTable();
        renderViewBook(result);
    }
    else {
        alert('Invalid input.');
    }
}

function goToNextPage() {
    incrementPageNumber();
    renderBooksTable();
}

function goToPreviousPage() {
    decreasePageNumber();
    renderBooksTable();
}

function goToPage(pageNumber) {
    setPageNumber(pageNumber);
    renderBooksTable();
}

function changeLanguage(lang) {
    setLanguage(lang);
    setLanguageView();
    renderBooksTable();
}