const jsdom = require('jsdom');
const expect = require('expect.js');

const forEachElem = require('../');

describe('forEachElem', () => {

	it('Should handle querySelectorAll', done => {

		const html = `
<ul>
	<li>1</li>
	<li>2</li>
	<li>3</li>
</ul>
`;

		jsdom.env(html, (err, window) => {

			if (err){
				console.err(err);
				console.log(err.stack);
			}

			global.window = window;

			var text = '';
			forEachElem(window.document.querySelectorAll('ul li'), li => {
				text += li.textContent;
			});

			expect(text).to.be.equal('123');

			// free memory associated with the window
			window.close();

			done();
		});

	});

	it('Should handle a selector', done => {

		const html = `
<ul>
	<li>1</li>
	<li>2</li>
	<li>3</li>
</ul>
`;

		jsdom.env(html, (err, window) => {

			if (err){
				console.err(err);
				console.log(err.stack);
			}

			global.window = window;

			var text = '';
			forEachElem('ul li', li => {
				text += li.textContent;
			});

			expect(text).to.be.equal('123');

			// free memory associated with the window
			window.close();

			done();
		});

	});

});