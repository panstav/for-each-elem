const jsdom = require('jsdom');
const expect = require('expect.js');

const forEachElem = require('../');

describe('forEachElem', () => {

	it('Should handle querySelectorAll output', done => {

		const html = `
<ul>
	<li>1</li>
	<li>2</li>
	<li>3</li>
</ul>
`;

		jsdom.env(html, (err, window) => {
			if (err) handle(err);

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
			if (err) handle(err);

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

	it('Should be able to look up by parent elem', done => {

		const html = `
<ul>
	<li>1</li>
	<li>2</li>
	<li>3</li>
</ul>
<ol>
	<li>4</li>
	<li>5</li>
	<li>6</li>
</ol>
`;

		jsdom.env(html, (err, window) => {
			if (err) handle(err);

			global.window = window;

			const ol = window.document.getElementsByTagName('ol')[0];

			var text = '';
			forEachElem('li', ol, li => {
				text += li.textContent;
			});

			expect(text).to.be.equal('456');

			// free memory associated with the window
			window.close();

			done();
		});

	});

});

function handle(err){
	console.error(err);
	console.error(err.stack);
}