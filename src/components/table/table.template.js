//код 1 и последней цыфры алфавита, оаределяем сколько столбцов нам нужно делать
const CODES = {
    A: 65,
    Z: 90
}

function toCell() {
    return `
        <div class="cell" contenteditable></div>
    `
}

function toColumn(col) {
    return `
        <div class="column">${col}</div>
    `
}

function createRow(index, content) {
    return `
        <div class="row">
            <div class="row-info">${index ? index : ''}</div>
            <div class="row-data">${content}</div>
        </div>
    `

}

// приводит к символу
function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

// рисует колонки таблицы
export function createTable(rowsCount = 15) {
    // диапазон столбцов таблицы, количество столбцов
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    // создаю массив с количеством colsCount, заполняю его пустыми строками
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('')

    // заношу в массив шапку таблицы
    rows.push(createRow(null ,cols))

    // заношу в массив строки cell
    for (let i = 0; i < colsCount; i++){
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell)
            .join('')

        rows.push(createRow(i + 1, cells))
    }


    return rows.join('')
}