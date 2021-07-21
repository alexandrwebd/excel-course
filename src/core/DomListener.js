import {logEntryPolyfills} from "@babel/preset-env/lib/debug";
import {capitalize} from "./utils";

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error(`No $root provided for DomListener!`)
        }
        this.$root = $root
        this.listeners = listeners
    }
    //добавляет слушателей
    initDOMListeners() {
        // прохожу по массиву возможных событий, строчки
        this.listeners.forEach(listener => {
            // получаю название метода
            const method = getMethodName(listener)
            if (!this[method]) {
                const name = this.name || ''
                throw new Error(
                    `Method ${method} is not implemented in ${name} Component`
                )
            }
            // переопределяю метод и сохраняю в него контекст
            this[method] = this[method].bind(this)
            // Тоже самое что и addEventListener
            this.$root.on(listener, this[method])
        } )
    }

    //удаляет слушателей

    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            // для удаления передаю сам листенер и туже функцию
            this.$root.off(listener, this[method])
        })
        //реализовать
    }
}
// метод канкатенирует строчку on к событию input => onInput
function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}