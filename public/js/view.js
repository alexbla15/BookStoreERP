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
    'Author':{
        'eng': 'Author',
        'rus': 'Автор',
        'heb': 'מחבר/ת'
    },
    'Price':{
        'eng': 'Price',
        'rus': 'Цена',
        'heb': 'מחיר'
    },
    'Rate':{
        'eng': 'Rate',
        'rus': 'рейтинг',
        'heb': 'דירוג'
    },
    'Url':{
        'eng': 'Url',
        'rus': 'Url',
        'heb': 'Url'
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
    'Edit Book':{
        'eng': 'Edit Book',
        'rus': 'Редактирование',
        'heb': 'עריכת ספר'
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
    },
    'Submit':{
        'eng': 'Submit',
        'rus': 'подавать',
        'heb': 'אישור'
    },
    'Required':{
        'eng': 'Required.',
        'rus': 'Необходимый.',
        'heb': 'נדרש.'
    },
    'RequiredPrice':{
        'eng': 'Required. Please enter a positive price.',
        'rus': 'Обязательно. Пожалуйста, введите фактическую цену.',
        'heb': 'נדרש. אנא הזן מחיר מציאותי.'
    }
}

const GTitle = "Bookshop ERP";

let currentPage = 1;
let orderByField = 'id';
let orderByDirection = 1; // 1 for ascending, -1 for descending

function getTranslatedText(key) {
    return GTranslator[key][currentLanguage];
}

//#region Top Nav Bar Rendering

function renderTopNavBar()
{
    const topnavbar = document.getElementById('topnavbar');

    topnavbar.innerHTML = `
    <div class="navbar-brand">
        <a class="navbar-item is-size-4" href="/">
            <i class="fa-solid fa-book"></i>
            ${GTitle}
        </a>
    </div>
    <div class="navbar-end">
        <div class="navbar-item" id="actions-container">
            
        </div>
    </div>`;

    renderActionsContainer();
    renderLanguagePicker();
}

function renderActionsContainer(){
    const actionsContainer = document.getElementById('actions-container');
    const NewBookText = getTranslatedText('New Book');
    const LoadDataText = getTranslatedText('Load Data');

    actionsContainer.innerHTML = `
    <div class="field is-grouped">
        <p class="control">
            <button class="bd-tw-button button is-light" id="add-book-btn" onclick="renderAddBook()">
            <span class="icon">
                <i class="fa-solid fa-circle-plus has-text-primary-35"></i>
            </span>
            <span> ${NewBookText} </span>
            </button>
        </p>
        <p class="control">
            <button class="bd-tw-button button is-light" id="add-book-btn" onclick="loadData()">
            <span class="icon">
                <i class="fa-solid fa-download has-text-primary-35"></i>
            </span>
            <span> ${LoadDataText} </span>
            </a>
            </button>
        </p>
        <p class="control" id="languagePicker">
        </p>
    </div>`;
}

function renderLanguagePicker(){
    const picker = document.getElementById('languagePicker');
    const value = `${getTranslatedText('Language')}: ${currentLanguage === 'eng' ? 'English' : currentLanguage === 'rus' ? 'Russian' : 'עברית'}`;

    const engActive = currentLanguage === 'eng' ? 'dropdown-item is-active' : 'dropdown-item';
    const rusActive = currentLanguage === 'rus' ? 'dropdown-item is-active' : 'dropdown-item';
    const hebActive = currentLanguage === 'heb' ? 'dropdown-item is-active' : 'dropdown-item';

    picker.innerHTML=`
    <div class="dropdown" id="languagepickerdropdown" onclick="languagePickerClicked()">
        <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                <span class="icon">
                    <i class="fa-solid fa-language has-text-primary-35"></i>
                </span>
                <span>${value}</span>
                <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
            </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
                <button class="${engActive}" index="engLan" onclick="changeLanguage('eng')">English</button>
                <button class="${rusActive}" index="rusLan" onclick="changeLanguage('rus')">Russian</button>
                <button class="${hebActive}" index="hebLan" onclick="changeLanguage('heb')">Hebrew</button>
            </div>
        </div>
    </div>`;

    if (currentLanguage == 'heb') {
        document.documentElement.dir = "rtl";
    } else {
        document.documentElement.dir = "ltr";
    }
}

