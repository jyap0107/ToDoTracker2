// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

class ListLink extends Component {
    constructor(props) {
        super(props);
        // DISPLAY WHERE WE ARE
        // console.log("\t\t\tListLink " + this.props.toDoList.key + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " did mount");
    }

    handleLoadList = () => {
        this.props.loadToDoListCallback(this.props.toDoList);
    }

    render() {
        // DISPLAY WHERE WE ARE
        // console.log("\t\t\tListLink render");
        let listLink;
        if (this.props.clickedOn == "firstList" && this.props.id == this.props.currentList.id) {
            listLink = <input 
            className={this.props.currentList == this.props.toDoList ? "todo-list-button highlight" : "todo-list-button"}
            defaultValue={this.props.toDoList.name}
            onChange={(e) => this.props.handleListNameChange(e.target.value, this.props.id)}
        >
        </input>
        }
        else {
            listLink = <div 
            className={this.props.currentList == this.props.toDoList ? "todo-list-button highlight" : "todo-list-button"}
            onClick={this.props.id == this.props.currentList.id ? this.props.swapToInput.bind(this, this.props.id, "firstList"): this.handleLoadList}
        >
            {this.props.toDoList.name}<br />
        </div>
        }
        return (
            <div>{listLink}</div>
            
        )
    }
}

export default ListLink;