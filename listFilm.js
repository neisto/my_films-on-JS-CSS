
export default class Listfilm{
    olTask = document.querySelector('.ol');
    desk = document.querySelector('.task-desk');
    btnDoneFilm = document.querySelector('.inpBtn');
    element = document.createElement('div');
    filmElement = document.createElement('li');
    imgDone = document.createElement('div');
    imgDelete = document.createElement('div');

    constructor(obj, parent, id) {
        this.object = obj
        this.id = id
        this.name = obj.filmName;
        this.type = obj.filmType;
        this.genre = obj.filmGenre;
        this.parent = parent;
        this.status = obj.status
        this.arrDone = parent.arrDone
        this.done();
        this.del();
        this.deskFilm();
    }

    deskFilm(){
        this.element.classList.add('cont-list');
        this.imgDone.classList.add('img-btn');
        this.imgDone.classList.add('img-done');
        this.imgDelete.classList.add('img-btn');
        this.imgDelete.classList.add('img-del');
        this.currentElem = this.parent.arrFilm.filter(item => item === this.object)[0]
        // console.log(this.id);

        if (this.currentElem.status == true) {
            this.filmElement.classList.add('done-text')
            this.imgDone.classList.remove('img-done')
            this.imgDone.classList.add('img-no-done')
        }
        else if (this.currentElem.status == false) {
            this.arrNoDone = this.parent.arrFilm.filter(item => {return item.status == true})
            this.filmElement.classList.remove('done-text')
            this.imgDone.classList.add('img-done')
            this.imgDone.classList.remove('img-no-done')
        }
        this.element.append(this.filmElement);
        this.olTask.append(this.element);
        this.element.append(this.imgDelete);
        this.element.append(this.imgDone);
        this.filmElement.innerHTML = `<b>${this.type}</b> - "<b class='red'>${this.name}</b>", жанр: <b '>${this.genre}</b>`
        // АППЕЕНД ПРЕПЕНД?????????????????????
        // this.element.prepend(this.imgDelete)
        // this.element.prepend(this.imgDone)
    }

    done(){
     
        this.imgDone.addEventListener('click', ()=>{
            this.currentElem = this.parent.arrFilm.filter(item => item === this.object)[0]
            if (this.currentElem.status == false) {
                this.filmElement.classList.add('done-text')
                this.imgDone.classList.remove('img-done')
                this.imgDone.classList.add('img-no-done')
                this.currentElem.status = true
                this.status = true
                this.parent.api.editFilm(this.object, this.id)
                    .catch(()=> console.log('ошибки изменения фильма'))
            }
            else if (this.currentElem.status == true) {
                this.arrNoDone = this.parent.arrFilm.filter(item => {return item.status == true})
                this.filmElement.classList.remove('done-text')
                this.imgDone.classList.add('img-done')
                this.imgDone.classList.remove('img-no-done')
                this.currentElem.status = false
                this.status = false
                this.parent.api.editFilm(this.object, this.id)
                    .catch(()=> console.log('ошибки изменения фильма'))

            }

        })
    }
    
    del(){
        this.imgDelete.addEventListener('click', ()=>{
        this.element.remove() 
        this.parent.arrFilm = this.parent.arrFilm.filter(item => {return item.filmName !== this.object.filmName})
        this.parent.api.deleteFilm(this.obj, this.id)
            .catch(()=> console.log('ошибки удаления фильма'))

        }) 
            
    }
}

