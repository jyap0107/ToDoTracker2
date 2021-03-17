import { jsTPS_Transaction } from '../common/jsTPS';

export default class StatusChange_Transaction extends jsTPS_Transaction {
    constructor(initApp, value, id) {
        super()
        this.app = initApp;
        this.value = value;
        this.id = id;
    }
    doTransaction() {
        this.prevValue = this.app.getItemAttribute(this.id, "status");
        console.log(this.prevValue);
        this.app.handleStatusChange(this.value, this.id);
    }
    undoTransaction() {
        this.app.handleStatusChange(this.prevValue, this.id);
    }
}