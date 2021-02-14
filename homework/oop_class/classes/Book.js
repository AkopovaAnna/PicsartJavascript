class Book {
    constructor(bookId, title, author, language) {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.language = language;
    }

    preview() {
        console.log("preview book content");
    }
}

module.exports=Book