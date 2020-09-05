import React, { Component } from 'react'
import posed from 'react-pose'
import UserConsumer from '../context'
import axios from 'axios'

// var uniqid = require('uniqid');

const Animation = posed.div({
    visible: {
        opacity: 1,
        applyAtStart: {
            display: 'block'
        },
        transition: {
            duration: 3000
        }
    },
    hidden: {
        opacity: 0,
        applyAtEnd: {
            display: 'none'
        },
        transition: {
            duration: 1000
        }
    }
});

class AddUser extends Component {
    state = {
        visible: false,
        name: "",
        department: "",
        salary: "",
        error: false
    }

    validateForm(){
        const {name,department,salary} = this.state;

        if(name ==="" || department==="" || salary==="")
            return false;
        
        return true;
    }

    changeVisibility = (e) => {
        this.setState({
            visible: !this.state.visible
        })
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    addUser = async(dispatch, e) =>{
        e.preventDefault(); // buttona basdiqdan sonra yenilemeni dayandiririq
        const {name, department, salary} = this.state;

        const newUser = {
            // id-ni jsonserver auto oz verir
            // id: uniqid(),
            name: name,
            department: department, 
            salary: salary
        }

        if(!this.validateForm()){
            this.setState({
                error: true
            });
            return;
        }

        const responce = await axios.post("http://localhost:8080/api/v1/users", newUser);
        // jsonserver post-requestden sonra auto olaraq 
        // yeni elave olunan datani geri dondurduyu ucun ozumuzdeki state-ye de 
        // ele bunu yaziriq
        dispatch({
            type: "ADD_USER",
            payload: responce.data
        });
        
        // redirection ile home-sehifeye qayidiriq
        this.props.history.push("/");
    }

    render() {
        const {visible, name, salary, department, error} = this.state;
        return (
            <UserConsumer>
                {
                    value => {
                        const {dispatch} = value;
                        return (
                            <div className="col-md-8 mb-4">
                                <button onClick = {this.changeVisibility} className="btn btn-dark btn-block mb-2">{ visible ? 'Hide Form' : 'Show Form' }</button>
                                < Animation pose = {
                                    visible ? 'visible' : 'hidden'
                                } >
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>Add User form</h4>
                                        </div>
                                        <div className="card-body">
                                            {
                                                error ? 
                                                <div className="alert alert-danger">
                                                    Please check all fields!
                                                </div>
                                                : null
                                            }
                                            <form onSubmit = { this.addUser.bind(this, dispatch)}>
                                                <div className="form-group">
                                                    <label htmlFor="name">Name</label>
                                                    <input 
                                                        type="text" 
                                                        name="name" 
                                                        id="name" 
                                                        placeholder="enter name" 
                                                        className = "form-control" 
                                                        value = {name}
                                                        onChange = { this.changeInput } / >
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="department">Department</label>
                                                    <input 
                                                        type="text" 
                                                        name = "department"
                                                        id = "department"
                                                        placeholder="enter department" 
                                                        className = "form-control" 
                                                        value = {department}
                                                        onChange = { this.changeInput } / >
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="salary">Salary</label>
                                                    <input 
                                                        type="text" 
                                                        name="salary" 
                                                        id = "salary"
                                                        placeholder="enter salary" 
                                                        className = "form-control" 
                                                        value={salary} 
                                                        onChange = { this.changeInput } / >
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-block">Add User</button>
                                            </form>
                                        </div>
                                    </div>
                                </Animation>
                            </div>)
                    }
                }
            </UserConsumer>
        )
    }
}

export default AddUser;