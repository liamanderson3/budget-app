import React, { Component } from 'react';
import plus from '../assets/plus.png';
import { Grid, Row } from 'react-flexbox-grid';
import './addEntry.css';
import Button from 'react-bootstrap/Button';

export default class AddEntry extends Component {
    constructor(props){
        super(props);
        this.state = {
            addState: 0,
            name: '',
            amount: 0,
            res: '',
        }
        this.openForm = this.openForm.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
    }

    openForm(){
        this.setState({addState: 1});   
        console.log("state changed to " + this.state.addState);
    }

    resetForm(){
        this.setState({addState: 0});
        console.log("state reset");
    }

    handleSubmit(){
        const data = {
            type: 'add',
            name: this.state.name,
            amount: this.state.amount,
        }
        const that = this;
        fetch('http://localhost:8100',{
            method: 'post',
            body: JSON.stringify(data), 
        })
        .then(res => res.text())
        .then(function(res){
            that.setState({res: res});
            that.handleResponse();
        });
    }

    handleResponse(){
       if(this.state.res !== "yes"){
           console.log("error");
       }else{
           this.setState({addState: 0});
       }
    }

    handleChange({ target }){
        if(target.name === "bill-title"){
            this.setState({name: target.value});
            console.log(this.state.name);
        }else if(target.name === 'bill-amount'){
            this.setState({amount: target.value});
            console.log(this.state.amount);
        }
    }

    AddButton(){
        return(
            <article id='add-entry' style={addStyle} onClick={this.openForm}>
                <img src={plus} alt='add entry' />
            </article>
        )
    }

    AddForm(){
        return(
            <article id='add-form' style={{textAlign: 'center'}}>
                <p style={titleStyle}>Add New Bill</p>
                <Grid>
                    <Row center='xs' style={{marginTop: '10%'}}>
                        <input name='bill-title' id='bill-text' placeholder='Title' type='text' onChange={this.handleChange}/>  
                    </Row>
                    <Row center='xs'>
                        <input name='bill-amount' id='bill-text' placeholder='£' type='number' onChange={this.handleChange}/>  
                    </Row>
                    <Row center='xs'>
                        <Button variant='light' style={Object.assign({}, buttonStyle, {marginRight: '5px'})} onClick={this.resetForm}>Cancel</Button>
                        <Button variant='light' style={buttonStyle} onClick={this.handleSubmit}>Submit</Button>
                    </Row>
                </Grid>
            </article>
        )
    }

    getAddState(){
        switch(this.state.addState){
            case 0:
            default:
                return this.AddButton();
            case 1:
                return this.AddForm();
        }
    }

    render() {
        return(
            this.getAddState()
        )
    }
}

const addStyle = {
    position: 'fixed',
    right: '2%',
    bottom: '9%',
    //backgroundColor: '#D9D9D9',
}

const titleStyle = {
    width: '100%',
    padding: '3%',
    backgroundColor: '#D9D9D9',
    borderBottom: '1px solid #ECECEC',
    textAlign: 'center',
    marginBlockStart: 0,
    marginBlockEnd: 0,
    fontSize: '1.6em',
}

const buttonStyle = {
    marginTop: '10%',
}

//export default AddEntry;