import { jsTPS_Transaction } from '../common/jsTPS';

export default class DueDateChange_Transaction extends jsTPS_Transaction {
    constructor(initApp, value, id) {
        super()
        this.app = initApp;
        this.value = value;
        this.id = id;
    }
    doTransaction() {
        this.prevValue = this.app.getItemAttribute(this.id, "dueDate");
        console.log(this.prevValue);
        this.app.handleDueDateChange(this.value, this.id);
    }
    undoTransaction() {
        this.app.handleDueDateChange(this.prevValue, this.id);
    }
}