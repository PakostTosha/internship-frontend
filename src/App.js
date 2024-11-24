import { Component } from "react";
import StarWarsHeroe from "./components/StarWarsHeroe/StarWarsHeroe.js";
import "./App.css";
import Modal from "./components/Modal/Modal.jsx";
import Loading from "./components/Loading/Loading.js";
import Error from "./components/Error/Error.js";

class App extends Component {
	constructor() {
		super();
		this.state = {
			// Реорганизовать состояние??
			people: [],
			planets: [],
			species: [],
			films: [],
			vehicles: [],
			starships: [],
			error: "",
			modalActive: false,
			dataSections: {
				people: { isLoaded: 0, name: "people" },
				planets: { isLoaded: 0, name: "planets" },
				species: { isLoaded: 0, name: "species" },
				films: { isLoaded: 0, name: "films" },
				vehicles: { isLoaded: 0, name: "vehicles" },
				starships: { isLoaded: 0, name: "starships" },
			},
			heroeInModal: {},
		};

		this.setModalActive = this.setModalActive.bind(this);
	}

	componentDidMount() {
		// Получение всех данных
		for (let sectionData in this.state.dataSections) {
			this.getAllData(sectionData);
		}
	}

	// Функция получения данных одного из раздела dataNames
	getAllData(sectionData, nextUrl = ``) {
		let url = `https://swapi.dev/api/${sectionData}/`;
		// Есть ли следующий URL
		if (nextUrl) {
			url = nextUrl;
		}
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
						[sectionData]: [...prevState[sectionData], ...data.results],
					};
					return newState;
				});
				// проверяем, закончились ли страницы с героями
				if (data.next) {
					this.getAllData(sectionData, data.next);
				} else {
					// все ли данные загружены
					console.log(`Данные: "${sectionData}" загружены`);
					this.setState((prevState) => {
						const newState = { ...prevState };
						newState.dataSections[sectionData].isLoaded = 1;
						return newState;
					});
				}
			});
	}

	// Взаимодействие с модальным окном
	setModalActive(boolVal, hero = {}) {
		if (boolVal) {
			this.setState({ modalActive: true, heroeInModal: hero });
		} else {
			this.setState({ modalActive: false, heroeInModal: {} });
		}
		document.querySelector("body").classList.toggle("modal-active");
	}

	render() {
		const { dataSections, isLoaded, error, people, modalActive, ...heroInfo } =
			this.state;

		// Визуализация загрузки
		for (const key in dataSections) {
			if (!dataSections[key].isLoaded) {
				return <Loading />;
			}
		}

		// Визуализация ошибки
		if (error) {
			return <Error error={`Не удалось загрузить данные. ${error}`} />;
		}

		let modal;
		if (this.state.modalActive) {
			modal = (
				<Modal
					active={this.state.modalActive}
					setActive={this.setModalActive}
					id={this.state.idHeroInModal}
					heroe={this.state.heroeInModal}
				/>
			);
		}

		// Всё OK - список героев
		return (
			<>
				<div className="heroes">
					{people.map((heroe, index) => (
						<StarWarsHeroe
							key={index}
							heroe={heroe}
							id={index}
							dataFromState={heroInfo}
							setActive={this.setModalActive}
						/>
					))}
					{/* <StarWarsHeroe
						key={0}
						heroe={people[0]}
						id={0}
						dataFromState={heroInfo}
						setActive={this.setModalActive}
					/> */}
				</div>
				{modal}
			</>
		);
	}
}

export default App;
