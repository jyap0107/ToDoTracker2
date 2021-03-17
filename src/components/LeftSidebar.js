// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import ListLink from './ListLink'
import AddBox from '@material-ui/icons/AddBox';

class LeftSidebar extends Component {
    constructor(props) {
        super(props);
    }

    handleAddNewList = () => {
        this.props.addNewListCallback();
    }

    render() {
        return (
            <div id="left-sidebar">
                <div id="left-sidebar-header" class="section-header">
                    <span class="left-sidebar-header-text">Todolists</span>
                    <span class="left-sidebar-controls" id={this.props.currentList.id == null ? "add-undo-redo-box" : "disabled"}>
                        <AddBox 
                            id="add-list-button"
                            className={this.props.currentList.id == null ? "material-icons todo_button" : "disabled"}
                            onClick={this.props.currentList.id == null ? this.handleAddNewList : undefined} />
                    </span>
                </div>
                <div id="todo-lists-list">
                {
                    this.props.toDoLists.map((toDoList) => (
                        <ListLink
                            key={toDoList.id}
                            id={toDoList.id}
                            clickedOn={this.props.clickedOn}
                            clickedId={this.props.clickedId}
                            position={this.props.toDoLists.indexOf(toDoList)}
                            swapToInput={this.props.swapToInput}
                            swapToDiv={this.props.swapToDiv}
                            currentList={this.props.currentList}
                            toDoList={toDoList}                                // PASS THE LIST TO THE CHILDREN
                            loadToDoListCallback={this.props.loadToDoListCallback}
                            handleListNameChange={this.props.handleListNameChange} />  // PASS THE CALLBACK TO THE CHILDREN
                    ))
                }
                </div>
            </div>
        );
    }
}

export default LeftSidebar;