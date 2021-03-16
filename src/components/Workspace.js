// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import ToDoItem from './ToDoItem'
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import AddBox from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';

class Workspace extends Component {
    constructor(props) {
        super(props);
    }
    handleClick() {
        
    }
    render() {

        return (
            <div id="workspace">
                <div id="todo-list-header-card" className="list-item-card">
                    <div id="task-col-header" className="item-col todo-button">Task</div>
                    <div id="date-col-header" className="item-col todo-button">Due Date</div>
                    <div id="status-col-header" className="item-col todo-button">Status</div>
                    <div id="list-control-header" className="item-col" display="flex" flexDirection="row" flexWrap="nowrap">
                        <Undo id="undo-button" className="list-item-control material-icons todo-button" />
                        {/* Can just check currentList = null and handle everything there. */}
                        <Redo id="redo-button" className="list-item-control material-icons todo-button" />
                        <AddBox id="add-item-button" className="list-item-control material-icons todo-button"
                        onClick={this.props.addNewItemToList} />
                        <Delete 
                            id={this.props.currentListActive ? "delete-list-button" : ""} className="material-icons"
                            className = {this.props.currentListActive ? "todo-button list-item-control" : ""}
                            // perhaps ternary onclick
                            onClick = {this.props.toggleDeleteListConfirmation}/>
                        <Close
                            id="close-list-button"
                            className="list-item-control material-icons todo-button"
                            onClick={this.props.closeList} />
                    </div>
                </div>
                <div id="todo-list-items-div">
                    {
                        this.props.toDoListItems.map((toDoListItem) => (
                        <ToDoItem
                            position={this.props.toDoListItems.indexOf(toDoListItem)}
                            maxPosition={this.props.toDoListItems.length - 1}
                            key={toDoListItem.id}
                            toDoListItem={toDoListItem}
                            swapToInput={this.props.swapToInput}     // PASS THE ITEM TO THE CHILDREN
                            swapToDiv={this.props.swapToDiv}
                            swapToStatus={this.props.swapToStatus}
                            clickedOn={this.props.clickedOn}
                            clickedId={this.props.clickedId}
                            handleDescriptionChange={this.props.handleDescriptionChange}
                            handleDueDateChange={this.props.handleDueDateChange}
                            handleStatusChange={this.props.handleStatusChange}
                            moveItemUp={this.props.moveItemUp}
                            moveItemDown={this.props.moveItemDown}
                            deleteItem={this.props.deleteItem}
                        />))
                    }
                </div>
                <br />
            </div>
        );
    }
}

export default Workspace;