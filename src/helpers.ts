/**
 * Given a string, check if it is a valid number.
 */
export function isNumeric(str: unknown): boolean {
	if (typeof str !== "string") {
		return false;
	} // Only process strings
	return (
		!isNaN(str as any) && // Use type coercion to parse the entirety of the string (`parseFloat` alone does not do this)
		!isNaN(parseFloat(str)) // Ensure strings of whitespace fail
	);
}

// The following is copied from Marked
// https://github.com/markedjs/marked/

const escapeTest = /[&<>"']/;
const escapeReplace = new RegExp(escapeTest.source, "g");
const escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
const escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, "g");
const escapeReplacements: Record<string, string> = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&#39;",
};
const getEscapeReplacement = (ch: string): string =>
	escapeReplacements[ch] || ch;

export function escape$1(html: string, encode?: boolean): string {
	if (encode) {
		if (escapeTest.test(html)) {
			return html.replace(escapeReplace, getEscapeReplacement);
		}
	} else {
		if (escapeTestNoEncode.test(html)) {
			return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
		}
	}
	return html;
}

export function cleanUrl(href: string): string | null {
	try {
		href = encodeURI(href).replace(/%25/g, "%");
	} catch {
		return null;
	}
	return href;
}

// The following is copied from Lodash
// https://github.com/lodash/lodash/

const htmlUnescapes: Record<string, string> = {
	"&amp;": "&",
	"&lt;": "<",
	"&gt;": ">",
	"&quot;": '"',
	"&#39;": "'",
};
const reEscapedHtml = /&(?:amp|lt|gt|quot|#(0+)?39);/g;
const reHasEscapedHtml = RegExp(reEscapedHtml.source);

export function unescape(string: string): string {
	return string && reHasEscapedHtml.test(string)
		? string.replace(reEscapedHtml, (entity) => htmlUnescapes[entity] || "'")
		: string || "";
}
