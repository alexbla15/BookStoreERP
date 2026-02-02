const GTranslator = {
    'Id':{
        'eng': 'Id',
        'rus': 'Идентификатор',
        'heb': 'מזהה'
    },
    'Title':{
        'eng': 'Title',
        'rus': 'Название',
        'heb': 'כותרת'
    },
    'Price':{
        'eng': 'Price',
        'rus': 'Цена',
        'heb': 'מחיר'
    },
    'Actions':{
        'eng': 'Actions',
        'rus': 'Действия',
        'heb': 'פעולות'
    },
    'Language':{
        'eng': 'Language',
        'rus': 'Язык',
        'heb': 'שפה'
    },
    'Load Data':{
        'eng': 'Load Data',
        'rus': 'Загрузить данные',
        'heb': 'טען נתונים'
    },
    'New Book':{
        'eng': 'New Book',
        'rus': 'Новая книга',
        'heb': 'ספר חדש'
    },
    'Book Inventory':{
        'eng': 'Book Inventory',
        'rus': 'Инвентарь книг',
        'heb': 'מלאי ספרים'
    }
}

let currentPage = 1;
let orderByField = 'id';
let orderByDirection = 1; // 1 for ascending, -1 for descending

function getTranslatedText(key) {
    return GTranslator[key][currentLanguage];
}

function renderBookInventoryHeader() {
    const header = document.getElementById('bookInventoryHeader');
    header.innerText = getTranslatedText('Book Inventory');
}

function renderActionsContainer(){
    const actionsContainer = document.getElementById('actions-container');
    const NewBookText = getTranslatedText('New Book');
    const LoadDataText = getTranslatedText('Load Data');

    actionsContainer.innerHTML = `
    <li>
        <button id="add-book-btn" class="btn btn-secondary" onclick="renderAddBook()">
            <i class="bi bi-plus-circle"></i>
            ${NewBookText}
        </button>
    </li>
    <li>
        <button class="btn btn-secondary" onclick="loadData()">
            <i class="bi bi-cloud-upload"></i>
            ${LoadDataText}
        </button>
    </li>
    <li>
        <div class="dropdown" id="languagePicker">
            <!-- <i class="bi bi-translate"></i> -->
        </div>
    </li>`;
}

function renderLanguagePicker(){
    const picker = document.getElementById('languagePicker');
    const value = `${getTranslatedText('Language')}: ${currentLanguage === 'eng' ? 'English' : currentLanguage === 'rus' ? 'Russian' : 'עברית'}`;

    const engActive = currentLanguage === 'eng' ? 'dropdown-item active' : 'dropdown-item';
    const rusActive = currentLanguage === 'rus' ? 'dropdown-item active' : 'dropdown-item';
    const hebActive = currentLanguage === 'heb' ? 'dropdown-item active' : 'dropdown-item';

    picker.innerHTML = `
    <button class="btn btn-secondary dropdown-toggle" type="button"
        data-bs-toggle="dropdown" aria-expanded="false" id="chosenLanguage">
        ${value}
    </button>
    <ul class="dropdown-menu dropdown-menu-dark">
        <li><button class="${engActive}" index="engLan" onclick="changeLanguage('eng')">English</button></li>
        <li><button class="${rusActive}" index="rusLan" onclick="changeLanguage('rus')">Russian</button></li>
        <li><button class="${hebActive}" index="hebLan" onclick="changeLanguage('heb')">Hebrew</button></li>
    </ul>
    `;

    if (currentLanguage == 'heb') {
        document.documentElement.dir = "rtl";
    } else {
        document.documentElement.dir = "ltr";
    }
}

//#region Table Rendering

