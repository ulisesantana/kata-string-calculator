// "//1/" > throw exception 
// "///" > throw exception 

import {calculate} from '.';

describe('String calculator should', () => {
	it('add numbers separated by commas', () => {
		expect(calculate('1,1,1')).toBe(3);
	});

	it('ignore characters if they are not valid numbers', () => {
		expect(calculate('non-numeric')).toBe(0);
		expect(calculate('irrelevant,1')).toBe(1);
	});

	it('accept a custom separator given by the expression', () => {
		expect(calculate('//#/4#3')).toBe(7);
		expect(calculate('//<>/4<>3')).toBe(7);
	});

	it('accept a custom separator given by the expression and ignore characters if they are not valid numbers', () => {
		expect(calculate("//@/1,2@3" )).toBe(15);
		expect(calculate("//@/1,2lha6SADV7adf@3" )).toBe(1270);
	});
});
