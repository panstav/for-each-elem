module.exports = forEachElem;

function forEachElem(identifier, parent, fn){

	// normalize arguments
	if (typeof(parent) === 'function'){
		fn = parent;
		parent = window.document;
	}

	// resolve to an iterate-able list of elements
	// identifier would be either a string pointer to elements that will be queried by for elements
	// or a list which could be directly iterated with forEach, or something that can transformed to such a list
	var elements = identifier;
	if (isString(identifier)) elements = parent.querySelectorAll(identifier);
	if (!isArray(identifier)) elements = [].slice.call(elements);

	// pass the elements one by one to the given fn
	elements.forEach(fn);
}

function isString(str){
	return typeof(str) === 'string';
}

function isArray(arr){
	const toStr = toString || {}.toString;
	return toStr.call(arr) === '[object Array]';
}