//#endregion

//#region Table Rendering

function renderBookInventoryHeader() {
    const header = document.getElementById('bookInventoryHeader');
    header.innerText = getTranslatedText('Book Inventory');
}

function renderBookInventory(){
    const table = document.getElementById('bookInventoryTableAndActions');

    table.innerHTML = `
        <div class="columns">
            <div class="column is-two-thirds">
                <div class="card">
                    <header class="card-header">
                        <div class="card-header-title is-size-5" id="bookInventoryHeader"></div>
                    </header>
                    <div class="card-content">
                        <div class="card">
                            <table id="bookInventory" class="table is-hoverable is-striped is-fullwidth">
                                <!-- RENDERED BY VIEW.JS -->
                            </table>
                        </div>
                    </div>
                    <div class="card-footer">
                        <p class="card-footer-item" id="paginator">
                        </p>
                    </div>
                </div>
            </div>

            <section class="column" id="action-section">
                <!-- RENDERED BY VIEW.JS -->
            </section>
        </div>
    `;

    renderBookInventoryHeader();
    renderBooksTable();
}

// get table headers with sorting indicators
function getTableHeaders() {
    const idKey = getTranslatedText('Id');
    const titleKey = getTranslatedText('Title');
    const authorKey = getTranslatedText('Author');
    const priceKey = getTranslatedText('Price');
    const actionsKey = getTranslatedText('Actions');

    // Add sort indicator
    const idSort = sortIcon('id');
    const titleSort = sortIcon('title');
    const authorSort = sortIcon('author');
    const priceSort = sortIcon('price');

    const buttonClass = `button is-primary is-light is-small is-rounded`;

    let tableHeaders = `<thead>
        <tr class="is-primary">
            <th class="is-flex-wrap-nowrap">${idKey} <button class="${buttonClass}" onclick="orderBy('id')">${idSort}</button></th>
            <th>${titleKey} <button class="${buttonClass}" onclick="orderBy('title')">${titleSort}</button></th>
            <th>${authorKey} <button class="${buttonClass}" onclick="orderBy('author')">${authorSort}</button></th>
            <th>${priceKey} <button class="${buttonClass}" onclick="orderBy('price')">${priceSort}</button></th>
            <th colspan="3" class="table-header">${actionsKey}</th>
        </tr>
    </thead>`;
    return tableHeaders;
}

