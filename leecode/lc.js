// var longestCommonPrefix = function(strs) {
//   let short = findShortest(strs);
//   while (short.length) {
//     if (strs.every(v => v.indexOf(short) === 0)) {
//       return short;
//     }
//     short = short.slice(0, -1);
//   }
//   return "";
// };

// function findShortest(strs) {
//   return strs
//     .slice(1)
//     .reduce((prev, cur) => (cur.length < prev.length ? cur : prev), strs[0]);
// }

var longestCommonPrefix = function(strs) {
    if (!strs || !strs.length) return ''
    if (strs.length === 1) return strs[0]
    const [first, ...rest] = strs
    if (!first.length) return ''
    let com = ''
    for (let i = 0; i < first.length; i++) {
        com = first.slice(0, i + 1)
        if (rest.some(v => v.indexOf(com) !== 0)) {
            return com.slice(0, -1)
        }
    }
    return com
}

longestCommonPrefix(["c","acc","ccc"])