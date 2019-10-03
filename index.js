/*
 * https://github.com/nodejs/node/blob/v10.x/lib/_http_outgoing.js
 */

const tokenRegExp = /^[\^_`a-zA-Z\-0-9!#$%&'*+.|~]+$/;
/**
 * Verifies that the given val is a valid HTTP token
 * per the rules defined in RFC 7230
 * See https://tools.ietf.org/html/rfc7230#section-3.2.6
 */
function checkIsHttpToken(val) {
  return tokenRegExp.test(val);
}
const headerCharRegex = /[^\t\x20-\x7e\x80-\xff]/;
/**
 * True if val contains an invalid field-vchar
 *  field-value    = *( field-content / obs-fold )
 *  field-content  = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 *  field-vchar    = VCHAR / obs-text
 */
function checkInvalidHeaderChar(val) {
  return headerCharRegex.test(val);
}
function validateHeaderName(name) {
  if (typeof name !== 'string' || !name || !checkIsHttpToken(name)) {
    throw new TypeError(`Header name must be a valid HTTP token ["${name}"]`);
  }
  return true;
}

function validateHeaderValue(name, val) {
  if (val === undefined) {
    throw new TypeError(`Invalid value "${val}" for header "${name}"`);
  } else if (checkInvalidHeaderChar(val)) {
    throw new TypeError(`Header "${name}" contains invalid characters`);
  }
  return true;
}
function validateHeader(name,val) {
  return validateHeaderName(name) && validateHeaderValue(name, val);
}
module.exports = validateHeader;