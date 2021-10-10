import React, {Component} from 'react';
import {Table, Button,Alert} from 'reactstrap';
import moment from 'moment';
// import 'react-datepicker/dist/react-datepicker.css'
// import DatePicker from 'react-datepicker';
import PopUp from '../popup'


class FutsalCourtList extends Component{
    constructor(props){
        super(props);
        this.state = {
            startDate: moment(),

        };
        this.handleChangeDate = this.handleChangeDate.bind(this);
        
    }

    handleChangeDate(Date){
        this.setState({
            startDate:date
        });
    }

    // let futsalGround=

    render(){
        let day=this.props.date.format("dddd")
        let date=this.props.date.format("MMMM Do YYYY")
        console.log(this.props)
        return(
            <div className="fc-booking-table">
                <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Day</th>
            <th>Time</th>
            <th>Ground</th>
            <th>Booking Option</th>
          </tr>
        </thead>
       <OptRow ground="Mates Futsal" day={day} date={date} time={this.props.time} index="1" />
       <OptRow ground="Tahachal Futsal" index="2"  day={day} date={date} time={this.props.time}/>
       <OptRow ground="Chaitya Futsal" index="3" day={day} date={date} time={this.props.time}/>
       <OptRow ground="Lalitpur 5A-side Futsal" index="4" day={day} date={date} time={this.props.time}/>
      </Table>
            </div>
        )
    }
}
export default FutsalCourtList;

class OptRow extends Component{
    constructor(props){
        super(props);     
        
        // this.timeFunction = this.timeFunction.bind(this);
    }

  timeFunction(time){
     switch(time){
         case "1":
         return "6-7 am";
         break;
         case "2":
         return "7-8 am";
         break;
         case "3":
         return "8-9 am";
         break;
         case "4":
         return "9-10 am";
         break;
         case "5":
         return "10-11 am";
         break;
         case "6":
         return "11-12 am";
         break;
         default:
         return "error"
     }
 }   
render(){
    const time=this.props.time
    console.log(">>>>>>>>>>>>>>>>...",typeof(time))
    
    return(
        <tbody>
        <tr>
            <th scope="row">{this.props.index}</th>
            <td>{this.props.date}</td>
            <td>{this.props.day}</td>
            <td>{this.timeFunction(time)}</td>
            <td>{this.props.ground}</td>
            <td><PopUp/></td>
        </tr>
    </tbody>
    )
}
}


