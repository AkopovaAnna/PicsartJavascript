class Library {
    constructor() {
        this.paperBooks = [];
        this.eBooks = [];
    }

    addPBook(pbook) {
        this.paperBooks.push(pbook)
    }

    addEBook(ebook) {
        this.eBooks.push(ebook)

    }

    getPaperBookById(paperId) {
        let paperBook = null;
        this.paperBooks.forEach(pb => {
            if (pb.bookId === paperId) {
                paperBook = pb;
            }
        });

        return paperBook;
    }

    getEBookById(eId) {
        let ebook = null;
        this.eBooks.forEach(eb => {
            if (eb.bookId === eId) {
                // result.push(eb)
                ebook = eb;
            }
        });
        return ebook;
    }

    getAllEbooks() {
        return this.eBooks;
    }

    getAllPaperBooks() {
        return this.paperBooks;
    }


    deleteBookById(id) {
        for (let i = 0; i < this.paperBooks.length; i++) {
            if (this.paperBooks[i].bookId === id) {
                this.paperBooks.splice(i, 1);
                break;
            }
        }
    }

    deleteEBookById(id) {
        for (let i = 0; i < this.eBooks.length; i++) {
            if (this.eBooks[i].bookId === id) {
                this.eBooks.splice(i, 1);
                break;
            }
        }
    }
}

module.exports = Library