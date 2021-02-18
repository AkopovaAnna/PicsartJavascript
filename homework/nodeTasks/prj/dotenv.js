const fs = require('fs');

function config() {

    let obj = {};

    let contents = fs.readFileSync('config.env', 'utf8');
    let lines = contents.split("\n");
    lines.filter(line => {
        if (!line.startsWith("#")) {
            filterConfig(line, obj);
        }
    })

    for (const [key, value] of Object.entries(obj)) {
        if (key && value) {
            process.env[key] = `${value}`;
        }
    }
}

function filterConfig(line, obj) {
    let splitted = line.split("=");

    if (splitted.length === 2) {
        if (splitted[0] !== "" && splitted[1].trim() !== "") {
            obj[splitted[0]] = splitted[1].trim();
        }
    } else if (splitted.length > 2) {
        obj[splitted[0]] = splitted.slice(1).join('=');
    }
}

exports.config = config;