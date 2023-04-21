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
        let buttonRead = document.createElement('button');
        buttonRead.classList.add('btn', 'read-or-not');
        buttonRead.textContent = 'Not Read';
        card.appendChild(buttonRead);
        createRemoveBtn(card);
        if(book.read) {
            buttonRead.textContent = 'Read';
            buttonRead.classList.toggle('book-read');
        }

        buttonRead.addEventListener('click', function() {
            toggleRead(book);
            attributeNumber();
            buttonRead.classList.toggle('book-read');
            if(buttonRead.classList[2] === 'book-read') {
                buttonRead.textContent = 'Read';
            } else {
                buttonRead.textContent = 'Not Read';
            }
        })
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
        attributeNumber();
    })
}
// Supprime un livre 
const deleteBook = (card) => {
    myLibrary = myLibrary.filter(book => book.data !== +card.dataset.number);    
    addBookToLibrary();
}

// Création du bouton read card book

// Changement read / unread
const toggleRead = (card) => {
    if(!card.read) {        
        card.read = true;
    } else {
        card.read = false;
    }
}

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
