/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
  if (!needle) return 0
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    if (haystack[i] !== needle[0]) {
      continue
    }
    if (haystack.substr(i, needle.length) === needle) {
      return i
    }
    continue
  }
  return -1
};

strStr('a', 'a')