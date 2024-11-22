import { Component } from "react";
import StarWarsHeroe from "./components/StarWarsHeroe/StarWarsHeroe.js";
import "./App.css";
import Modal from "./components/Modal/Modal.jsx";

class App extends Component {
	constructor() {
		super();
		this.state = {
			allHeroes: [],
			isLoading: true,
			error: "",
			modalActive: true,
		};

		this.setModalActive = this.setModalActive.bind(this);
	}

	componentDidMount() {
		const apiUrl = "https://swapi.dev/api/people/";
		this.getAllHeroes(apiUrl);
	}

	// Получим всех героев со всех страниц рекурсией
	getAllHeroes(url) {
		// Фетч на переданный url
		fetch(url)
			// проверка ответа
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				this.setState({
					error: `Ошибка: ${response.status}`,
					isLoading: false,
				});
				throw new Error(`Не удалось получить ответ, статус: ${response.status}`);
			})
			// ответ успешно получен
			.then((data) => {
				// обновляем состояние (к имеющимся в состоянии герояем добавляем героев из запроса)
				this.setState((prevState) => {
					const newState = {
						allHeroes: [...prevState.allHeroes, ...data.results],
					};
					return newState;
				});
				// проверяем, закончились ли страницы с героями
				if (data.next) {
					this.getAllHeroes(data.next);
				} else {
					console.log("Страниц с героями закончились");
					this.setState({ isLoading: false });
				}
			})
			.catch((error) => console.log("Возникла ошибка:", error));
	}

	// Массив планет рекурсивным перебором
	// getAllPlanets(url) {}

	// Взаимодействие с модальным окном
	setModalActive(boolVal) {
		this.setState({ modalActive: boolVal });
	}

	render() {
		const { isLoading, error, allHeroes } = this.state;

		// Визуализация загрузки
		if (isLoading) {
			return <div className="heroes">Загрузка данных...</div>;
		}

		// Визуализация ошибки
		if (error) {
			return <div className="heroes">Не удалось загрузить данные. {error}</div>;
		}

		// Всё OK - список героев
		return (
			<>
				<div className="heroes">
					{allHeroes.map((heroe, index) => (
						<StarWarsHeroe
							key={index}
							heroe={heroe}
							id={index}
							setActive={this.setModalActive}
						/>
					))}
				</div>
				<Modal active={this.state.modalActive} setActive={this.setModalActive} />
			</>
		);
	}
}

export default App;
