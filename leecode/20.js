const pair = {
  "}": "{",
  "]": "[",
  ")": "("
};
const left = "([{";
function isValid(s) {
  if (!s) return true;
  if (s.length % 2) return false;
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (left.indexOf(c) > -1) {
      stack.push(c);
      continue;
    }
    const last = stack[stack.length - 1];
    if (!last) return false;
    if (pair[c] !== last) return false;
    stack.pop();
  }
  return stack.length === 0;
}
