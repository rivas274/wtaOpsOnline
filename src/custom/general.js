/**
 * Pauses the execution for a specified number of milliseconds.
 *
 * @param {number} ms - The number of milliseconds to sleep.
 * @returns {Promise<void>} A promise that resolves after the specified time has elapsed.
 */
function sleepCount(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Ejemplo de uso
async function sleep(ms) {
    await sleepCount(ms);
}

/**
 * Generates a random integer between the specified minimum and maximum values, inclusive.
 *
 * @param {number} min - The minimum value for the random number.
 * @param {number} max - The maximum value for the random number.
 * @returns {number} A random integer between min and max, inclusive.
 */
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default {
    sleep,
    randomNumber
};