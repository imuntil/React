const input = `4PGC938
2IYE230
3CIO720
1ICK750
1OHV845
4JZY524
1ICK750
3CIO720
1OHV845
1OHV845
2RLA629
2RLA629
3ATW723`

const output = `1ICK750
1ICK750
1OHV845
1OHV845
1OHV845
2IYE230
2RLA629
2RLA629
3ATW723
3CIO720
3CIO720
4JZY524
4PGC938`

function LSD(samples, W) {
  const aux = []
  for (let i = W - 1; i >= 0; i--) {
    // 统计频率
    const count = []
    samples.forEach((v) => {
      const index = v.charCodeAt(i) + 1
      count[index] ? count[index]++ : (count[index] = 1)
    })

    // 频率转化为开始位置的索引
    for (let j = 1; j < count.length; j++) {
      !count[j] && (count[j] = 0)
      count[j] += count[j - 1] || 0
    }

    // 数据分类
    for (let k = 0; k < samples.length; k++) {
      const g = samples[k].charCodeAt(i)
      const index = count[g]
      aux[index] = samples[k]
      count[g]++
    }

    // 回写
    aux.forEach((v, i) => {
      samples[i] = v
    })
  }
  return samples
}

const xs = input.split('\n')
const result = LSD(xs, 7)
console.log(result.join('\n') === output)