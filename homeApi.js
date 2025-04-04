class Api{
    constructor() {
        this.url = 'http://localhost:3000/'
    }

    // создал метод для получения данных с сервера
    getFilm(){
        return fetch(this.url + 'api/todos')  // fetch - метод запроса на сервер который по результатам возвращает на м промис который надо обработать
            .then(responce => responce.json()) // then - Обработчик положительного результата промиса
    }

    // создал метод для отправки данных на сервер
    addFilm(body){
        return fetch(this.url + 'api/todos', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(body)
        }).then(responce => responce.json())
    }

    deleteFilm(body, id){
        return fetch(this.url + 'api/todos/' + id, {
            method : 'DELETE',
            body: JSON.stringify(body)
        })
    }

    editFilm(body, id){
        return fetch(this.url + 'api/todos/' + id, {
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(body)  
        })
    } 
    }

    export const api = new Api()
