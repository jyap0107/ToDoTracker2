// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

class ListLink extends Component {
    constructor(props) {
        super(props);
        // DISPLAY WHERE WE ARE
        // console.log("\t\t\tListLink " + this.props.toDoList.key + " constructor");
        this.textInput = React.createRef();
        this.focusRef = this.focusRef.bind(this);
    }
    focusRef = () => {
        this.textInput.current.focus();
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
            listLink = <input autoFocus
            className={this.props.currentList == this.props.toDoList ? "todo-list-button highlight" : "todo-list-button"}
            defaultValue={this.props.toDoList.name}
            ref={this.textInput}
            onBlur={(e) => this.props.swapToDiv(this.props.id, e.target.value, "firstList")}
            onClick={this.focusRef}></input>
        }
        else {
            listLink = <div 
            className={this.props.currentList == this.props.toDoList ? "todo-list-button highlight yellow" : "todo-list-button"}
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