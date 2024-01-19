const toHtml = (str) => document.createRange().createContextualFragment(str.trim()).firstChild;

module.exports = toHtml;
