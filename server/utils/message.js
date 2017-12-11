var moment = require('moment');

/**
 * compiles an object out of the from and text parameters and adds a created at timestamp
 * @param {string} from - user the text is from
 * @param {string} text - text the user is sending
 * @returns {object} - object composed of from and text attributes and a createdAt timestamp
 */
var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    };
};

/**
 * compiles an object with a url to google maps for the given coordinates
 * @param {string} from - user the message is from 
 * @param {number} lat - latitude component of coordinates
 * @param {number} long - longitude component of coordinates
 * @returns {object} - object composed of from, a compiled url, and a createdAt timestamp
 */
var generateLocationMessage = (from, lat, long) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${long}`,
        createdAt: moment().valueOf()
    }
};

module.exports = {generateMessage, generateLocationMessage};