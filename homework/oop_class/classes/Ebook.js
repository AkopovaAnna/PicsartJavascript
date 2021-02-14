const Book = require('./Book');

class Ebook extends Book {
    constructor(bookId, title, author, language, extensionType) {
        super(bookId, title, author, language);
        this.extensionType = extensionType;
        this.downloadedCount = 0;
    }

    getCount() {
        return this.downloadedCount
    }

    setCount(count) {
        this.downloadedCount = count
    }


    preview() {
        console.log("preview Ebook");
    }

    printInfo() {
        console.log(`title : ${this.title}`);
        console.log(`extensionType : ${this.extensionType}`);
    }

}


module.exports = Ebook