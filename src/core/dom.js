// утилита позволяющая проще работать с DOM (аналог jQuery)

class Dom {
    constructor(selector) {
       this.$el = typeof selector === 'string'
           ? document.querySelector(selector)
           : selector
    }

    // кастомный метод html, (аналог jQuery)
    html(html) {
        // если передали html то используем как сеттер и присваиваем
        if(typeof html === 'string') {
            this.$el.innerHTML = html
            return this // обязательно нужно чтото возвращать чтоб делать chein
        }
        // если ничего не передали то используем как геттер и получаем html
        return this.$el.outerHTML.trim()
    }

    // очищает html
    clear() {
        // чтоб очистить вызываю метод html с пустой стракой
        this.html('')
        return this
    }

    //универсальный метод для добавления событий
    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    //универсальный метод для удаления событий
    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }



    // аппендит готовые ноды в корневой контейнер
    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }
        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }
        return this
    }
}

// экспортирую функцию $ которой буду добавлять нужные кастомные методы
export function $(selector) {
    return new Dom(selector)
}

// добавляю метод create который создает новый dom элемент и добавляет ему класс если нужно
$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if(classes) {
        el.classList.add(classes)
    }

    return $(el)
}