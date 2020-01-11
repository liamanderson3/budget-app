import React, { Component } from 'react';
import {BootstrapTable,
        TableHeaderColumn} from 'react-bootstrap-table';
import minus from '../assets/minus.png';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'

export default class Content extends Component {
    constructor(props){
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        data: [],
      }
      this.retreiveEntries = this.retreiveEntries.bind(this);
    }

    componentDidMount(){
      this.retreiveEntries();
    }

    componentDidUpdate(){
      console.log(this.state.data);
    }

    retreiveEntries(){
      const that = this;
      fetch('http://localhost:8100',{
          method: 'get',
      })
      .then(res => res.json())
      .then(function(res){
          that.setState({data: res});
      });
    }

    render() {
        return(
            <article id='table' style={bodyStyle}>
              <BootstrapTable data={this.state.data} >
                <TableHeaderColumn isKey dataField='name'>
                  Name
                </TableHeaderColumn>
                <TableHeaderColumn dataField='amount'>
                  Amount
                </TableHeaderColumn>
                <TableHeaderColumn dataField='State'>
                  Paid
                </TableHeaderColumn>
              </BootstrapTable>
            </article>
        )
    }
}

const bodyStyle = {
    width: '100%',
}
