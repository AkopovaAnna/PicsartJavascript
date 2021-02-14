const PaperBook = require('./classes/PaperBook');
const Ebook = require('./classes/Ebook');
const LibraryService = require('./service/LibraryService');

let libraryService = new LibraryService();
let libraryStorage = libraryService.getLibrary();

function createData(libraryStorage, libraryService) {
    let harryPotter = new PaperBook(1, "Harry Potter", "Rawling", "eng", "hard", 3);
    let vardananq = new PaperBook(2, "Vardananq", "Demirtchyan", "arm", "hard", 1);
    libraryStorage.addPBook(harryPotter);
    libraryStorage.addPBook(vardananq);

    let jsForBeginners = new Ebook(1, "Js or Beginners", "Oreilly", "eng", "pdf")
    let javaAdvanced = new Ebook(2, "Java for Advanced", "Oreilly", "eng", "pdf")
    libraryStorage.addEBook(jsForBeginners);
    libraryStorage.addEBook(javaAdvanced);


    libraryService.download(1);
    libraryService.download(1);
    console.log(jsForBeginners.downloadedCount)

    libraryService.checkOut(1);
    libraryService.checkOut(2);
    console.log(harryPotter.numberOfCopies);
    console.log(vardananq.numberOfCopies);

    libraryService.checkIn(1)
    console.log(harryPotter.numberOfCopies);


    let ebooks = libraryStorage.getAllEbooks();
    console.log(ebooks);

    let pbooks = libraryStorage.getAllPaperBooks();
    console.log(pbooks);

    harryPotter.preview()
    jsForBeginners.preview()

    vardananq.printInfo();
    javaAdvanced.printInfo()

}

createData(libraryStorage, libraryService);