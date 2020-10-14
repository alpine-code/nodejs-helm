const YAML = require('yaml')

const flattenValuesToString = function (values) {
    var valuesString = '';
    for (var valueSet in values) {
        if (values.hasOwnProperty(valueSet)) {
            valuesString += `${valueSet}=${values[valueSet]},`;
        }
    }
    return valuesString;
};

const flattenObject = function (obj) {
    var toReturn = {};
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;

        if (typeof obj[i] == "object") {
            var flatObject = flattenObject(obj[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;

                toReturn[i + "." + x] = flatObject[x];
            }
        } else {
            toReturn[i] = obj[i];
        }
    }
    return toReturn;
};

function parseResponseToJson(rawData) {
    try {
        var parsedDocuments = YAML.parseAllDocuments(rawData);
        var jsonData = [];
        if (typeof parsedDocuments == "object") {
            for (var i=0; i<parsedDocuments.length; i++) {
                jsonData.push(parsedDocuments[i].toJSON());
            }
        }
        return jsonData;
    }
    catch(e) {
        console.log("could not parse helm response with error: " + e.message);
        //ignore
        return rawData;
    }
}

function parseJson(rawData) {
    try {
        var jsonData = JSON.parse(rawData);
        return jsonData;
    }
    catch(e) {
        console.log("could not parse helm response with error: " + e.message);
        return rawData;
    }
}

module.exports = {
    flattenValuesToString : flattenValuesToString,
    flattenObject : flattenObject,
    parseResponseToJson : parseResponseToJson,
    parseJson : parseJson
};
