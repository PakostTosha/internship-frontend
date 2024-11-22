import React from "react";
import "./Modal.css";

const Modal = ({ active, setActive }) => {
	return (
		<div
			className={active ? "modal active" : "modal"}
			onClick={() => setActive(false)}
		>
			<div className="modal__content" onClick={(e) => e.stopPropagation()}>
				<p>Текст</p>
				<button onClick={() => setActive(false)}>Закрыть окно</button>
			</div>
		</div>
	);
};

export default Modal;
