var expect = require('expect');
var {generateMessage} = require('./message')
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
    })
})