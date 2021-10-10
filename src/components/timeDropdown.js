import React, {Component} from 'react';
import {ButtonDropdown,Dropdown, DropdownToggle,DropdownMenu, DropdownItem, Table} from 'reactstrap';

class TimeDropdown extends Component{
    constructor(props){
        super(props)

        this.state = {
            dropdownOpen: false,
            actions: [],
            dropDownValue: 'Select Time'
        };
        this.toggle = this.toggle.bind(this);
        this.changeValue = this.changeValue.bind(this)
    }

    toggle(event){
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }
    changeValue(e){
        this.setState({dropDownValue:e.currentTarget.textContent});
    }

    componentDidMount(){

    }

    render(){
        return(
            <div>
                <Dropdown isOpen = {this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                    {this.state.dropDownValue}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={this.changeValue}>  6-7 am</DropdownItem>
                    <DropdownItem onClick={this.changeValue}>  7-8 am</DropdownItem>
                    <DropdownItem onClick={this.changeValue}>  8-9 am</DropdownItem>
                    <DropdownItem onClick={this.changeValue}>  5-6 pm</DropdownItem>
                    <DropdownItem onClick={this.changeValue}>  6-7 pm</DropdownItem>
                    <DropdownItem onClick={this.changeValue}>  7-8 pm</DropdownItem>
                    <DropdownItem onClick={this.changeValue}>  8-9 pm</DropdownItem>
                </DropdownMenu>
                </Dropdown>
                
            </div>
        )
    }
}

export default TimeDropdown