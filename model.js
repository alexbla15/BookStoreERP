'use strict';

// model constants and variable

const GbooksPerPage = 2;
let currentLanguage = 'eng';
let tableToInject = '';

// initialize book data
let Gbooks = [
    {
        id: 1,
        title: "The Great Gatsby",
        price: 10.99,
        url: "https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg",
        rate: 1
    },
    {
        id: 2,
        title: "1984",
        price: 8.99,
        url: "https://upload.wikimedia.org/wikipedia/commons/5/51/1984_first_edition_cover.jpg",
        rate: 2
    },
    {
        id: 3,
        title: "To Kill a Mockingbird",
        price: 12.49,
        url: "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
        rate: 3
    },
    {
        id: 4,
        title: "Pride and Prejudice",
        price: 9.99,
        url: "https://upload.wikimedia.org/wikipedia/commons/1/17/PrideAndPrejudiceTitlePage.jpg",
        rate: 4
    },
    {
        id: 5,
        title: "The Catcher in the Rye",
        price: 11.50,
        url: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Catcher-in-the-rye-red-cover.jpg",
        rate: 5
    }
];

// count total pages
function countPages() {
    return Math.ceil(Gbooks.length / GbooksPerPage);
}

// get books for a specific page
function getBooks(page) {
    const startIndex = (page - 1) * GbooksPerPage;
    const endIndex = startIndex + GbooksPerPage;
    return Gbooks.slice(startIndex, endIndex);
}

// get book by ID
function getBookById(bookId) {
    return Gbooks.find(book => book.id === bookId);
}

// increase book rate
function addRate(book) {
    if (book.rate < 5) {
        book.rate += 1;
    }
}

// decrease book rate
function decRate(book) {
    if (book.rate > 0) {
        book.rate -= 1;
    }
}

// edit existing book details
function editBookDetails(bookId, newTitle, newPrice, newUrl) {
    const book = getBookById(bookId);
    if (book && newTitle && !isNaN(newPrice) && newPrice >= 0 && newUrl) {
        book.title = newTitle;
        book.price = newPrice;
        book.url = newUrl;
        return true;
    }

    return false;
}

// delete book by ID
function deleteBookById(bookId) {
    const bookIndex = Gbooks.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
        Gbooks.splice(bookIndex, 1);
        return true;
    }
    return false;
}

// add a new book
function addBookDetails(newTitle, newPrice, newUrl) {
    if (newTitle && !isNaN(newPrice) && newPrice >= 0 && newUrl) {
        const newBook = {
            id: Gbooks.length > 0 ? Gbooks[Gbooks.length - 1].id + 1 : 1,
            title: newTitle,
            price: newPrice,
            url: newUrl,
            rate: 0
        };
        Gbooks.push(newBook);
        return Gbooks[Gbooks.length - 1];
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