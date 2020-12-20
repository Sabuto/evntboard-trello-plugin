const axios = require('axios')

class TrelloPlugin {

  constructor(options, { evntBus, logger }) {
    // plugin options
    this.key = options?.key
    this.token = options?.token

    // default field
    this.evntBus = evntBus
    this.logger = logger

    this.boards = new Map()
  }

  async load() {
    this.evntBus?.newEvent('trello-plugin-load')
    //if(this.key === '' || this.token === '') {
      //throw new Error('You must initialise with a key and a token.')
    //}

    try{
      const assignBoards = await axios.get(`https://api.trello.com/1/members/me/boards?key=${this.key}&token=${this.token}`)
      const data = assignBoards.data

      for(let i=0; i < data.length; i++) {
        this.boards.set(data[i].name, data[i])
      }
    } catch (e) {
      this.logger.log(e)
    }
  }

  async unload() {
    this.evntBus?.newEvent('trello-plugin-unload')
  }

  async getBoard(boardName) {
    return this.boards.get(boardName)
  }

  async addCard(boardName, list, name, desc) {
    let chosenList = null;
    const chosenBoard = await this.getBoard(boardName)
    const listApi = await axios.get(`https://api.trello.com/1/boards/${chosenBoard.id}/lists/all?key=${this.key}&token=${this.token}`)
    let data = listApi.data
    for (let i=0;i<data.length; i++) {
      if(data[i].name === list) {
        chosenList = data[i].id
      }
    }
    const update = await axios.post(`https://api.trello.com/1/cards?key=${this.key}&token=${this.token}&idList=${chosenList}&name=${name}&desc=${desc}`)

    if(update.status == '200') {
      this.evntBus?.newEvent('trello-plugin-addCard', { response: 'Success' })
    } else {
      this.evntBus?.newEvent('trello-plugin-addCard', { response: 'Failed' })
    }

    return update
  }

  async reload() {
    await this.unload();
    await this.load();
  }
}

module.exports = TrelloPlugin
