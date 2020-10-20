import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";

import "./index.css";
import ThemedApp from "./Theme";
// import * as serviceWorker from "./serviceWorker";

// ReactDOM.render(<p>lsdjflsdkjf</p>, document.getElementById("root"));
ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemedApp />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
