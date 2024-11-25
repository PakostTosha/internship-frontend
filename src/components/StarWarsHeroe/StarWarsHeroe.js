import React from "react";
import "./StarWarsHeroe.css";

export default function StarWarsHeroe({ heroe, id, setActive, dataFromState }) {
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

	// Функция находит необходимый элемент состояния
	const getItemFromState = (item) => {
		const charArr = item.split("/");
		const idFromState = charArr[charArr.length - 2] - 1;
		return idFromState;
	};

	// Функции преобразования urlApi в строку с названиями
	const getFilmsToStr = (films) => {
		let filmsTitleArr = [];
		for (let currentFilm of films) {
			filmsTitleArr.push(dataFromState.films[getItemFromState(currentFilm)].title);
		}
		return filmsTitleArr.join(", ");
	};

	const getPlanetToStr = (planet) => {
		return dataFromState.planets[getItemFromState(planet)].name;
	};

	const getSpeciesToStr = (species) => {
		let speciesTitleArr = [];
		for (let currentSpecies of species) {
			speciesTitleArr.push(
				dataFromState.species[getItemFromState(currentSpecies)].name
			);
		}
		return speciesTitleArr.join(", ");
	};

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
					<li>
						Родная планета -{" "}
						{homeworld.length ? getPlanetToStr(homeworld) : "неизвестно"}
					</li>
					<li>Вид - {species.length ? getSpeciesToStr(species) : "неизвестно"}</li>
					<li>Фильмы - {films.length > 0 ? getFilmsToStr(films) : "неизвестно"}</li>
					<li>Транспорт - {vehicles.length ? vehicles.join(", ") : "неизвестно"}</li>
					<li>
						Космический корабль -{" "}
						{starships.length ? starships.join(", ") : "неизвестно"}
					</li>
				</ul>
			</div>
			<button
				className="heroe__vehicles"
				onClick={() => {
					// heroe передаётся в Modal через подъём состояния
					setActive(true, heroe);
				}}
			>
				Транспортные средства
			</button>
		</div>
	);
}
