export default function formData() {
    const inputFilmName = document.querySelector('.input-film');
    const optionType = document.querySelector('.select-type');
    const optionGenre = document.querySelector('.select-genre');
    return {filmName: inputFilmName.value, filmType: optionType.value, filmGenre: optionGenre.value, status: false}
}

//функция сбора данных с инпута