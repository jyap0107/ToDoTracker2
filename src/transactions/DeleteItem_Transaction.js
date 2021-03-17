import { jsTPS_Transaction } from '../common/jsTPS';

export default class DeleteItem_Transaction extends jsTPS_Transaction {
    constructor(initApp, id) {
        super()
        this.app = initApp;
        this.id = id;
    }
    doTransaction() {
        console.log("do delete item")
        let array = this.app.deleteItem(this.id);
        this.item = array[0];
        this.position = array[1];
    }
    undoTransaction() {
        this.app.addItemAtIndex(this.item, this.position);
        console.log("undo delete item");
    }
}