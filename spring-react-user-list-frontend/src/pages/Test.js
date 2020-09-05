import React, { Component } from 'react'

class Test extends Component {

    constructor(props){
        super(props);
        this.state = {
            a: 10
        }
        console.log("constructor");
    }

    componentDidMount() {

        this.setState({
            a: 20
        });

        console.log("did mount");
        
    }
    
    shouldComponentUpdate(){
        console.log("should component update");
        return true;
    }

    componentWillUnmount(){
        console.log("component will unmount");
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("did update")
    }
    

    render() {
        console.log("render");
        return (
            <div>
                <h4>a - {this.state.a}</h4>
            </div>
        )
    }
}

export default Test;