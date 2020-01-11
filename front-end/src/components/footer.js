import React, { Component } from 'react';

export default class Footer extends Component {
    constructor(props){
        super(props);
        this.state = {
            current: 0,
            total: 0,
        }
    }
    render() {
        return(
            <article id='footer' style={footerStyle}>
                <p style={{padding: '3%', marginBlockEnd: 0, marginBlockStart: 0}}><i>£{this.state.current} / £<b>{this.state.total}</b></i></p>
            </article>
        )
    }
}

const footerStyle = {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: '#D9D9D9',
    borderTop: '1px solid #ECECEC',
    textAlign: 'center',
    fontFamily: '"Times New Roman", Times, Serif',
    fontSize: '1.6em',
}
