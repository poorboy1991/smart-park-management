/** APP入口 **/
import "core-js/stable";
import "regenerator-runtime/runtime";

import React from "react";
import ReactDOM from "react-dom";
import App from "./views/app";

/** 公共样式 **/
import "./styles/css.css";
import "./styles/less.less";

ReactDOM.render(<App />, document.getElementById("App"));

if (module.hot) {
  module.hot.accept();
}
