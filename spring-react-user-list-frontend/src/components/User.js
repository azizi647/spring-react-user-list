import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserConsumer from '../context'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class User extends Component {

    static defaultProps = {
        name: "NaaN",
        department: "NaaN",
        salary: "NaaN"
    }

    static propTypes = {
        name: PropTypes.string.isRequired,
        department: PropTypes.string.isRequired,
        salary: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
        }

    }

    onClickEvent = (e) => {
        this.setState({
            isVisible: !this.state.isVisible
        });
    }

    onDeleteUser = async(dispatch, e) => {
        const { id } = this.props;
        await axios.delete(`http://localhost:8080/api/v1/users/${id}`);
        dispatch({type:"DELETE_USER", payload: id});
    }

    render() {
        const {id,name, department, salary} = this.props;
        const { isVisible } = this.state
        return (
            <UserConsumer>
                {
                    value => {
                        const { dispatch } = value;
                        return (
                            <div className="col-md-8 mb-4">
                                <div className="card" style={isVisible ? {backgroundColor: "#7b96b1", color: "white"} : null}>
                                    <div className="card-header d-flex justify-content-between">
                                        <h4 className="d-inline" onClick={this.onClickEvent.bind(this)}> {name} </h4>
                                        <i onClick={this.onDeleteUser.bind(this, dispatch)} className="fa fa-trash-alt" style={{ cursor: "pointer" }}></i>
                                    </div>
                                    {
                                        isVisible ?
                                            <div className="card-body">
                                                <p className="card-text">Department: {department}</p>
                                                <p className="card-text">Salary: {salary}</p>
                                                <Link to={`edit/${id}`} className="btn btn-dark btn-block">Update user</Link>
                                            </div>
                                            : null
                                    }
                                </div>
                            </div>
                        )
                    }
                }
            </UserConsumer>)
    }
}
