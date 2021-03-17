import { jsTPS_Transaction } from '../common/jsTPS';

export default class MoveItemUp_Transaction extends jsTPS_Transaction {
    constructor(initApp, id) {
        super()
        this.app = initApp;
        this.id = id;
    }
    //Can track position for undoing instead of doing an ID search again.
    doTransaction() {
        this.app.moveItemDown(this.id);
    }
    undoTransaction() {
        console.log("what do way!")
        this.app.moveItemUp(this.id);
    }
}