// get table headers with sorting indicators
function getTableHeaders() {
    const idKey = getTranslatedText('Id');
    const titleKey = getTranslatedText('Title');
    const priceKey = getTranslatedText('Price');
    const actionsKey = getTranslatedText('Actions');

    // Add sort indicator
    const idSort = orderByField === 'id' ? (orderByDirection === 1 ? '▲' : '▼') : '';
    const titleSort = orderByField === 'title' ? (orderByDirection === 1 ? '▲' : '▼') : '';
    const priceSort = orderByField === 'price' ? (orderByDirection === 1 ? '▲' : '▼') : '';

    let tableHeaders = `<thead>
        <tr class="table-dark">
            <th class="table-header" onclick="orderBy('id')">${idKey} <span class="orderby"><i class="bi bi-funnel"></i>${idSort}</span></th>
            <th class="table-header" onclick="orderBy('title')">${titleKey} <span class="orderby"><i class="bi bi-funnel"></i>${titleSort}</span></th>
            <th class="table-header" onclick="orderBy('price')">${priceKey} <span class="orderby"><i class="bi bi-funnel"></i>${priceSort}</span></th>
            <th colspan="3" class="table-header">${actionsKey}</th>
        </tr>
    </thead>`;
    return tableHeaders;
}

// set order by field and direction, then re-render table
function orderBy(field) {
    if (orderByField === field) {
        orderByDirection *= -1; // Toggle direction
    } else {
        orderByField = field;
        orderByDirection = 1;
    }
    renderBooksTable();
}

// render books table with pagination and sorting
function renderBooksTable() {
    renderBookInventoryHeader();

    // Get all books, sort, then paginate
    let allBooks = booksInventory ? booksInventory.slice() : [];
    if (orderByField && allBooks.length > 0) {
        allBooks.sort((a, b) => {
            let valA = a[orderByField];
            let valB = b[orderByField];
            if (typeof valA === 'string') valA = valA.toLowerCase();
            if (typeof valB === 'string') valB = valB.toLowerCase();
            if (valA < valB) return -1 * orderByDirection;
            if (valA > valB) return 1 * orderByDirection;
            return 0;
        });
    }
    const startIndex = (currentPage - 1) * (window.GbooksPerPage || 3);
    const endIndex = startIndex + (window.GbooksPerPage || 3);
    let books = allBooks.slice(startIndex, endIndex);

    let tableToInject = '<tbody>';
    books.forEach(book => {
        tableToInject += `
        <tr class="table-dark">
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td><button class="btn btn-primary btn-sm" onclick="viewBook(${book.id})">
                <i class="bi bi-eyeglasses"></i>
            </button></td>
            <td><button class="btn btn-primary btn-sm" onclick="viewEditBook(${book.id})">
                <i class="bi bi-pencil-square"></i>
            </button></td>
            <td><button class="btn btn-danger btn-sm" onclick="deleteBook(${book.id})">
                <i class="bi bi-trash"></i>
            </button></td>
        </tr>
        `
    });
    tableToInject += '</tbody>';
    const tableRows = document.getElementById('bookInventory');
    if (tableRows) {
        tableRows.innerHTML = getTableHeaders() + tableToInject;
    }
    renderPaginator();
}

// render paginator based on number of pages
function renderPaginator() {
    const paginator = document.getElementById('paginator');

    // amount of pages in this table
    const pages = countPages();

    if (pages === 0) 
        return;

    const disableGoBack = currentPage > 1 ? '' : 'disabled';
    const disableGoForward = currentPage < pages ? '' : 'disabled';
    
    // add previous button
    paginator.innerHTML = `<li class="page-item ${disableGoBack}">
                        <button class="page-link" aria-label="Previous" onclick="goToPreviousPage()">
                            <span aria-hidden="true"><i class="bi bi-caret-left-fill"></i></span>
                        </button>
                    </li>`;

    // add pages
    for (let i = 1; i <= pages; i++) {
        const activeClass = currentPage === i ? 'active' : '';
        paginator.innerHTML += `
        <li class="page-item">
            <button class="page-link ${activeClass}" onclick="goToPage(${i})">${i}</a>
        </li>`;
    }

    // add forward button
    paginator.innerHTML += `<li class="page-item ${disableGoForward}">
                        <button class="page-link" aria-label="Next" onclick="goToNextPage()">
                            <span aria-hidden="true"><i class="bi bi-caret-right-fill"></i></span>
                        </button>
                    </li>`;
}

//#endregion

//#region Action Section - View / Edit / Add Book

