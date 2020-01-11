import React, { Component } from 'react';
import './App.css';
import AddEntry from './components/addEntry.js';
import Content from './components/content.js';
import Footer from './components/footer.js';

class App extends Component {
  render() {
    return (
      <section>
        <Content/>
        <AddEntry/>
        <Footer/>
      </section>
    );
  }
}

export default App;