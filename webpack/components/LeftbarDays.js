import React from 'react'
import { Link } from 'react-router'
import moment from 'moment'
var DatePicker = require('react-datepicker');

class LeftbarDays extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    var today = moment()
    let user = JSON.parse(sessionStorage.getItem('user'))
    var eventDate = moment(user.events[0].date)
    var diff = moment(eventDate).diff(today, 'days')

    return (<div>
<h4 className="text-center">Your event date:</h4>
      <div className="text-center eventDate">{eventDate.format('l')}</div>
      <br />
      <h5 className="text-center">Your event is </h5>
        <div className="text-center daysDiff">{diff}</div>
        <h5 className="text-center">day{diff===1?'':'s'} away</h5>
        <br />
    </div>
    )
  }
}

export default LeftbarDays