// render view book details
function renderViewBook(book) {
    const actionSection = document.getElementById('action-section');

    actionSection.innerHTML = `
<div class="card text-bg-light mb-3">
    <div class="card-header">
        <h4 class="card-title">${book.title}</h4>
    </div>
    <div class="card-body container">
        <div class="container d-flex column-gap-4">
            <div class="col">
                <img src="${book.url}" alt="${book.title} Cover" class="img-fluid rounded" alt="${book.title} Cover">
            </div>
            <div class="col">
                <p class="card-text"><u>Price</u>: $${book.price}</p>
                <p class="card-text" id="rate_${book.id}"><u>Rate</u>: </p>
                <div class="container d-flex column-gap-2">
                    <button class="col btn btn-success btn-sm" onclick="addRateView(${book.id})">
                        <i class="bi bi-plus"></i>
                    </button>
                    <button class="col btn btn-danger btn-sm" onclick="decRateView(${book.id})">
                        <i class="bi bi-dash"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
`;

    const bookRate = document.getElementById(`rate_${book.id}`);
    for (let i = 0; i < book.rate; i++) {
        bookRate.innerHTML += `<i class="bi bi-star-fill"></i>`;
    }
}

// render book title input
function renderBookTitle(book) {
    const id = book.id ? `editTitle${book.id}` : `addTitle`;

    return `<div class="input-group mb-3">
                <span class="input-group-text"><i class="bi bi-alphabet-uppercase"></i></span>
                <div class="form-floating">
                    <input required type="text" class="form-control" id="${id}" placeholder="Title" value="${book.title}">
                    <label for="${id}">Title</label>
                </div>
            </div>`;
}

// increase book rate and re-render view
function addRateView(bookId) {
    const book = getBookById(bookId);
    addRate(book);
    renderViewBook(book);
    cacheBooks();
}

// decrease book rate and re-render view
function decRateView(bookId) {
    const book = getBookById(bookId);
    decRate(book);
    renderViewBook(book);
    cacheBooks();
}

// render book price input
function renderBookPrice(book) {
    const id = book.id ? `editPrice${book.id}` : `addPrice`;

    return `<div class="input-group has-validation mb-3">
                <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
                <div class="form-floating">
                    <input required type="number" class="form-control" id="${id}" placeholder="Price" value="${book.price}">
                    <label for="${id}">Price</label>
                </div>
            </div>`;
}

// render book url input
function renderBookUrl(book) {
    const id = book.id ? `editUrl${book.id}` : `addUrl`;

    return `<div class="input-group has-validation mb-3">
                <span class="input-group-text"><i class="bi bi-link-45deg"></i></span>
                <textarea class="form-control" placeholder="Url" aria-label="EditUrl" id="${id}" required>${book.url}</textarea>
            </div>`;
}

// render submit button for edit or add
function renderSubmitButton(book) {
    if (book.id)
        return `<button type="button" class="btn btn-primary" onclick="editBook(${book.id})">Submit</button>`;
    else
        return `<button type="button" class="btn btn-primary" onclick="addBook()">Submit</button>`;
}

// render edit book form
function renderEditBook(book) {
    const actionSection = document.getElementById('action-section');

    actionSection.innerHTML = `
<div class="card text-bg-light mb-3">
    <div class="card-header">
        <h4 class="card-title">Edit: ${book.title}</h4>
    </div>
    <div class="card-body">
        <form class="was-validated">` 
        + 
        renderBookTitle(book) +
        renderBookPrice(book) +
        renderBookUrl(book) +
        renderSubmitButton(book) +
        `
        </form>
    </div>
</div>
`;
}

// render add book form
function renderAddBook() {
    const actionSection = document.getElementById('action-section');

    const book = {
        id: '',
        title: '',
        price: '',
        url: '',
        rate: 0
    };

    actionSection.innerHTML = `
<div class="card text-bg-light mb-3">
    <div class="card-header">
        <h4 class="card-title">New Book</h4>
    </div>
    <div class="card-body">
        <form class="was-validated">` 
        + 
        renderBookTitle(book) +
        renderBookPrice(book) +
        renderBookUrl(book) +
        renderSubmitButton(book) +
        `
        </form>
    </div>
</div>
`;
}

//#endregion
