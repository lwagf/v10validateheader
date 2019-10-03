const validateHeader = require('./index.js');
try {
  console.log(validateHeader('Accept', 'ynt\u0001MPaT'));
} catch (e) {
  console.log(e);
}
