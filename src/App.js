// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import testData from './test/testData.json'
import jsTPS from './common/jsTPS'

// THESE ARE OUR REACT COMPONENTS
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import Workspace from './components/Workspace'
import DeleteListConfirmation from './components/DeleteListConfirmation'
{/*import ItemsListHeaderComponent from './components/ItemsListHeaderComponent'
import ItemsListComponent from './components/ItemsListComponent'
import ListsComponent from './components/ListsComponent'
*/}
class App extends Component {
  constructor(props) {
    // ALWAYS DO THIS FIRST
    super(props);

    // DISPLAY WHERE WE ARE
    console.log("App constructor");

    // MAKE OUR TRANSACTION PROCESSING SYSTEM
    this.tps = new jsTPS();

    // CHECK TO SEE IF THERE IS DATA IN LOCAL STORAGE FOR THIS APP
    let recentLists = localStorage.getItem("recentLists");
    console.log("recentLists: " + recentLists);
    if (!recentLists) {
      recentLists = JSON.stringify(testData.toDoLists);
      localStorage.setItem("toDoLists", recentLists);
    }
    recentLists = JSON.parse(recentLists);

    // FIND OUT WHAT THE HIGHEST ID NUMBERS ARE FOR LISTS
    let highListId = -1;
    let highListItemId = -1;
    for (let i = 0; i < recentLists.length; i++) {
      let toDoList = recentLists[i];
      if (toDoList.id > highListId) {
        highListId = toDoList.id;
      }
      for (let j = 0; j < toDoList.items.length; j++) {
        let toDoListItem = toDoList.items[j];
        if (toDoListItem.id > highListItemId)
        highListItemId = toDoListItem.id;
      }
    };

    // SETUP OUR APP STATE
    this.state = {
      toDoLists: recentLists,
      currentList: {items: []},
      nextListId: highListId+1,
      nextListItemId: highListItemId+1,
      useVerboseFeedback: true,
      showModal: false,
      clickedOn: "",
      clickedId: -1
    }
  }

  // WILL LOAD THE SELECTED LIST
  loadToDoList = (toDoList) => {
    console.log("CLICKED")
    console.log("loading " + toDoList);

    // MAKE SURE toDoList IS AT THE TOP OF THE STACK BY REMOVING THEN PREPENDING
    const nextLists = this.state.toDoLists.filter(testList =>
      testList.id !== toDoList.id
    );
    nextLists.unshift(toDoList);

    this.setState({
      toDoLists: nextLists,
      currentList: toDoList,
      clickedOn: "otherList"
    });
  }
  /*
  Creates three variables:
  newToDoListInList is a a list with a new toDoList inside it.
  newToDoListsList concatenates the list of list to the front of the current toDoLists.
  newToDoList is the first list, which is the new one, just for currentList
  */
  addNewList = () => {
    let newToDoListInList = [this.makeNewToDoList()];
    let newToDoListsList = [...newToDoListInList, ...this.state.toDoLists];
    let newToDoList = newToDoListInList[0];

    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState({
      toDoLists: newToDoListsList,
      currentList: newToDoList,
      nextListId: this.state.nextListId+1
    }, this.afterToDoListsChangeComplete);
  }

  makeNewToDoList = () => {
    console.log(this.state.nextListId);
    let newToDoList = {
      id: this.state.nextListId,
      name: 'Untitled',
      items: []
    };
    console.log(newToDoList);
    return newToDoList;
  }