function sortIcon(field)
{
    // const iconColor = `has-text-primary-light`;
    const iconColor = ``;
    const sortUpIcon = `<i class="fa-solid ${iconColor} fa-arrow-up-wide-short"></i>`;
    const sortDownIcon = `<i class="fa-solid ${iconColor} fa-arrow-down-short-wide"></i>`;
    const filterIcon = `<i class="fa-solid ${iconColor} fa-filter"></i>`;

    return orderByField === field ? (orderByDirection === 1 ? sortDownIcon :  sortUpIcon) : filterIcon;
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
    const startIndex = (currentPage - 1) * GbooksPerPage;
    const endIndex = startIndex + GbooksPerPage;
    let books = allBooks.slice(startIndex, endIndex);

    let tableToInject = '<tbody>';
    books.forEach(book => {
        tableToInject += `
        <tr class="table-dark">
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.price}</td>
            <td><button class="button is-info btn-sm" onclick="viewBook(${book.id})">
                <i class="fa-solid fa-glasses"></i>
            </button></td>
            <td><button class="button is-warning btn-sm" onclick="viewEditBook(${book.id})">
                <i class="fa-solid fa-pen-to-square"></i>
            </button></td>
            <td><button class="button is-danger btn-sm" onclick="deleteBook(${book.id})">
                <i class="fa-solid fa-trash"></i>
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

function renderPaginatorPage(activeClass, pageNumber){
    return `
    <li>
        <button class="button ${activeClass}" aria-label="Page ${pageNumber}" 
        aria-current="page" onclick="goToPage(${pageNumber})">${pageNumber}</button>
    </li>`
}

// render paginator based on number of pages
function renderPaginator() {
    const paginator = document.getElementById('paginator');

    paginator.innerHTML = ``;

    // amount of pages in this table
    const pages = countPages();

    if (pages <= 1) 
        return;

    const disableGoBack = currentPage > 1 ? '' : 'is-disabled';
    const disableGoForward = currentPage < pages ? '' : 'is-disabled';
    
    // add pages
    let paginationList = ``;
    let activeClass = currentPage === 1 ? 'is-current has-background-primary' : '';
    paginationList += `
            ${renderPaginatorPage(activeClass, 1)}
            <li><span class="pagination-ellipsis">&hellip;</span></li>`;

    // index for middle paginator numbers
    const middleMinIndex = Math.ceil(pages / 2);

    if (middleMinIndex < pages && middleMinIndex != 1)
    {
        activeClass = currentPage === middleMinIndex ? 'is-current has-background-primary' : '';
        paginationList += renderPaginatorPage(activeClass, middleMinIndex);
    }

    activeClass = currentPage === pages ? 'is-current has-background-primary' : '';
    paginationList += `
            <li><span class="pagination-ellipsis">&hellip;</span></li>
            ${renderPaginatorPage(activeClass, pages)}`;

    paginator.innerHTML = `
    <nav class="pagination is-centered" role="navigation" aria-label="pagination">
        <a class="pagination-previous ${disableGoBack}" onclick="goToPage(1)"><i class="fa-solid fa-backward-fast"></i></a>
        <a class="pagination-previous ${disableGoBack}" onclick="goToPreviousPage()"><i class="fa-solid fa-backward-step"></i></a>
        <a class="pagination-next ${disableGoForward}" onclick="goToNextPage()"><i class="fa-solid fa-forward"></i></a>
        <a class="pagination-next ${disableGoForward}" onclick="goToPage(${pages})"><i class="fa-solid fa-forward-fast"></i></a>
        <ul class="pagination-list">
            ${paginationList}
        </ul>
    </nav>`

}

//#endregion

//#region Action Section - View / Edit / Add Book

// render view book details
function renderViewBook(book) {
    const actionSection = document.getElementById('action-section');

    actionSection.innerHTML = `
<div class="card is-clipped">
    <div class="card-content">
        <div class="columns">
        <div class="column">
            <figure class="image">
            <img src="${book.url}" alt="${book.title}"/>
            </figure>
        </div>
        <div class="column">
            <p class="title is-4">${book.title}</p>
            <p class="subtitle is-6 has-text-info">@${book.author}</p>
            <p class="card-text"><span class="has-text-weight-semibold">${getTranslatedText('Price')}</span>: $${book.price}</p>
            <p class="card-text" id="rate_${book.id}"><span class="has-text-weight-semibold">${getTranslatedText('Rate')}</span>: </p>
            <div class="buttons mt-2">
                <button class="button is-success is-small" onclick="addRateView(${book.id})">
                    <span class="icon is-small"><i class="fa-solid fa-thumbs-up"></i></span>
                </button>
                <button class="button is-danger is-small" onclick="decRateView(${book.id})">
                    <span class="icon is-small"><i class="fa-solid fa-thumbs-down"></i></i></span>
                </button>
            </div>
        </div>
    </div>
</div>
`;

    const bookRate = document.getElementById(`rate_${book.id}`);
    for (let i = 0; i < Math.floor(book.rate); i++) {
        bookRate.innerHTML += `<i class="fa-solid fa-star has-text-info"></i>`;
    }

    if (book.rate - Math.floor(book.rate) == 0.5)
    {
        bookRate.innerHTML += `<i class="fa-solid fa-star-half-stroke has-text-info"></i>`;
    }
}

function addBookTitleListener(book){
    const id = book.id ? `editTitle${book.id}` : `addTitle`;
    const input = document.getElementById(id);
    const icon = document.getElementById(`${id}ValidationIcon`);
    const help = document.getElementById(`${id}Help`);
    

    input.addEventListener('input', (e) => {
        if (e.target.value.trim() === "")
        {
            input.classList.remove('is-success');
            input.classList.add('is-danger');
            icon.className = 'fa-solid fa-triangle-exclamation';
            help.innerText = getTranslatedText('Required');
        }
        else
        {
            input.classList.add('is-success');
            input.classList.remove('is-danger');
            icon.className = 'fas fa-check';
            help.innerText = '';
        }
    })
}

function addBookAuthorListener(book){
    const id = book.id ? `editAuthor${book.id}` : `addAuthor`;
    const input = document.getElementById(id);
    const icon = document.getElementById(`${id}ValidationIcon`);
    const help = document.getElementById(`${id}Help`);

    input.addEventListener('input', (e) => {
        if (e.target.value.trim() === "")
        {
            input.classList.remove('is-success');
            input.classList.add('is-danger');
            icon.className = 'fa-solid fa-triangle-exclamation';
            help.innerText = getTranslatedText('Required');;
        }
        else
        {
            input.classList.add('is-success');
            input.classList.remove('is-danger');
            icon.className = 'fas fa-check';
            help.innerText = '';
        }
    })
}

function addBookPriceListener(book){
    const id = book.id ? `editPrice${book.id}` : `addPrice`;
    const input = document.getElementById(id);
    const icon = document.getElementById(`${id}ValidationIcon`);
    const help = document.getElementById(`${id}Help`);

    input.addEventListener('input', (e) => {
        if (e.target.value.trim() === "" || e.target.value < 0)
        {
            input.classList.remove('is-success');
            input.classList.add('is-danger');
            icon.className = 'fa-solid fa-triangle-exclamation';
            help.innerText = getTranslatedText('RequiredPrice');
        }
        else
        {
            input.classList.add('is-success');
            input.classList.remove('is-danger');
            icon.className = 'fas fa-check';
            help.innerText = '';
        }
    })
}

function addBookUrlListener(book){
    const id = book.id ? `editUrl${book.id}` : `addUrl`;
    const input = document.getElementById(id);
    const help = document.getElementById(`${id}Help`);
    const icon = document.getElementById(`${id}ValidationIcon`);
    
    input.addEventListener('input', (e) => {
        if (e.target.value.trim() === "")
        {
            input.classList.remove('is-success');
            input.classList.add('is-danger');
            help.innerText = 'Required.';
            icon.className = 'fa-solid fa-triangle-exclamation';
        }
        else
        {
            input.classList.add('is-success');
            input.classList.remove('is-danger');
            help.innerText = '';
            icon.className = 'fas fa-check';
        }
    });
}

// render book title input
function renderBookTitle(book) {
    const id = book.id ? `editTitle${book.id}` : `addTitle`;

    return `
    <div class="field">
        <div class="control has-icons-left has-icons-right">
            <input class="input is-success" id="${id}" type="text" placeholder="${getTranslatedText('Title')}" value="${book.title}">
            <span class="icon is-small is-left">
                <i class="fa-solid fa-at"></i>
            </span>
            <span class="icon is-small is-right">
                <i id="${id}ValidationIcon" class="fas fa-check"></i>
            </span>
        </div>
        <p class="help is-danger" id="${id}Help"></p>
    </div>`;
}

// render book author input
function renderAuthor(book) {
    const id = book.id ? `editAuthor${book.id}` : `addAuthor`;

    return `
    <div class="field">
        <div class="control has-icons-left has-icons-right">
            <input class="input is-success" id="${id}" type="text" placeholder="${getTranslatedText('Author')}" value="${book.author}">
            <span class="icon is-small is-left">
                <i class="fa-solid fa-user-graduate"></i>
            </span>
            <span class="icon is-small is-right">
                <i id="${id}ValidationIcon" class="fas fa-check"></i>
            </span>
        </div>
        <p class="help is-danger" id="${id}Help"></p>
    </div>`;
}

// increase book rate and re-render view
async function addRateView(bookId) {
    const book = await addRate(bookId);
    if (book)
    {
        console.log(book);
        renderViewBook(book);
    }
}

// decrease book rate and re-render view
async function decRateView(bookId) {
    const book = await decRate(bookId);
    if (book)
    {
        console.log(book);
        renderViewBook(book);
    }
}

// render book price input
function renderBookPrice(book) {
    const id = book.id ? `editPrice${book.id}` : `addPrice`;

    return `
    <div class="field">
        <div class="control has-icons-left has-icons-right">
            <input class="input is-success" id="${id}" type="number" placeholder="${getTranslatedText('Price')}" value="${book.price}">
            <span class="icon is-small is-left">
                <i class="fa-solid fa-dollar-sign"></i>
            </span>
            <span class="icon is-small is-right">
                <i id="${id}ValidationIcon" class="fas fa-check"></i>
            </span>
        </div>
        <p class="help is-danger" id="${id}Help"></p>
    </div>`;
}

// render book url input
function renderBookUrl(book) {
    const id = book.id ? `editUrl${book.id}` : `addUrl`;

    return `
    <div class="field">
        <div class="control has-icons-left has-icons-right">
            <input class="input is-success" id="${id}" type="text" placeholder="${getTranslatedText('Url')}" value="${book.url}">
            <span class="icon is-small is-left">
                <i class="fas fa-upload"></i>
            </span>
            <span class="icon is-small is-right">
                <i id="${id}ValidationIcon" class="fas fa-check"></i>
            </span>
        </div>
        <p class="help is-danger" id="${id}Help"></p>
    </div>`;
}

// render submit button for edit or add
function renderSubmitButton(book) {
    let btn = book.id ? 
        `<button class="button is-primary" onclick="editBook(${book.id})">${getTranslatedText('Submit')}</button>` :
        `<button class="button is-primary" onclick="addBook()">${getTranslatedText('Submit')}</button>`;

    return `
    <div class="field">
        <div class="control">
        ${btn}
        </div>
    </div>`;
}

// render edit book form
function renderEditBook(book) {
    const actionSection = document.getElementById('action-section');

    actionSection.innerHTML = `
<div class="card">
    <header class="card-header">
        <div class="card-header-title is-size-5">${getTranslatedText('Edit Book')}</div>
    </header>
    <div class="card-content">` 
        + 
        renderBookTitle(book) +
        renderAuthor(book) +
        renderBookPrice(book) +
        renderBookUrl(book) +
        renderSubmitButton(book) 
        +
        `
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
        author: '',
        price: '',
        url: '',
        rate: 0
    };

    actionSection.innerHTML = `
<div class="card">
    <header class="card-header">
        <div class="card-header-title is-size-5">${getTranslatedText('New Book')}</div>
    </header>
    <div class="card-content">` 
        + 
        renderBookTitle(book) +
        renderAuthor(book) +
        renderBookPrice(book) +
        renderBookUrl(book) +
        renderSubmitButton(book) 
        +
        `
    </div>
</div>
`;

    addFormListeners(book);
}

function addFormListeners(book){
    addBookTitleListener(book);
    addBookAuthorListener(book);
    addBookPriceListener(book);
    addBookUrlListener(book);
}

//#endregion
