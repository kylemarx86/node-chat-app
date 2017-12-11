var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage' , () => {
    it('should generate the correct message object', () => {
        // store res in variable
        // make assertions about response
            // from matches
            // text matches
            // created at is a number
        var from = 'Peter Parker';
        var text = 'My Spider-Sense is tingling.';
        
        var message = generateMessage(from, text);
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(message.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate the correct location object', () => {
        var from = 'Henry VIII';
        var lat = '0';
        var long = '51.47879';
        var url = `https://www.google.com/maps?q=${lat},${long}`
        
        var locationMessage = generateLocationMessage(from, lat, long);
        expect(locationMessage).toInclude({from, url});
        // expect(locationMessage.from).toBe(from);
        // expect(locationMessage.url).toBe(url);
        expect(locationMessage.createdAt).toBeA('number');
    });
});