import React from 'react';
import axios from 'axios';

export default class App1 extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
        Name: '',
        Email: ''
  }
  this.handleChangeName=this.handleChangeName.bind(this)
  this.handleChangeEmail=this.handleChangeEmail.bind(this)
  this.handleSubmit=this.handleSubmit.bind(this)
}
componentDidMount(){
    // axios.get('http://localhost:3000/api/customers?ID=1')
    // .then(function(response){
    //     console.log(response)
    // })
    function getUserAccount() {
      return axios.get('http://localhost:3000/api/customers');
    }
     
    function getUserPermissions() {
      return axios.get('http://localhost:3000/api/users');
    }

    axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // Both requests are now complete
  }));

  axios({
    method:'get',
    url:'http://bit.ly/2mTM3nY',
    responseType:'stream'
  })
    .then(function(response) {
    response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
  });

    // axios({
    //     method: 'post',
    //     url: 'http://localhost:3000/data',
    //     data: {
    //       firstName: 'Fred',
    //       lastName: 'Flintstone',
    //       age:12,
    //       Occupation : 'Students',
    //       Address: 'ktm'

    //     }
    //   });
}

  handleChangeName(event){
    this.setState({ Name: event.target.value });
  }

  handleChangeEmail(event){
    this.setState({ Email: event.target.value });
  }

  handleSubmit(event){
    event.preventDefault();

    const User = [
      {Name: this.state.Name},
      {Email:this.state.Email}
    ]
    
    axios.post('http://localhost:3000/data',{User})
    .then(res =>{
        console.log(res);
        console.log(res.data)
    })
}

  render(){
    return (
      <div>`
        <form onSubmit={this.handleSubmit}>
          <label>
            Person Name:
          </label>
            <input type="text" name="Name" onChange={this.handleChangeName} />
          <label>Email:
            <input type="text" name="Email" onChange={this.handleChangeEmail}/>
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
 }
