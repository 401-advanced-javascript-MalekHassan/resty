import React from 'react';
import Header from './components/header/header';
import Form from './components/form/form';
import Footer from './components/footer/footer';
import Result from './components/results/results';
import History from './components/history/history';
import Help from './components/help/help';
import './App.css';
import {BrowserRouter ,Route, Switch } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      results: [],
      header: '',
      // history: [],
    };
  }
  handleForm = (counting, resulting, history) => {
    this.setState({ count: counting, results: resulting });
  };
  render() {
    console.log('app', this.state.results);
    return (
      <React.Fragment>
        <BrowserRouter>
        <Header />
    <Switch>
        <Route exact path='/'>
        <Form handler={this.handleForm}  />
        <Result
          title={'Get Star Wars People'}
          header={{ 'Content-Type': 'application/json' }}
          count={this.state.count}
          results={this.state.results}
        />
        </Route>
       <Route  path='/history'>
        <History />
        </Route>
        <Route path='/help'>
        <Help />
        </Route>
    </Switch>
        <Footer />
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
