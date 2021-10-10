import React, {Component} from 'react';
import {Button,Modal} from 'semantic-ui-react'

class PopUp extends Component{
    constructor(props){
        super(props);
        
        this.state={
            isToggleReserved: true,
            modal: false
        };

        this.handleClick=this.handleClick.bind(this);
        this.modalToggle = this.modalToggle.bind(this)
    }

        modalToggle(){
            this.setState({
                modal:!this.state.modal
            })
        }

        handleClick(){
            this.setState(prevState=>({
                isToggleReserved: !prevState.isToggleReserved
            }))
        }
    render(){
        return(
            <div>
               <Button color={this.state.isToggleReserved?"green":'yellow'} onClick={this.modalToggle}>{this.state.isToggleReserved?'Reserve':'UnReserve'}{this.props.buttonLabel}</Button>
               <Modal isOpen={this.state.modal} toggle={this.modalToggle} className={this.props.className}>
                    <Modal.Header toggle={this.modalToggle}>Confirmation ?</Modal.Header>
                        <Modal.Description>
                            Book futsal ground {/*futsal ground props*/} at this time {/*time props*/} 
                        </Modal.Description>
                    <Modal.Action>
                        <Button color="green" onClick={()=>{this.modalToggle();this.setState({isToggleReserved:!this.state.isToggleReserved})}}> Confirm</Button>{''}
                        <Button color ="red" onClick={()=>{this.modalToggle()}}> Cancel</Button>
                    </Modal.Action>
                </Modal>
            </div>
        )
    }
}

export default PopUp
