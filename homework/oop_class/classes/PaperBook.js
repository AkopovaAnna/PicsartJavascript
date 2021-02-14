const Book = require('./Book');

class PaperBook extends Book {
    constructor(bookId, title, author, language, material, numberOfCopies) {
        super(bookId, title, author, language);
        this.material = material;
        this.numberOfCopies = numberOfCopies;
    }

    getCopies() {
        return this.numberOfCopies;
    }

    setCopies(count) {
        this.numberOfCopies = count;
    }

    preview() {
        console.log("preview pbook in library");
    }

    printInfo() {
        console.log(`title : ${this.title}`);
        console.log(`material : ${this.material}`);
        console.log(`numberOfCopies : ${this.numberOfCopies}`);
    }
}

module.exports=PaperBook