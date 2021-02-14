const Library = require("../classes/Library")

class LibraryService {
    constructor() {
        this.library = new Library();
    }

    getLibrary() {
        return this.library;
    }

    download(ebookId) {
        let ebook = this.library.getEBookById(ebookId);
        let downloadedCount = ebook.getCount();
        ebook.setCount(++downloadedCount)
    }

    checkIn(paperBookId) {
        let pbook = this.library.getPaperBookById(paperBookId);
        let numberOfCopies = pbook.getCopies();
        pbook.setCopies(++numberOfCopies);
    }

    checkOut(paperBookId) {
        let pbook = this.library.getPaperBookById(paperBookId);
        let numberOfCopies = pbook.getCopies();
        if (numberOfCopies > 0) {
            pbook.setCopies(--numberOfCopies);
        } else {
            console.log("book is not available")
        }
    }
}

module.exports = LibraryService