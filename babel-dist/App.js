var _s = $RefreshSig$();
import React, { useState } from 'react';
import styles from './styles.module.css';
// @ts-ignore
const $$ReactCreateElement = (...arg) => {
  console.log(arg[0], arg[1]);
  const CE = React.createElement;
  return CE(...arg);
};
const App = () => {
  _s();
  const [count, setCount] = useState(0);
  const handeCounter = () => {
    setCount(count + 1);
  };
  return /*#__PURE__*/$$ReactCreateElement("div", {
    className: styles.app
  }, /*#__PURE__*/$$ReactCreateElement("div", {
    className: styles.title
  }, "React component"), /*#__PURE__*/$$ReactCreateElement("div", {
    className: styles.counter
  }, /*#__PURE__*/$$ReactCreateElement("button", {
    onClick: handeCounter
  }, "COUNTER IN REACT"), " ", count));
};
_s(App, "oDgYfYHkD9Wkv4hrAPCkI/ev3YU=");
_c = App;
const Page = () => {
  return /*#__PURE__*/$$ReactCreateElement(React.Fragment, null, /*#__PURE__*/$$ReactCreateElement(App, null));
};
_c2 = Page;
export default Page;
var _c, _c2;
$RefreshReg$(_c, "App");
$RefreshReg$(_c2, "Page");
