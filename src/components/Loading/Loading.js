import React from "react";
import "./Loading.css";

export default function Loading() {
	return (
		<>
			<div className="loader">
				<div className="container">
					<div className="inner one"></div>
					<div className="inner two"></div>
					<div className="inner three"></div>
					<div className="title">Загрузка...</div>
				</div>
			</div>
		</>
	);
}
