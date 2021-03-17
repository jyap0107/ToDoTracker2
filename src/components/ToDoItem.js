// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';

class ToDoItem extends Component {
    constructor(props) {
        super(props);
        this.id = -1;
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " constructor");
        this.textInput = React.createRef();
        this.focusRef = this.focusRef.bind(this);
    }
    focusRef = () => {
        this.textInput.current.focus();
    }
    showIt = () => {
        console.log("chocco mate");
    }
    // hideIt = () => {
    //     this.props.swapToDiv(this, l);
    // }
    render() {
        // DISPLAY WHERE WE ARE
        // console.log("\t\t\tToDoItem render");
        let listItem = this.props.toDoListItem;
        this.id = listItem.id;
        let statusType = "status-complete";
        if (listItem.status === "incomplete")
            statusType = "status-incomplete";
        //Set description
        let description;
        if (this.props.clickedOn == "description" && listItem.id == this.props.clickedId) {
            description = <input autoFocus
                className='item-col task-col'
                defaultValue={listItem.description}
                ref={this.textInput}
                onFocus={this.showIt}
                onBlur={(e) => this.props.swapToDiv(listItem.id, e.target.value, "description")}
                onClick={this.focusRef}></input>
        }
        else {
            description = <div 
            className='item-col task-col'
            onClick={this.props.swapToInput.bind(this, listItem.id, "description")}>{listItem.description}
            </div>
        }
        //Set due date
        let dueDate;
        if (this.props.clickedOn == "dueDate" && listItem.id == this.props.clickedId) {
            dueDate = <input autoFocus
                className='item-col task-col'
                type="date"
                defaultValue={listItem.due_date}
                ref={this.textInput}
                onFocus={this.showIt}
                onClick={this.focusRef}
                onBlur={(e) => this.props.swapToDiv(listItem.id, e.target.value, "dueDate")}></input>
        }
        else {
            dueDate = <div
            className='item-col task-col'
            onClick={this.props.swapToInput.bind(this, listItem.id, "dueDate")}>{listItem.due_date}
            </div>
        }
        let status;
        if (this.props.clickedOn == "status" && listItem.id == this.props.clickedId) {
            status = <select autoFocus
                className='item-col task-col'
                defaultValue={listItem.status}
                ref={this.textInput}
                onFocus={this.showIt}
                onClick={this.focusRef}
                onBlur={(e) => this.props.swapToDiv(listItem.id, e.target.value, "status")}>
                    <option value="complete">Complete</option>
                    <option value="incomplete">Incomplete</option>
                </select>
        }
        else {
            status = <div
            className='item-col task-col'
            className={listItem.status == "complete" ? "item-col task-col yellow" : "item-col task-col blue"}
            onClick={this.props.swapToStatus.bind(this, listItem.id, "status")}>{listItem.status}
            </div>
        }
        return (
            <div id={'todo-list-item-' + listItem.id} className='list-item-card'>
                {description}
                {dueDate}
                {status}
                <div className='item-col list-controls-col'>
                    <KeyboardArrowUp 
                        className={this.props.position != 0 ? 'list-item-control todo-button' : "disabled"}
                        onClick={this.props.moveItemUp.bind(this, listItem.id)} />
                    <KeyboardArrowDown 
                        className={this.props.position != this.props.maxPosition ? 'list-item-control todo-button' : "disabled"}
                        onClick={this.props.moveItemDown.bind(this, listItem.id)} />
                    <Close 
                        className='list-item-control todo-button'
                        onClick={this.props.deleteItem.bind(this, listItem.id)} />
                    <div className='list-item-control'></div>
        <div className='list-item-control'></div>
                </div>
            </div>
        )
    }
}

export default ToDoItem;