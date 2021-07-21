import {$} from "../../core/dom";

export class Excel {
    constructor(selector, options) {
        // получаю контейнер app по входящему селектору
        this.$el = $(selector)
        // получаю массив классов компонентов
        this.components = options.components || []
    }

    getRoot() {
        // c помощью кастомного метода $root создаю пустой div, добавляю главный класс

        const $root =  $.create('div', 'excel')

        // прохожу по входящему массиву классов и создаю экземпляр каждого
        this.components = this.components.map(Component => {
            // создаю новый элемент и передаю его в конструктор компонента от которого создаються экземпляры
            // добавляю еще классы со статического свойства
            const $el =  $.create('div', Component.className)

            const component = new Component($el) // наследнеик excel компонента

            // DEBUG
            // if (component.name) {
            //     window['c' + component.name] = component
            // }
            // добавляю элементу разметку каждого класса общим методом html и toHTML
            $el.html(component.toHTML())
            // помещаю в главный контейнер разметку каждого из классов
            $root.append($el)
            return component
        })

        return $root
    }

    // аппендит в основной див app шаблоны
    render() {
        this.$el.append(this.getRoot())
        this.components.forEach(component => component.init())
    }
}