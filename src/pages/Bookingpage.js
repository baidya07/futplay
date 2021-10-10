import React,{Component} from 'react';
import {
  Button,
  Dropdown, 
  DropdownToggle,
  DropdownMenu, 
  DropdownItem, 
  Table,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
  } 
  from 'reactstrap';
import FutsalCourtList from '../components/futsalgrounds/futsalCourtsList'
import TimeDropdown from '../components/timeDropdown'
import DayDropdown from '../components/dayDropdown'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {Grid, Loader, Message, Card, Image,Icon, Header } from 'semantic-ui-react'
import 'react-datepicker/dist/react-datepicker.css';
import { bindActionCreators} from "redux";
import * as userProfileAction from '../redux/actions/userProfileAction'
import { connect } from "react-redux";

class Bookingpage extends Component{
    constructor(props){
        super(props);

        this.state = {
             dropdownOpenDate: false,
             dropdownOpenTime: false,
             actions:[],
             tvalue:'1',
             startDate: moment(),
             listDisplay:false,
             timeVal:'0',
             dateVal:moment(),
             dropDownValue:""
        };
        this.toggleDate= this.toggleDate.bind(this);
        this.toggleTime= this.toggleTime.bind(this);
        this.changeValue = this.changeValue.bind(this)
        this.handleChangeTime = this.handleChangeTime.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
      }

      submitHandler(e){
        e.preventDefault()
        this.setState({listDisplay:true})
        console.log("changed submit")
        this.setState({
          timeVal:this.state.tvalue,
          dateVal:this.state.startDate,
          listDisplay: true
        })
      }

      handleChangeTime(event) {
        this.setState({tvalue: event.target.value});
      }

      toggleDate(event){
        this.setState({
          dropdownOpenDate: !this.state.dropdownOpenDate
        });
      }
      toggleTime(event){
        this.setState({
          dropdownOpenTime: !this.state.dropdownOpenTime
        });
      }

      changeValue(e){
        this.setState({
            dropdownOpenTime: !this.state.dropdownOpenTime,
            dropDownValue: e.target.innerText
        })
      }

      handleChangeDate(date) {
        this.setState({
          startDate: date
        });
      }

      componentWillMount(){
      }

      componentDidMount(){
        this.props.profileActions.getUserProfile(this.props.Username)
      }

      componentWillReceiveProps(newProps) {
        if(newProps.Username!==null && newProps.Username!==this.props.Username) {
        this.props.profileActions.getUserProfile(this.props.Username);
        }
      }

      render() {
        console.log(this.state.tvalue)
        console.log(this.state.startDate)
        const {loading, data, error}=this.props;
        return (
          <div>
             <Grid>
                <Grid.Column width={12}>
                <h1>Select Date And Time</h1>
                <div className="query-submit">
                    <Dropdown isOpen={this.state.dropdownOpenDate} toggle={this.toggleDate}>
                      <DropdownToggle caret>
                        Select Date
                      </DropdownToggle>
                        <DropdownMenu>
                          <DatePicker
                          selected={this.state.startDate}
                          onChange={this.handleChangeDate}
                          />
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown isOpen= {this.state.dropdownOpenTime} toggle={this.toggleTime}>
                      <DropdownToggle caret>
                        Select Time
                      </DropdownToggle>
                        <DropdownMenu value={this.state.value} onChange={this.handleChangeTime}>
                              <DropdownItem onClick={this.changeValue} value="1">6-7 am</DropdownItem>
                              <DropdownItem value="2">7-8 am</DropdownItem>
                              <DropdownItem value="3">8-9 am</DropdownItem>
                              <DropdownItem value="4">9-10 am</DropdownItem>
                              <DropdownItem value="5">10-11 am</DropdownItem>
                              <DropdownItem value="6">11-12 am</DropdownItem>
                        </DropdownMenu>
                  </Dropdown>
                   <select value={this.state.value} onChange={this.handleChangeTime}>
                              <option value="0">Select Time</option>
                              <option value="1">6-7 am</option>
                              <option value="2">7-8 am</option>
                              <option value="3">8-9 am</option>
                              <option value="4">9-10 am</option>
                              <option value="5">10-11 am</option>
                              <option value="6">11-12 am</option>
                        </select>
                        <Button color="primary" onClick={this.submitHandler}>Search</Button>
                  </div>
            <br/>
  
           {
             this.state.listDisplay&&
               <FutsalCourtList time={this.state.timeVal} date={this.state.dateVal}/> 
           }
             {
             !this.state.listDisplay&&
               <div className="available-futsal-court-container">
                  <div className="afcc-header">
                    <h1>Available Futsal Court By Futplay for Booking</h1>
                  </div>
                    <div className="afcc-slide-container">
                    </div>
               </div>
              }
                </Grid.Column>
                <Grid.Column width={4}>
                 {loading && <Loader/>}
                 {!loading && data && 

                  <Card>
                    <Header  textAlign='center' as ="h1">Profile</Header>
                    <Card.Content>
                      <Card.Header> <Icon name="user"/>{data.Username}</Card.Header>
                      <Card.Meta>
                        <span className='date'><Icon name="mail"/> {data.Email}</span>
                      </Card.Meta>
                      <Card.Description><Icon name="phone"/>{data.Phonenumber}</Card.Description>
                      <Card.Description><Icon name="name"/>{data.Firstname} {data.Lastname}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    </Card.Content>
                  </Card>}
                  {error && <Message negative>{error}</Message>}
                </Grid.Column>
                
              </Grid>  
           
             
          </div>
        );
      }
    }
    const mapStateToProps = state => ({
      loading: state.userprofile.loading,
      error: state.userprofile.error,
      data: state.userprofile.data,
      Username: state.login.Username
      
    });
    
    const mapDispatchToProps = dispatch => ({
      profileActions: bindActionCreators(userProfileAction, dispatch),
    });
export default connect(mapStateToProps, mapDispatchToProps)(Bookingpage)

