import React from "react";
import "./VehicleCard.css";

export default function VehicleCard({ vehicle }) {
	const { crew, max_atmosphering_speed, cost_in_credits } = vehicle;

	return (
		<li className="vehicle">
			<h1 className="vehicle-name">{vehicle.name}</h1>
			<ul className="vehicle__characteristics">
				<li>Размер команды - {crew}</li>
				<li>Максимальная скорость - {max_atmosphering_speed}</li>
				<li>Стоимость - {cost_in_credits}</li>
			</ul>
		</li>
	);
}
