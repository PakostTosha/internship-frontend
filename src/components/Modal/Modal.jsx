import React, { useState, useEffect } from "react";
import VehicleCard from "../VehicleCard/VehicleCard";
import "./Modal.css";

export default function Modal({ active, setActive, heroe }) {
	const [vehicles, setVehicles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getVehiclesList(heroe.vehicles);
	}, []);

	// Отправление запросов к API
	const getVehiclesList = (vehicleListUrls) => {
		if (vehicleListUrls.length > 0) {
			Promise.all(
				vehicleListUrls.map((url) => fetch(url).then((response) => response.json()))
			)
				.then((data) => {
					setVehicles(data);
					setIsLoading(false);
				})
				.catch((error) => {
					console.error("Ошибка при загрузке данных:", error);
					setIsLoading(false);
				});
		} else {
			setIsLoading(false);
		}
	};

	let vehiclesList;
	if (isLoading) {
		vehiclesList = <li>Подождите, идёт загрузка...</li>;
	} else {
		if (vehicles.length > 0) {
			vehiclesList = vehicles.map((vehicle, index) => (
				<>
					<hr />
					<VehicleCard key={index} vehicle={vehicle} />
					<hr />
				</>
			));
		} else {
			vehiclesList = "К сожалению, данные о транспортных средствах отсутствуют";
		}
	}

	return (
		<div
			className={active ? "modal active" : "modal"}
			onClick={() => setActive(false)}
		>
			<div className="modal__container" onClick={(e) => e.stopPropagation()}>
				<div className="modal__header">
					<h1 className="modal__title">Транспортные средства</h1>
				</div>
				<div className="modal__content">
					<ul className="vehicles">{vehiclesList}</ul>
				</div>
				<div className="modal__footer">
					<button className="modal__button-close" onClick={() => setActive(false)}>
						Закрыть
					</button>
				</div>
			</div>
		</div>
	);
}
