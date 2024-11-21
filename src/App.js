import { Component } from "react";
import StarWarsHeroe from "./components/StarWarsHeroe";
import "./App.css";

class App extends Component {
	constructor() {
		super();
		this.state = {
			allHeroes: [],
			isLoading: true,
			error: "",
		};
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

	render() {
		const { isLoading, error, allHeroes } = this.state;
		return (
			<div className="heroes">
				{isLoading
					? "Загрузка данных..." // <Loading />
					: error
					? `Не удалось загрузить данные. ${error}` // <Error />
					: allHeroes.map((heroe, index) => (
							<StarWarsHeroe key={index} heroe={heroe} id={index} />
					  ))}
			</div>
		);
	}
}

export default App;
