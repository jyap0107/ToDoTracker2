// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

class DeleteListConfirmation extends Component {
    constructor(props) {
        super(props);
    }
    onClose = () => {
        
    }

    render() {
        if (!this.props.showModal) {
            return null;
        }
        return (
            <div id="modal-container">
                <div id="modal-content">
                    <div class="delete-text">Confirm Delete</div>
                    <div id="delete-choices">
                        <div id="confirm-delete-button" class="delete-text" onClick={this.props.deleteCurrentList}>Confirm</div>
                        <div id="cancel-delete-button" class="delete-text" onClick={this.props.toggleDeleteListConfirmation}>Cancel</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeleteListConfirmation;