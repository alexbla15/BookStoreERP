'use strict';

const viewBookButtons = document.getElementsByClassName('table-cell action view');

async function init() {
    booksInventory = await getFromApi('books');
    console.log('INIT', booksInventory);
    if (booksInventory)
    {
        renderPage();
    }
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
async function editBook(bookId) {
    let book = getBookById(bookId);
    const newTitle = document.getElementById(`editTitle${bookId}`).value;
    const newAuthor = document.getElementById(`editAuthor${bookId}`).value;
    const newPrice = parseFloat(document.getElementById(`editPrice${bookId}`).value);
    const newUrl = document.getElementById(`editUrl${bookId}`).value;
    const result = await editBookDetails(bookId, newTitle, newAuthor, newPrice, newUrl);
    if (result) {
        // refresh data
        booksInventory = await getFromApi('books');
        book = getBookById(bookId);
        renderPage();
        renderViewBook(book);
    }
}

// delete a book from inventory, change the view
async function deleteBook(bookId) {
    console.log(`DELETE ${bookId}`);
    const result = await deleteBookById(bookId);
    if (result) {
        booksInventory = await getFromApi('books');
        renderBookInventory();
    }
    else {
        alert('Book not found.');
    }
}

// add a book to inventory, change the view
async function addBook() {
    const newTitle = document.getElementById(`addTitle`).value;
    const newAuthor = document.getElementById(`addAuthor`).value;
    const newPrice = parseFloat(document.getElementById(`addPrice`).value);
    const newUrl = document.getElementById(`addUrl`).value;
    const result = addBookDetails(newTitle, newAuthor, newPrice, newUrl);
    if (result) {
        // refresh data
        booksInventory = await getFromApi('books');
        let book = booksInventory[booksInventory.length - 1];
        renderPage();
        renderViewBook(book);
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
async function loadData(){
    booksInventory = await getFromApi('resetBooks');
    console.log('RESET DATA', booksInventory);
    const cacheOk = await cacheBooks();
    if (cacheOk)
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