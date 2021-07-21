// Pure functions (чистая функция) - всегда возвращает результат на основании входящих параметров
// возвращает строчку кемелкейс
export function capitalize(string) {

    // если пришла не строчка, выхожу
    if(typeof string !== 'string') {
        return ''
    }
    // привожу первую букву к верхнему регистру(удаляю лишнюю литеру)
    return string.charAt(0).toUpperCase() + string.slice(1)
}