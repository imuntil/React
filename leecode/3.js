/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  if (!s) return 0
  let sub = s[0];
  let index;
  let current;
  let maxLength = 0;
  for (let i = 1; i < s.length; i++) {
    current = s[i];
    index = sub.indexOf(current);
    if (index > -1) {
      maxLength < sub.length && (maxLength = sub.length);
      sub = sub.slice(index + 1);
    }
    sub += current;
  }
  maxLength < sub.length && (maxLength = sub.length);
  return maxLength;
};

lengthOfLongestSubstring("abcabcbb");
