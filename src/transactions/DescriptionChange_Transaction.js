import { jsTPS_Transaction } from '../common/jsTPS';

export default class DescriptionChange_Transaction extends jsTPS_Transaction {
    constructor(initApp, value, id) {
        super()
        this.app = initApp;
        this.value = value;
        this.id = id;
    }
    doTransaction() {
        this.prevValue = this.app.getItemAttribute(this.id, "description");
        this.app.handleDescriptionChange(this.value, this.id);
    }
    undoTransaction() {
        console.log("what");
        this.app.handleDescriptionChange(this.prevValue, this.id);
    }
}