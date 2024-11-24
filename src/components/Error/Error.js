import React from "react";
import "./Error.css";

export default function Error(props) {
	return (
		<div className="alert alert-3-danger">
			<h3 className="alert-title">Возникла ошибка.</h3>
			<p className="alert-content">{props.error}</p>
		</div>
	);
}
