const container = document.querySelector('.container');
const containForm = document.querySelector('.contain-form');

let myLibrary = [];

function Book(detailsOfBook) {
    this.title = detailsOfBook.title;
    this.author = detailsOfBook.author;
    this.pages = detailsOfBook.pages;
    this.read = detailsOfBook.read;
}

function addBookToLibrary() {
    resetGrid();
    // Pour chaque livre dans la librairie
    myLibrary.forEach(book => {
        // Création d'une carte
        let card = document.createElement('div');
        card.setAttribute('data-number', book.data)
        card.classList.add('card');
        container.appendChild(card);

        // Initialisation du titre
        let spanTitle = document.createElement('span');
        card.appendChild(spanTitle);
        spanTitle.textContent = book.title;

        // Initialisation du nom de l'auteur
        let spanAuthor = document.createElement('span');
        card.appendChild(spanAuthor);
        spanAuthor.textContent = book.author;

        // Initialisation du nombres de pages
        let spanPages = document.createElement('span');
        card.appendChild(spanPages);
        spanPages.textContent = book.pages;

        // Init button remove & read
        createRemoveBtn(card);
        createReadBtn(card);
    });
}

// Création du bouton remove card book
const createRemoveBtn = (card) => {
    let buttonRemove = document.createElement('button');
    buttonRemove.classList.add('btn', 'remove-book');
    buttonRemove.textContent = 'Remove';
    card.appendChild(buttonRemove);

    buttonRemove.addEventListener('click', function() {
        deleteBook(card);
    })
}
// Supprime un livre 
const deleteBook = (card) => {
    myLibrary = myLibrary.filter(book => book.data !== +card.dataset.number);    
    addBookToLibrary();
}

// Création du bouton read card book
const createReadBtn = (card) => {
    let buttonRead = document.createElement('button');
    buttonRead.classList.add('btn', 'read-or-not', 'book-unread');
    buttonRead.textContent = 'Not Read';
    card.appendChild(buttonRead);

    buttonRead.addEventListener('click', function() {
        if(buttonRead.classList[2] === 'book-unread') {
            buttonRead.classList.remove('book-unread');
            buttonRead.classList.add('book-read');
            buttonRead.textContent = 'Read';
            console.log(card.dataset.number)
            myLibrary[+card.dataset.number].read = false;
            console.log(myLibrary);
        } else {
            buttonRead.classList.add('book-unread');
            buttonRead.classList.remove('book-read');
            buttonRead.textContent = 'Not Read';
            myLibrary[+card.dataset.number].read = true;
            console.log(myLibrary);
        }
    })
}

// Changement read / unread

// Réinitialise la grille des livres
const resetGrid = () => {
    return container.innerHTML = '';
}

// Réinitialise les inputs 
const resetInput = () => {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
}
// Config button ouverture formulaire
const btnNewBook = document.querySelector('.new-book');
btnNewBook.addEventListener('click', function() {
    containForm.style.display = 'block';
    resetInput();
})

// Config button ajout de livre 
const btnValidForm = document.querySelector('.valid-form');
btnValidForm.addEventListener('click', function(e) {
    e.preventDefault();

    let detailsOfBook = {
        title: document.querySelector('#title').value,
        author: document.querySelector('#author').value,
        pages: document.querySelector('#pages').value,
        read: false
    }
    
    const book = new Book(detailsOfBook);
    myLibrary.push(book);
    
    attributeNumber();
    addBookToLibrary();
    containForm.style.display = 'none';
})

const attributeNumber = () => {
    myLibrary.forEach(book => {
        book.data = myLibrary.indexOf(book);
    })
}