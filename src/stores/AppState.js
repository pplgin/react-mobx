import { observable, action, transaction} from 'mobx'
import axios from 'axios'

class AppState {
  @observable items
  @observable item
  @observable time
  @observable pageTitle
  constructor() {
    this.items = []
    this.item = {}
    this.pageTitle = 'test';
    this.time = (new Date()).toLocaleString()
  }

  async fetchData(pathname, id) {
    let {data} = await axios.get(`https://jsonplaceholder.typicode.com${pathname}`)
    console.log(data)
    data.length > 0 ? this.setData(data) : this.setSingle(data)
  }

  @action setData(data) {
    this.items = data
  }

  @action setSingle(data) {
    this.item = data
  }

  @action clearItems() {
    this.items = []
  }

  @action clearItem() {
    this.item = {}
  }

  @action
  changeDate(){

    transaction(() => {
      this.time = (new Date()).toLocaleString()
      this.pageTitle = '这个是一个新的title' + (Math.random()*1000)
    });
  }
}

export default AppState;