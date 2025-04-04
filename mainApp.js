import formData from "./formData.js"
import Listfilm from "./listFilm.js"
import { api } from "./homeApi.js"

window.addEventListener('DOMContentLoaded', () => new FilmList())

class FilmList {
    select = document.querySelector('.filter-genre')
    filterBtn = document.querySelector('.filter-btn')
    formValue = document.querySelector('.formTask');
    
    constructor() {
    this.arrFilm = []
    this.originalArr = [...new Set(this.arrFilm)]
    this.api = api
    this.addEventListeners()
    this.holderButton()
    this.renderFilms()
    this.clearFilter()
    }

    clearFilter() {
        this.filterBtn.addEventListener('click', () => {
        document.querySelectorAll('.cont-list').forEach(e => e.className ='none')
        this.arrFilm.forEach(item => new Listfilm(item, this))    
        // this.originalArr.forEach(item => new Listfilm(item, this))    

        })
    }

    holderButton() {
        document.querySelector('.input-film').addEventListener("input", () => {
            if (document.querySelector('.input-film').value === ''){
                document.querySelector('.save-btn').disabled = true;
            } 
            else {
                document.querySelector('.save-btn').disabled = false;
            }
            
        });       
    }

    renderFilms(){
        //при загрузке страницы, подгружает данные с сервера и формирует список фильмов на дисплее, заполняет массив с фильмами на клиенте
        this.api.getFilm().then(films => {
            films.forEach(item => {
                this.arrFilm.push(item)
                new Listfilm(item, this, item.id)
                // console.log(item.id);
            })
        })
    }

    addEventListeners(){
        //при нажатии на кнопку ХОЧУ СМОТРЕТЬ добавляет фильм в массив клиента, отправляет на сервер данные о новом фильме, добавляет на дисплей новый фильм
        this.formValue.addEventListener('submit', (e) => {
        e.preventDefault();
        const film = formData()
            // if (this.arrFilm.includes(!film)) {
            this.api.addFilm(film).then(film => {
            this.arrFilm.push(film);
            new Listfilm(film, this);
            e.target.reset();
            document.querySelector('.save-btn').disabled = true;   
            })
            // }
        // }
        })
        
    this.select.addEventListener('change', () => this.filterSelect(this.select.value));
    }

    filterSelect(elem) {
        document.querySelectorAll('.cont-list').forEach(e => e.className ='none');
        this.newArr = this.arrFilm.filter(item => {
            if ( item.filmGenre === elem && elem !== "Сериал") {
                return item
            }
            else if (elem == "Сериал")
            {
                return item.filmType == "Сериал"
            }
            else if (elem == "Все") {
                document.querySelectorAll('.cont-list').forEach(e => e.className ='none')
                this.arrFilm.forEach(item => new Listfilm(item, this))    
            }
            // else if (elem == 'Просмотренные') {
            //     document.querySelectorAll('.cont-list').forEach(e => e.className ='none')
            //     this.arrNoDone = this.parent.arrFilm.filter(item => {return item.status == true})
            //     this.arrNoDone.forEach(item => new Listfilm(item, this))    
            // }
        })
        this.newArr.forEach(item =>  new Listfilm(item, this)); 
    }
}