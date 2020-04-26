/* global ENV */
const isServer = () => typeof window === 'undefined';

const $ = selector => document.querySelector(selector);

const detectOS = ua => {
  ua = ua || window.navigator.userAgent;

  const ipad = /(iPad).*OS\s([\d_]+)/.test(ua);
  const iphone = !ipad && /(iPhone\sOS)\s([\d_]+)/.test(ua);
  const android = /(Android);?[\s/]+([\d.]+)?/.test(ua);
  const ios = iphone || ipad;

  return { ios, android };
};

const getEventListenerOptions = options => {
  if (isServer()) return false;
  if (!options) return false;
  let isSupportOptions = false;
  const listenerOptions = {
    get passive() {
      isSupportOptions = true;
      // eslint-disable-next-line no-useless-return
      return;
    },
  };

  const noop = () => {};
  const testEvent = '__TEST_PASSIVE__';
  window.addEventListener(testEvent, noop, listenerOptions);
  window.removeEventListener(testEvent, noop, listenerOptions);

  const { capture } = options;

  return isSupportOptions ? options : typeof capture !== 'undefined' ? capture : false;
};

const overflowHiddenPcStyleTypes = ['overflow', 'boxSizing', 'paddingRight'];
const overflowHiddenMobileStyleTypes = ['top', 'width', 'height', 'overflow', 'position'];

let lockedNum = 0;
let initialClientY = 0;
let initialClientX = 0;
let unLockCallback;
let documentListenerAdded = false;

let lockedElements = [];
const eventListenerOptions = getEventListenerOptions({ passive: false });

const setOverflowHiddenPc = () => {
  const $body = $('body');
  const bodyStyle = { ...$body.style };
  const scorllBarWidth = window.innerWidth - document.body.clientWidth;

  $body.style.overflow = 'hidden';
  $body.style.boxSizing = 'border-box';
  $body.style.paddingRight = `${scorllBarWidth}px`;

  return () => {
    overflowHiddenPcStyleTypes.forEach(v => {
      $body.style[v] = bodyStyle[v] || '';
    });
  };
};

const setOverflowHiddenMobile = () => {
  const $html = $('html');
  const $body = $('body');

  const scrollTop = $html.scrollTop || $body.scrollTop;
  const htmlStyle = { ...$html.style };
  const bodyStyle = { ...$body.style };

  $html.style.height = '100%';
  $html.style.overflow = 'hidden';

  $body.style.top = `-${scrollTop}px`;
  $body.style.width = '100%';
  $body.style.height = 'auto';
  $body.style.position = 'fixed';
  $body.style.overflow = 'hidden';

  return () => {
    $html.style.height = htmlStyle.height || '';
    $html.style.overflow = htmlStyle.overflow || '';

    overflowHiddenMobileStyleTypes.forEach(v => {
      $body.style[v] = bodyStyle[v] || '';
    });

    window.scrollTo(0, scrollTop);
  };
};

const preventDefault = event => {
  if (!event.cancelable) return;

  event.preventDefault();
};

const handleScroll = (event, target) => {
  if (target) {
    const { scrollTop, scrollLeft, scrollWidth, scrollHeight, clientWidth, clientHeight } = target;
    const clientX = event.targetTouches[0].clientX - initialClientX;
    const clientY = event.targetTouches[0].clientY - initialClientY;
    const isVertical = Math.abs(clientY) > Math.abs(clientX);

    const isOnTop = clientY > 0 && scrollTop === 0;
    const isOnBottpm = clientY < 0 && scrollTop + clientHeight + 1 >= scrollHeight;
    const isOnLeft = clientX > 0 && scrollLeft === 0;
    const isOnRight = clientX < 0 && scrollLeft + clientWidth + 1 >= scrollWidth;

    if ((isVertical && (isOnTop || isOnBottpm)) || (!isVertical && (isOnLeft || isOnRight))) {
      return preventDefault(event);
    }
  }
  event.stopPropagation();
  return true;
};

const checkTargetElement = target => {
  if (target) return;
  if (process.env.NODE_ENV === 'production' || ENV !== 'test') return;

  console.warn(`the target element must be provided.`);
};

const lock = target => {
  if (isServer()) return;
  checkTargetElement(target);
  if (!target || lockedElements.indexOf(target) > -1) return;

  if (detectOS().ios) {
    target.ontouchstart = event => {
      initialClientX = event.targetTouches[0].clientX;
      initialClientY = event.targetTouches[0].clientY;
    };
    target.ontouchmove = event => {
      if (event.targetTouches.length !== 1) return;
      handleScroll(event, target);
    };

    if (!documentListenerAdded) {
      document.addEventListener('touchmove', preventDefault, eventListenerOptions);
      documentListenerAdded = true;
    }
  } else if (lockedNum <= 0) {
    // lockedNum 由于处理浮层上触发浮层的情况。
    // 当已经触发一个浮层，此时 body 和 html 已经处于 overflow：hidden 的状态，再次执行下面的方法会导致错误。
    unLockCallback = detectOS().android ? setOverflowHiddenMobile() : setOverflowHiddenPc();
  }

  lockedElements.push(target);
  lockedNum += 1;
};

const unlock = target => {
  if (isServer()) return;
  checkTargetElement(target);
  if (!target || lockedElements.indexOf(target) === -1) return;
  // lockedNum - 1 相当于关闭了一个浮层，当浮层 <= 0 时，说明浮层全部关闭，此时才可以打开body的滚动。
  lockedNum -= 1;
  if (lockedNum > 0) return;

  const index = lockedElements.indexOf(target);

  if (index !== -1) {
    lockedElements.splice(index, 1);
    if (!detectOS().ios && typeof unLockCallback === 'function') {
      unLockCallback();
      return;
    }
    target.ontouchmove = null;
    target.ontouchstart = null;

    if (documentListenerAdded) {
      document.removeEventListener('touchmove', preventDefault, eventListenerOptions);
      documentListenerAdded = false;
    }
  }
};

/**
 * 强制解除滚动锁定，并清除所有记录，初始化数据
 * 多浮层存在时，须慎用
 * @param {HTMLElement} target alternative
 */
const forceUnlock = target => {
  if (isServer()) return;
  checkTargetElement(target);
  if (!detectOS().ios && typeof unLockCallback === 'function') {
    unLockCallback();
    unLockCallback = null;
  }
  if (detectOS().ios) {
    lockedElements.forEach(v => {
      v.ontouchmove = null;
      v.ontouchstart = null;
    });
    if (documentListenerAdded) {
      document.removeEventListener('touchmove', preventDefault, eventListenerOptions);
      documentListenerAdded = false;
    }
  }
  lockedElements = [];
  lockedNum = 0;
};

export { lock, unlock, forceUnlock };
