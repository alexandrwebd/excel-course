import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
  }

  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  //инициализирую общий метод для добавления прослошек
  init () {
    this.initDOMListeners()
  }

  //инициализирую общий метод для удаления прослошек
  destroy() {
    this.removeDOMListeners()
  }
}
