import React from "react";
import "./StarWarsHeroe.css";

export default function StarWarsHeroe({ heroe, id, setActive }) {
	const {
		name,
		height,
		mass,
		hair_color,
		skin_color,
		eye_color,
		birth_year,
		gender,
		homeworld,
		films,
		species,
		vehicles,
		starships,
	} = heroe;

	// // Метод обработки массива url и конвертации в строку
	// const getStrFromArr = (arrUrl) => {
	// 	let infoArr = [];
	// 	arrUrl.forEach((url) => {
	// 		fetch(url)
	// 			.then((response) => response.json())
	// 			.then((data) => {
	// 				infoArr.push(Object.values(data)[0]);
	// 			});
	// 	});
	// 	return infoArr.join(", ");
	// };

	// // species - name (1)
	// // films - title (1)
	// // vehicles - name (1)
	// // starships - name (1)

	// console.log(getStrFromArr(films));

	return (
		<div className="heroe">
			<div className="heroe__title">
				<h1>
					Герой {id + 1}: <span className="heroe__name">{name}</span>
				</h1>
			</div>
			<div className="heroe__info">
				<h2>Информация о персонаже:</h2>
				<ul className="info">
					<li>Рост - {height}</li>
					<li>Масса - {mass}</li>
					<li>Цвет волос - {hair_color}</li>
					<li>Цвет кожи - {skin_color}</li>
					<li>Цвет глаз - {eye_color}</li>
					<li>Год рождения - {birth_year}</li>
					<li>Пол - {gender}</li>
					<li>Родная планета - {homeworld}</li>
					<li>Вид - {species.length ? species : "неизвестно"}</li>
					<li>Фильмы - {films.length ? films.join(", ") : "неизвестно"}</li>
					<li>Транспорт - {vehicles.length ? vehicles.join(", ") : "неизвестно"}</li>
					<li>
						Космический корабль -{" "}
						{starships.length ? starships.join(", ") : "неизвестно"}
					</li>
				</ul>
			</div>
			<button onClick={() => setActive(true)}>Транспортные средства</button>
		</div>
	);
}
