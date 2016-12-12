import React from 'react'
import { Link } from 'react-router'
import ChecklistItem from './ChecklistItem'
import moment from 'moment'
var DatePicker = require('react-datepicker');
//saying state error
class ChecklistAdd extends React.Component {
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.addTodo = this.addTodo.bind(this)
        this.state = {
            title: '',
            note: '',
            date: moment(),
            //completed: 
        }
    }
    // handleChangeTextera(event) {
    //   this.setState({value: event.target.value});
    // }
    handleChange(e) {
        //console.log(e)
        this.setState({
            date: e
        });
    }
    addTodo() {
        let user = JSON.parse(sessionStorage.getItem('user'))

        var milestone = {
            milestone: {
                title: this.state.title,
                note: this.state.note,
                date: this.state.date.format('L'),
            },
            event_id: user.events[0].id,
            user_token: sessionStorage.getItem('auth_token'),
            user_email: sessionStorage.getItem('email')
        }
        console.log(milestone)
        fetch('/api/milestone/new', {
                body: JSON.stringify(milestone),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(response => response.json())
        .then(response => {
            console.log(response)
            window.location.reload()
        })
    }

    render(){

        return (<div>
            <div className="col-sm-12 text-center">
                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab" id="headingOne">
                            <h4 className="panel-title">
                                <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Add a New Todo
                                </a>
                            </h4>
                        </div>
                        <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-sm-9">
                                        <div className="form-group">
                                            <label htmlFor="addTodo"> Todo</label>
                                            <input type="text" placeholder="add a new todo" value={this.state.title} onChange={(e) => this.setState({title:e.target.value})} className="form-control" id="add"/>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <h4>Due date of event</h4>
                                            <DatePicker
                                                    selected={this.state.date}
                                                    onChange={this.handleChange} />
                                        </div>
                                    </div>
                                <div className="row">
                                    <div className="col-sm-9">
                                        <div className="form-group">
                                            <label htmlFor="addNotes">Notes:</label>
                                            <textarea className="form-control" rows="3" id="addNotes" value={this.state.note} onChange={(e) => this.setState({note:e.target.value})}></textarea>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <button className="btn btn-default" onClick={this.addTodo}>Add Todo</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
}

export default ChecklistAdd
