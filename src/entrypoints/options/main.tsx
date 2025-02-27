import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";

document.title = i18n.t("options.title");

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
