const expect = require('expect');
const {isRealString} = require('./validation');

// isRealString
// should reject non-string values
// should reject strings with only spaces
// should allow string with non space characters

describe('isRealString', () => {
    it('should allow string with non-space characters', () => {
        var res = isRealString('   Hello  ');
        expect(res).toBe(true);
    });

    it('should reject non-string values', () => {
        var res = isRealString(true);
        expect(res).toBe(false);
    });

    it('should reject strings with only spaces', () => {
        var res = isRealString('   ');
        expect(res).toBe(false);
    });
});