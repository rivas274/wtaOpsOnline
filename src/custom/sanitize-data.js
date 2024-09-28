/**
 * Sanitizes the given amount value by rounding it to the specified number of decimal places.
 * If no decimal places are provided, it defaults to 2.
 * @param {string} value - The amount value to sanitize.
 * @param {number} decimal - The number of decimal places to round to (optional).
 * @returns {string} - The sanitized amount value.
*/

const sanitizeAmount = function (value, decimal = 2) {
    if (value && !/^\d+(\.\d{1,2})?$/.test(value)) {
        value = parseFloat(value).toFixed(decimal);
    }
    return value;
}

/**
 * Handles the paste event and calls the provided callback function with the pasted value.
 * @param {Event} event - The paste event.
 * @param {Function} callback - The callback function to be called with the pasted value.
 * @returns {string} - The pasted value.
 */
const handlePaste = function (event, callback) {
    console.log('handlePaste', event, callback);

    event.preventDefault();
    const pasteValue = (event.clipboardData || window.clipboardData).getData('text');
    return pasteValue ? callback(pasteValue) : '';
}

/**
 * Normalizes the given amount value by removing spaces and non-numeric characters,
 * except for decimal and thousand separators.
 * @param {string} value - The amount value to normalize.
 * @returns {string} - The normalized amount value.
 */
const normalizeAmount = function (value) {
    console.log('normalizeAmount', value);
    value = value.replace(/[^\d.,]/g, '');

    const commaCount = value.indexOf(',');
    const dotCount = value.indexOf('.');

    if (commaCount > dotCount) {
        value = value.replace(/\./g, '');
        value = value.replace(/,/g, '.');
    } else {
        value = value.replace(/,/g, '');
    }

    const floatValue = parseFloat(value) || 0;
    return floatValue.toFixed(2);
}

/**
 * Encodes a JSON object to Base64.
 *
 * @param {Object} jsonData - The JSON object to encode.
 * @returns {string} The Base64 encoded string.
 */
const jsonEncode = function (jsonData) {
    if (!jsonData || Object.keys(jsonData).length === 0) {
        return '';
    }
    let str = JSON.stringify(jsonData);
    return str;
}
/**
 * Normalizes a given name by converting it to lowercase, removing commas, and removing any non-alphabetic characters.
 * 
 * @param {string} name - The name to be normalized.
 * @returns {string} The normalized name.
 */
const normalizeName = function (name) {
    let tempName = name || '';
    return tempName.toLowerCase().replace(/,/g, ' ').replace(/[^a-z\s]/g, '').trim();
}
/**
 * Compares two names and returns a boolean indicating if they are a match.
 *
 * @param {string} name1 - The first name to compare.
 * @param {string} name2 - The second name to compare.
 * @returns {boolean} - True if the names are a match, false otherwise.
 */
const compareNames = function (name1, name2) {
    let parts1 = normalizeName(name1).split(/\s+/),
        parts2 = normalizeName(name2).split(/\s+/);

    let matches = parts1.filter(part => parts2.includes(part)).length;
    let totalParts = Math.max(parts1.length, parts2.length);
    return matches >= Math.ceil(totalParts / 2);
}

/**
 * Replaces characters in a string based on a given mapping.
 *
 * @param {string} str - The input string to be processed.
 * @param {Object} map - An object containing the mapping of characters to be replaced.
 * @returns {string} - The processed string with replaced characters.
 */
const strtr = function (str, map) {
    let keys = Object.keys(map);
    let values = Object.values(map);
    let regExp = new RegExp(keys.join('|'), 'g');
    return str.replace(regExp, (match) => values[keys.indexOf(match)]);
}

export default {
    sanitizeAmount,
    handlePaste,
    normalizeAmount,
    jsonEncode,
    compareNames,
    strtr,
    normalizeName
};