import React, { useState, useEffect } from "react";
import VehicleCard from "../VehicleCard/VehicleCard";
import "./Modal.css";

export default function Modal({ active, setActive, heroe }) {
	// Выполнить запрос на получение ТС из списка и добавить в состояние
	const [vehicles, setVehicles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getVehiclesList(heroe.vehicles);
	}, []);

	const getVehiclesList = (vehicleListUrls) => {
		// Если есть список ТС, то - запросы
		if (vehicleListUrls.length > 0) {
			Promise.all(
				vehicleListUrls.map((url) => fetch(url).then((response) => response.json()))
			)
				.then((data) => {
					setVehicles(data); // Устанавливаем весь массив данных
					setIsLoading(false); // Устанавливаем состояние загрузки в false
				})
				.catch((error) => {
					console.error("Ошибка при загрузке данных:", error);
					setIsLoading(false); // Устанавливаем состояние загрузки в false даже при ошибке
				});
			// Иначе список пуст, завершить загрузку
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
			vehiclesList = "Транспортных средств нет";
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
