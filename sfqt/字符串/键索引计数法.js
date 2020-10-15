const samples = `Anderson  2
Brown     3
Davis     3
Garcia    4
Harris    1
Jackson   3
Johnson   4
Jones     3
Martin    1
Martinez  2
Miller    2
Moore     1
Robinson  2
Smith     4
Taylor    3
Thomas    4
Thompson  4
White     2
Williams  3
Wilson    4`
  .split('\n')
  .map((v) => {
    const [key, val] = v.replace(/\s+/, ' ').split(' ')
    return { key, val: +val }
  })

// 将samples按照分组排序

//
// 1. 统计频率
const count = []
samples.forEach((v) => {
  const index = v.val + 1
  count[index] ? count[index]++ : (count[index] = 1)
})
// => count = [, , 3, 5, 6, 6]，表示组1出现了3次，组2出现了5次...

//
// 2. 将频率转化为（开始出现的）索引
for (let i = 1; i < count.length; i++) {
  !count[i] && (count[i] = 0)
  count[i] += count[i - 1] || 0
}
// => count => [, 0, 3, 8, 14, 20]，表示组1从0开始，组2从3开始（有3个1组），组3从8开始（有3个1组+5个2组）...

//
// 3. 数据分类
const aux = []
for (let i = 0; i < samples.length; i++) {
  const g = samples[i].val
  const index = count[g]
  // 将samples中的数据复制到aux中
  aux[index] = samples[i]
  // 索引开始的位置后移一位
  count[g]++
}

//
// 4.回写
for (let i = 0; i < aux.length; i++) {
  samples[i] = aux[i]
}
