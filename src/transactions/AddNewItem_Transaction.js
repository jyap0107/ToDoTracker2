import { jsTPS_Transaction } from '../common/jsTPS';

export default class AddNewItem_Transaction extends jsTPS_Transaction {
    constructor(initApp) {
        super()
        this.app = initApp;
    }
    doTransaction() {
        console.log("Crikey");
        this.id = this.app.addNewItemToList();
    }
    undoTransaction() {
        console.log("mikey");
        this.app.deleteItem(this.id);
    }
}