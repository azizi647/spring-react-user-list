import React, { Component } from 'react'
import UserConsumer from '../context'
import axios from 'axios'

class UpdateUser extends Component {
    state = {
        name: "",
        department: "",
        salary: "",
        error: false
    }

    componentDidMount = async() => {
        const {id} = this.props.match.params;

        const response = await axios.get(`http://localhost:8080/api/v1/users/${id}`);

        const {name, salary, department} = response.data;

        this.setState({
            name,
            salary,
            department
        });
    }
    
    

    validateForm(){
        const {name,department,salary} = this.state;

        if(name ==="" || department==="" || salary==="")
            return false;
        
        return true;
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    updateUser = async(dispatch, e) =>{

        e.preventDefault(); // buttona basdiqdan sonra yenilemeni dayandiririq
        
        const {id} = this.props.match.params;
        const {name, department, salary} = this.state;

        const updated = {
            name,
            department,
            salary
        };
        

        if(!this.validateForm()){
            this.setState({
                error: true
            });
            return;
        }

        const response = await axios.put(`http://localhost:8080/api/v1/users/${id}`, updated);

        dispatch({type:"UPDATE_USER", payload: response.data});

        // redirection ile home-sehifeye qayidiriq
        this.props.history.push("/");
    }

    render() {
        const {name, salary, department,error} = this.state;
        return (
            <UserConsumer>
                {
                    value => {
                        const {dispatch} = value;
                        return (
                            <div className="col-md-8 mb-4">
                                <div className="card">
                                    <div className="card-header">
                                        <h4>Update User form</h4>
                                    </div>
                                    <div className="card-body">
                                        {
                                            error ? 
                                            <div className="alert alert-danger">
                                                Please check all fields!
                                            </div>
                                            : null
                                        }
                                        <form onSubmit = { this.updateUser.bind(this, dispatch)}>
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
                                            <button type="submit" className="btn btn-primary btn-block">Update User</button>
                                        </form>
                                    </div>
                                </div>
                            </div>)
                    }
                }
            </UserConsumer>
        )
    }
}

export default UpdateUser;