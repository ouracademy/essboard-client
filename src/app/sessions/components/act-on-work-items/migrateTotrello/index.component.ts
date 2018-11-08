import { Component, OnInit, OnDestroy, Input } from '@angular/core'
declare var Trello: any

@Component({
  selector: 'trello',
  templateUrl: 'index.component.html'
})
export class TrelloComponent implements OnInit, OnDestroy {
  @Input() apiKey
  @Input() actions: any[]
  @Input() sessionNumber: number
  idBoard: string
  idList: string
  private error = errorMsg => {
    console.log('error: ', errorMsg)
  }

  ngOnInit() {
    let my_awesome_script = document.createElement('script')
    let path = 'http://api.trello.com/1/client.js?key=' + this.apiKey
    my_awesome_script.setAttribute('src', path)
    document.head.appendChild(my_awesome_script)
  }
  ngOnDestroy() {}

  exportToTrello() {
    this.createBoard()
  }

  private createBoard() {
    let newBoard = { name: 'Prueba ' + this.sessionNumber }
    Trello.post(
      '/boards/',
      newBoard,
      board => {
        this.createList(board.id)
      },
      this.error
    )
  }

  private createList(boardId: string) {
    let newList = { name: 'Tareas Ar', idBoard: boardId }
    Trello.post(
      '/lists/',
      newList,
      list => {
        console.log('idList', list.id)
        this.createCards(list.id)
      },
      this.error
    )
  }

  private createCards(listId: string) {
    for (let action of this.actions) {
      this.createCard(listId, action.name)
    }
  }

  private createCard(listId: string, name: string) {
    let newCard = { name: name, desc: 'Estado:', idList: listId }
    Trello.post(
      '/cards/',
      newCard,
      card => {
        console.log(card)
      },
      this.error
    )
  }

  authInTrello() {
    Trello.authorize({
      type: 'popup',
      name: 'Getting Started Application',
      scope: {
        read: 'true',
        write: 'true'
      },
      expiration: 'never',
      success: this.authenticationSuccess,
      error: this.authenticationFailure
    })
  }

  authenticationSuccess() {
    console.log('Successful authentication')
  }
  authenticationFailure() {
    console.log('Failed authentication')
  }
}
