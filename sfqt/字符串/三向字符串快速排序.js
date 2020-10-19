class Quick3String {
  charAt(s, d) {
    return s.length >= d ? s.charAt(d) : -1
  }

  sort(a) {
    this._sort(a, 0, a.length - 1, 0)
  }

  _sort(a, low, high, d) {
    if (high <= low) return
    const t = this.charAt(a[low], d)
    let [x, y] = [low, high]
    let i = low + 1
    while (i <= y) {
      const c = this.charAt(a[i], d)
      if (c < t) {
        ;[a[i], a[x]] = [a[x], a[i]]
        i++
        x++
      } else if (c > t) {
        ;[a[i], a[y]] = [a[y], a[i]]
        y--
      } else {
        i++
      }
    }
    this._sort(a, low, x - 1, d)
    t > 0 && this._sort(a, x, y, d + 1)
    this._sort(a, y + 1, high, d)
  }
}