  makeNewToDoListItem() {
    console.log("ran?");
    console.log(this.highListItemId)
    let newToDoListItem = {
      description: "No Description",
      dueDate: "none",
      status: "incomplete",
      id: this.state.nextListItemId
    };
    console.log(newToDoListItem);
    return newToDoListItem;
  }
  addNewItemToList = () => {
    console.log("ran??");
    let newItem = this.makeNewToDoListItem();
    this.state.currentList.items.push(newItem);
    this.setState({
      currentList: this.state.currentList,
      nextListItemId: this.state.nextListItemId+1
    })
    
  }
  deleteCurrentList = () => {
    console.log("called");
    this.state.toDoLists.splice(0, 1);
    this.setState({
      toDoLists: this.state.toDoLists,
      currentList: {items: []},
      showModal: !this.state.showModal
    })
  }
  moveItemUp = (id) => {
    for (let i = 1; i < this.state.currentList.items.length; i++) {
      if (id == this.state.currentList.items[i].id) {
        let temp = this.state.currentList.items[i]
        this.state.currentList.items[i] = this.state.currentList.items[i-1];
        this.state.currentList.items[i-1] = temp;
        break;
      }
    }
    this.setState({
      currentList: this.state.currentList
    })
  }
  moveItemDown = (id) => {
    for (let i = this.state.currentList.items.length-2; i >= 0; i--) {
      if (id == this.state.currentList.items[i].id) {
        let temp = this.state.currentList.items[i]
        this.state.currentList.items[i] = this.state.currentList.items[i+1];
        this.state.currentList.items[i+1] = temp;
        break;
      }
    }
    this.setState({
      currentList: this.state.currentList
    })
  }
  deleteItem = (id) => {
    let listFiltered = this.state.currentList.items.filter((item => item.id != id));
    this.state.currentList.items = listFiltered;
    this.setState({
      currentList: this.state.currentList
    })
  }
  swapToInput = (id, clickName) => {
    console.log("Inputty");
    this.setState({
      clickedOn: clickName,
      clickedId: id
    })
  }
  swapToDiv = (id, clickName) => {
    this.setState({
      clickedOn: clickName,
      clickedId: id
    })
  }
  swapToStatus = (id, clickName) => {
    this.setState({
      clickedOn: clickName,
      clickedId: id
    })
  }
  handleDescriptionChange = (value, id) => {
    this.state.currentList.items.map((item) => ((item.id == id ? item.description = value : item.description = item.description)
    ))
  }
  handleDueDateChange = (value, id) => {
    this.state.currentList.items.map((item) => ((item.id == id ? item.due_date = value : item.due_date = item.due_date)
    ))
  }
  handleStatusChange = (value, id) => {
    this.state.currentList.items.map((item) => ((item.id == id ? item.status = value : item.status = item.status)
    ))
  }

  // THIS IS A CALLBACK FUNCTION FOR AFTER AN EDIT TO A LIST
  afterToDoListsChangeComplete = () => {
    console.log("App updated currentToDoList: " + this.state.currentList);

    // WILL THIS WORK? @todo
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("recent_work", toDoListsString);
  }
  toggleDeleteListConfirmation = () => {
    console.log(this.state.currentList);
    if (this.state.currentList.items.length != 0) {
      this.setState({
        showModal: !this.state.showModal
      })
    }
  }
  closeList = () => {
    console.log("called");
    this.setState({
      currentList: {items: []}
    })
  }
  handleListNameChange = (value, id) => {
    console.log("yessss");
      this.state.toDoLists.map((list) => (list.id == id ? list.name = value : list.name = list.name));
      this.setState({
        toDoLists:this.state.toDoLists
      })
  }
  render() {
    let items = this.state.currentList.items;
    return (
      <div id="root">
        <DeleteListConfirmation
          showModal={this.state.showModal}
          closeModal={this.state.showModal}
          deleteCurrentList={this.deleteCurrentList}
          toggleDeleteListConfirmation = {this.toggleDeleteListConfirmation}
        />
        <Navbar />
        <LeftSidebar 
          toDoLists={this.state.toDoLists}
          loadToDoListCallback={this.loadToDoList}
          addNewListCallback={this.addNewList}
          currentList={this.state.currentList}
          swapToInput={this.swapToInput}
          clickedOn={this.state.clickedOn}
          clickedId={this.state.clickedId}
          handleListNameChange={this.handleListNameChange}
        />
        <Workspace 
          toDoListItems={items}
          toggleDeleteListConfirmation = {this.toggleDeleteListConfirmation}
          currentListActive={this.state.currentList.items.length > 0}
          swapToInput={this.swapToInput}
          swapToDiv={this.swapToDiv}
          swapToStatus={this.swapToStatus}
          clickedOn={this.state.clickedOn}
          clickedId={this.state.clickedId}
          handleDescriptionChange={this.handleDescriptionChange}
          handleDueDateChange={this.handleDueDateChange}
          handleStatusChange={this.handleStatusChange}
          addNewItemToList={this.addNewItemToList}
          moveItemUp={this.moveItemUp}
          moveItemDown={this.moveItemDown}
          deleteItem={this.deleteItem}
          closeList={this.closeList}
        />
      </div>
    );
  }
}

export default App;