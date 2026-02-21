'use strict';

//#region Constants

const GbooksPerPage = 2;

let currentLanguage = 'eng';
let tableToInject = '';

let booksInventory = [];

const apiUrl = 'http://localhost:3000/api';

//#endregion

async function apiFunc(endpoint, json, type) {
    let response = await fetch(`${apiUrl}/${endpoint}`,
        {
            method: type,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }
    );

    if (!response.ok)
    {
        const errorData = await response.json();
        alert(errorData.message);
        return null;
    }
    return response.json();
}

// general function to extract data from API
async function getFromApi(endpoint)
{
    let response = await fetch(`${apiUrl}/${endpoint}`);
    if (!response.ok)
    {
        const errorData = await response.json();
        alert(errorData.message);
        return null;
    }
    return await response.json();
}

// general function to update data from API
async function postToApi(endpoint, json)
{
    return await apiFunc(endpoint, json, 'POST');
}

// general function to update data from API
async function putToApi(endpoint, json)
{
    return await apiFunc(endpoint, json, 'PUT');
}

// general function to delete data with API
async function DeleteByApi(endpoint)
{
    let response = await fetch(`${apiUrl}/${endpoint}`,
        {
            method: 'DELETE'
        }
    );

    if (!response.ok)
    {
        const errorData = await response.json();
        alert(errorData.message);
        return null;
    }
    return response.json();
}

async function cacheBooks(){
    return await putToApi('cacheBooks', booksInventory);
}

async function addRate(bookId)
{
    return await putToApi(`addrate/${bookId}`);
}

async function decRate(bookId)
{
    return await putToApi(`decrate/${bookId}`);
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
async function editBookDetails(bookId, newTitle, newAuthor, newPrice, newUrl) {
    // construct book
    const book = {
        id: bookId,
        title: newTitle,
        author: newAuthor,
        price: newPrice,
        url: newUrl
    };

    return await putToApi(`books/${bookId}`, book);
}

// delete book by ID
async function deleteBookById(bookId) {
    return await DeleteByApi(`books/${bookId}`);
}

// edit existing book details
async function addBookDetails(newTitle, newAuthor, newPrice, newUrl) {
    // construct book
    const newId = booksInventory.length > 0 ? booksInventory[booksInventory.length - 1].id + 1 : 1;
    const book = {
        id: newId,
        title: newTitle,
        author: newAuthor,
        price: newPrice,
        url: newUrl
    };

    return await postToApi(`books`, book);
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