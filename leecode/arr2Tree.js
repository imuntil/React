let input = [
  {
    id: 1,
    val: '学校',
    parentId: null,
  },
  {
    id: 2,
    val: '班级1',
    parentId: 1,
  },
  {
    id: 3,
    val: '班级2',
    parentId: 1,
  },
  {
    id: 4,
    val: '学生1',
    parentId: 2,
  },
  {
    id: 5,
    val: '学生2',
    parentId: 3,
  },
  {
    id: 6,
    val: '学生3',
    parentId: 3,
  },
]

/**
 *
 * @param {[]} arr
 */
function array2Tree(arr) {
  const f = (parentID, children) => {
    arr.forEach((v) => {
      if (v.parentId === parentID) {
        v.children = []
        f(v.id, v.children)
        children.push(v)
      }
    })
  }

  const res = []
  f(null, res)
  return res.length ? res : {}
}



function a2t(arr) {
  const f = (parentID, children) => {
    while (input.length) {
      const cur = arr.shift()
      if (cur.parentId === parentID) {
        cur.children = []
        f(cur.id, cur.children)
        children.push(cur)
      }
    }
  }
  const res = []
  f(null, res)
  return res.length ? res : {}
}

// JSON.stringify(array2Tree(input)) === JSON.stringify(a2t(input))
