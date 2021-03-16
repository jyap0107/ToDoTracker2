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
        // Detect outside click
        // this.wrapperRef = React.createRef();
        // this.setWrapperRef = this.setWrapperRef.bind(this);
        // this.handleClickOutside = this.handleClickOutside.bind(this, this.props.swapToDiv);
    }
    // setWrapperRef(node) {
    //     this.wrapperRef = node;
    //   }
    // componentDidMount = () => {
    //     // DISPLAY WHERE WE ARE
    //     console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " did mount");
    //     document.addEventListener('mousedown', this.handleClickOutside);
    // }
    // componentWillUnmount = () => {
    //     document.removeEventListener('mousedown', this.handleClickOutside);
    // }
    // handleClickOutside(event) {
    //     if (this.wrapperRef && typeof this.wrapperRef.current === 'undefined' && !this.wrapperRef.contains(event.target)){
    //         [Somehow insert callback here?]
    //     }
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
            description = <input
                ref={this.setWrapperRef} 
                className='item-col task-col'
                defaultValue={listItem.description} 
                onChange={(e) => this.props.handleDescriptionChange(e.target.value, listItem.id)}></input>
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
            dueDate = <input
                className='item-col task-col'
                type="date"
                defaultValue={listItem.due_date}
                onChange={(e) => this.props.handleDueDateChange(e.target.value, listItem.id)}></input>
        }
        else {
            dueDate = <div
            className='item-col task-col'
            onClick={this.props.swapToInput.bind(this, listItem.id, "dueDate")}>{listItem.due_date}
            </div>
        }
        let status;
        if (this.props.clickedOn == "status" && listItem.id == this.props.clickedId) {
            status = <select
                className='item-col task-col'
                defaultValue={listItem.status}
                onChange={(e) => this.props.handleStatusChange(e.target.value, listItem.id)}>
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