const promisify = (callback) => (...args) => {

    if (typeof callback !== 'function') {
        throw new Error("not a function");
    }

    return new Promise((resolve, reject) => {
        callback(...args, (err, data) => {
            if (err) reject(err);
            else {
                resolve(data);
            }
        })
    })
}

let students = ["Armine", "Karen", "Mery"]

function renameStudents(array, callback) {

    try {
        if (array.length > 0) {
            let changedArray = array.map(st => st + "@Picsart");
            callback(null, changedArray);
        } else {
            callback(new Error("data was not found"), array);
        }

    } catch (error) {
        callback(error, null)
    }
}

const studentsChange = promisify(renameStudents)
studentsChange(students)
    .then(resolve => console.log(resolve))
    .catch(reject => console.log(reject))



