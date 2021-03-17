// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import testData from './test/testData.json'
import jsTPS from './common/jsTPS'

// THESE ARE OUR REACT COMPONENTS
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import Workspace from './components/Workspace'
import DeleteListConfirmation from './components/DeleteListConfirmation'
import AddNewItem_Transaction from './transactions/AddNewItem_Transaction'
import DeleteItem_Transaction from './transactions/DeleteItem_Transaction'
import DescriptionChange_Transaction from './transactions/DescriptionChange_Transaction'
import DueDateChange_Transaction from './transactions/DueDateChange_Transaction'
import StatusChange_Transaction from './transactions/StatusChange_Transaction'
import MoveItemUp_Transaction from './transactions/MoveItemUp_Transaction';
import MoveItemDown_Transaction from './transactions/MoveItemDown_Transaction'
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
      clickedId: -1,
      hasUndo: false,
      hasRedo: false
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log(prevState.currentList.items[0]);
  // }
  // WILL LOAD THE SELECTED LIST
  loadToDoList = (toDoList) => {
    console.log("loading " + toDoList);

    // MAKE SURE toDoList IS AT THE TOP OF THE STACK BY REMOVING THEN PREPENDING
    const nextLists = this.state.toDoLists.filter(testList =>
      testList.id !== toDoList.id
    );
    nextLists.unshift(toDoList);

    this.setState({
      toDoLists: nextLists,
      currentList: toDoList,
      clickedOn: "otherList",
      hasUndo: false,
      hasRedo: false
    });
    this.tps.clearAllTransactions();
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
    let newToDoList = {
      id: this.state.nextListId,
      name: 'Untitled',
      items: []
    };
    return newToDoList;
  }

  makeNewToDoListItem() {
    let newToDoListItem = {
      description: "No Description",
      dueDate: "none",
      status: "incomplete",
      id: this.state.nextListItemId
    };
    return newToDoListItem;
  }
  addNewItemToList = () => {
    let newItem = this.makeNewToDoListItem();
    this.state.currentList.items.push(newItem);
    let id = this.state.nextListItemId;
    console.log(this.tps.hasTransactionToRedo());
    this.setState({
      currentList: this.state.currentList,
      nextListItemId: this.state.nextListItemId+1
    })
    return id;
  }
  addItemAtIndex = (item, index) => {
    this.state.currentList.items.splice(index, 0, item);
    this.setState({
      currentList: this.state.currentList,
    })
  }
  addCustomItemToList = (desc, due, stat, givenId) => {
    let newItem = {
      description: desc,
      dueDate: due,
      status: stat,
      id: givenId
    };
    this.state.currentList.items.push(newItem);
    let id = this.state.nextListItemId;
    this.setState({
      currentList: this.state.currentList,
      nextListItemId: this.state.nextListItemId+1,
    })
    return id;
  }
  deleteCurrentList = () => {
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
      currentList: this.state.currentList,
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
      currentList: this.state.currentList,
    })
  }
  deleteItem = (id) => {
    let item;
    let position = 0;
    for (let i = 0; i < this.state.currentList.items.length; i++) {
      if (this.state.currentList.items[i].id == id) {
        item = this.state.currentList.items[i];
        position = i;
        this.state.currentList.items.splice(i, 1);
        break;
      }
    }
    this.setState({
      currentList: this.state.currentList,
    })
    return [item, position];
  }
  swapToInput = (id, clickName) => {
    this.setState({
      clickedOn: clickName,
      clickedId: id
    })
  }
  swapToDiv = (id, value, clickName) => {
    if (clickName == "description") {
      this.descriptionChangeTransaction(value, id)
    }
    if (clickName == "dueDate") {
      this.dueDateChangeTransaction(value, id);
    }
    if (clickName == "status") {
      this.statusChangeTransaction(value, id);
    }
    if (clickName == "firstList") {
      this.handleListNameChange(value, id);
    }
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
    this.setState({
      currentList: this.state.currentList,
      clickedOn: "",
      clickedId: "",
    })
  }
  handleDueDateChange = (value, id) => {
    this.state.currentList.items.map((item) => ((item.id == id ? item.due_date = value : item.due_date = item.due_date)
    ))
    this.setState({
      currentList: this.state.currentList,
      clickedOn: "",
      clickedId: "",
    })
  }
  handleStatusChange = (value, id) => {
    this.state.currentList.items.map((item) => ((item.id == id ? item.status = value : item.status = item.status)
    ))
    this.setState({
      currentList: this.state.currentList,
      clickedOn: "",
      clickedId: "",
    })
  }

  // THIS IS A CALLBACK FUNCTION FOR AFTER AN EDIT TO A LIST
  afterToDoListsChangeComplete = () => {
    console.log("App updated currentToDoList: " + this.state.currentList);

    // WILL THIS WORK? @todo
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("recent_work", toDoListsString);
  }
  toggleDeleteListConfirmation = () => {
    if (this.state.currentList.id != null) {
      this.setState({
        showModal: !this.state.showModal
      })
    }
  }
  closeList = () => {
    this.setState({
      currentList: {items: []}
    })
  }
  handleListNameChange = (value, id) => {
      this.state.toDoLists.map((list) => (list.id == id ? list.name = value : list.name = list.name));
      this.setState({
        toDoLists:this.state.toDoLists,
        clickedOn: "",
        clickedId:""
      })
  }
  getItemAttribute = (id, attribute) => {
    let items = this.state.currentList.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].id == id) {
        if (attribute == "description") {
          return items[i].description;
        }
        if (attribute == "dueDate") {
          return items[i].due_date;
        }
        if (attribute == "status") {
          return items[i].status;
        }
        break;
      }
    }
    return;
  }
  undo = () => {
    this.tps.undoTransaction();
    // Can set state elsewhere and add or subtract from return value from hasUndo/redo
    this.setState({
      hasUndo: this.tps.hasTransactionToUndo(),
      hasRedo: this.tps.hasTransactionToRedo()
    })
  }
  redo = () => {
    this.tps.doTransaction();
    this.setState({
      hasUndo: this.tps.hasTransactionToUndo(),
      hasRedo: this.tps.hasTransactionToRedo()
    })
  }
  addNewItemTransaction = () => {
    let transaction = new AddNewItem_Transaction(this);
    this.tps.addTransaction(transaction);
    this.setState({
      hasUndo: this.tps.hasTransactionToUndo(),
      hasRedo: this.tps.hasTransactionToRedo()
    })
  }
  deleteItemTransaction = (id) => {
    let transaction = new DeleteItem_Transaction(this, id);
    this.tps.addTransaction(transaction);
    this.setState({
      hasUndo: this.tps.hasTransactionToUndo(),
      hasRedo: this.tps.hasTransactionToRedo()
    })
  }
  descriptionChangeTransaction = (value, id) => {
    if (value == this.getItemAttribute(id, "description")) {
      this.setState({
        clickedOn: "",
        clickedId: "",
      })
      return;
    }
    let transaction = new DescriptionChange_Transaction(this, value, id);
    this.tps.addTransaction(transaction);
    this.setState({
      hasUndo: this.tps.hasTransactionToUndo(),
      hasRedo: this.tps.hasTransactionToRedo()
    })
  }
  dueDateChangeTransaction = (value, id) => {
    if (value == this.getItemAttribute(id, "dueDate")) {
      this.setState({
        clickedOn: "",
        clickedId: "",
      })
      return;
    }
    let transaction = new DueDateChange_Transaction(this, value, id);
    this.tps.addTransaction(transaction);
    this.setState({
      hasUndo: this.tps.hasTransactionToUndo(),
      hasRedo: this.tps.hasTransactionToRedo()
    })
  }
  statusChangeTransaction = (value, id) => {
    if (value == this.getItemAttribute(id, "status")) {
      this.setState({
        clickedOn: "",
        clickedId: "",
      })
      return;
    }
    let transaction = new StatusChange_Transaction(this, value, id);
    this.tps.addTransaction(transaction);
    this.setState({
      hasUndo: this.tps.hasTransactionToUndo(),
      hasRedo: this.tps.hasTransactionToRedo()
    })
  }
  moveItemUpTransaction = (id) => {
    let transaction = new MoveItemUp_Transaction(this, id);
    this.tps.addTransaction(transaction);
    this.setState({
      hasUndo: this.tps.hasTransactionToUndo(),
      hasRedo: this.tps.hasTransactionToRedo()
    })
  }
  moveItemDownTransaction = (id) => {
    let transaction = new MoveItemDown_Transaction(this, id);
    this.tps.addTransaction(transaction);
    this.setState({
      hasUndo: this.tps.hasTransactionToUndo(),
      hasRedo: this.tps.hasTransactionToRedo()
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
          swapToDiv={this.swapToDiv}
          clickedOn={this.state.clickedOn}
          clickedId={this.state.clickedId}
          handleListNameChange={this.handleListNameChange}
        />
        <Workspace 
          toDoListItems={items}
          toggleDeleteListConfirmation = {this.toggleDeleteListConfirmation}
          currentListActive={this.state.currentList.id != null}
          swapToInput={this.swapToInput}
          swapToDiv={this.swapToDiv}
          swapToStatus={this.swapToStatus}
          clickedOn={this.state.clickedOn}
          clickedId={this.state.clickedId}
          addNewItemToList={this.addNewItemTransaction}
          moveItemUp={this.moveItemUpTransaction}
          moveItemDown={this.moveItemDownTransaction}
          deleteItem={this.deleteItemTransaction}
          closeList={this.closeList}
          undo={this.undo}
          redo={this.redo}
          hasUndo={this.state.hasUndo}
          hasRedo={this.state.hasRedo}
        />
      </div>
    );
  }
}

export default App;