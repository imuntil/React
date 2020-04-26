let flag;
let timer;
const isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

let pos = { top: 0, left: 0 };

let scrollingElementName = '';

const reports = () => {
  if (scrollingElementName) {
    const { scrollLeft, scrollTop } = document[scrollingElementName];
    pos = { top: scrollTop, left: scrollLeft };
    return;
  }
  scrollingElementName = ['scrollingElement', 'documentElement', 'body'].find(name => {
    const { scrollTop, scrollLeft } = document[name];
    if (scrollLeft || scrollTop) {
      pos = { top: scrollTop, left: scrollLeft };
      return true;
    }
    return false;
  });
};

if (isIOS) {
  document.body.addEventListener('focusin', e => {
    if (e.target.getAttribute('bab') !== 'true') return;
    reports();
    flag = true;
    clearTimeout(timer);
  });
  document.body.addEventListener('focusout', e => {
    if (e.target.getAttribute('bab') !== 'true') return;
    flag = false;
    if (!flag) {
      timer = setTimeout(() => {
        // 当键盘收起的时候让页面回到原始位置
        window.scrollTo({ ...pos, behavior: 'smooth' });
        pos = { top: 0, left: 0 };
      }, 100);
    }
  });
}
