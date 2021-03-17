function debounce(fn, time = 500) {
  let timeout;
  // import 不要使用箭头函数.
  // 执行debounce(onScroll)时，debounce的this执行window，如果使用箭头函数，此时创建的返回函数this会绑定window，导致fn.apply(this, rest)失去意义
  // return (...rest) => {
  return function(...rest) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, rest);
    }, time);
  };
}

document.write('<div>button</div>');
document.querySelector('div').style.height = '300vh';
document.querySelector('div').style.backgroundColor = 'green';
function onScroll() {
  console.log(this);
}
// document.addEventListener('scroll', debounce(onScroll));

function throttle(fn, time = 1000) {
  let canRun = true;
  return function(...rest) {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, rest);
      canRun = true
    }, time);
  };
}

document.addEventListener('scroll', throttle(onScroll))

function xthis() {
  return function() {
    setTimeout(() => {
      console.log(this.someAttr);
    }, 100);
  };
}

function xthis2() {
  return () => {
    setTimeout(() => {
      console.log(this.someAttr);
    }, 100);
  };
}

const xx = {
  someAttr: 'abc',
  xthis,
  xthis2,
};

xx.xthis()();
xx.xthis2()();
