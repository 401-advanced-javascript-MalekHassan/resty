import React from 'react';
import Header from './components/header/header';
import Form from './components/form/form';
import Footer from './components/footer/footer';
import Result from './components/results/results';
import './App.css';

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
  handleForm = (counting, resulting) => {
    this.setState({ count: counting, results: resulting });
  };
  render() {
    console.log('app', this.state.results);
    return (
      <React.Fragment>
        <Header />
        <Form handler={this.handleForm} />
        {/* <History history={this.state.history} /> */}
        <Result
          title={'Get Star Wars People'}
          header={{ 'Content-Type': 'application/json' }}
          count={this.state.count}
          results={this.state.results}
        />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
