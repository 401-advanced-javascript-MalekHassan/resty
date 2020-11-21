import './form.scss';
import React from 'react';
// import { Route, Switch } from 'react-router-dom';
import superagent from 'superagent';
import { If, Then } from '../if/if';
import List from '../list/list'

// import History from './components/history/history';
let localData = [];
// let array = [];
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: '', method: '', body: [], whileFetching: false };
  }
  handleChangeUrl = async (e) => {
    e.preventDefault();
    await this.setState({
      url: e.target.url.value,
      method: e.target.method.value,
      body: e.target.body.value,
      whileFetching: true,
    });
    if (this.state.method === 'GET') {
      console.log('I am here');
      fetch(`${e.target.url.value}`, {
        method: e.target.method.value,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          this.setState({ whileFetching: false });
          // localStorage.setItem('request', JSON.stringify(array));
          let result = localStorage.getItem('request')
            ? JSON.parse(localStorage.getItem('request'))
            : [];
          console.log(' result', result);
          let string = data;
          let total = {
            method: 'GET',
            url: e.target.url.value,
            data: string,
          };
          // console.log('total', total);
          if (result == null) {
            result = [];
          }
          result.push(total);
          localStorage.setItem('request', JSON.stringify(result));
          this.props.handler(data.count, data, {
            method: 'GET',
            url: e.target.url.value,
          });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else if (
      this.state.method === 'PUT' ||
      this.state.method === 'POST' ||
      this.state.method === 'PATCH'
    ) {
      let lowerMethod = this.state.method.toLocaleLowerCase();
      superagent[lowerMethod](this.state.url)
        .send(this.state.body)
        .then((data) => {
          this.setState({ whileFetching: false });
          let result = localStorage.getItem('request')
            ? JSON.parse(localStorage.getItem('request'))
            : [];
          // console.log('im the data', data);
          let query = {
            url: this.state.url,
            method: this.state.method,
            body: data,
          };
          if (result == null) {
            result = [];
          }
          result.push(query);
          localStorage.setItem('request', JSON.stringify(result));
          this.props.handler(data.count, data.body);
        });
    } else if (this.state.method === 'DELETE') {
      fetch(`${e.target.url.value}`, {
        method: e.target.method.value,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.setState({ whileFetching: false });
          console.log('Success:', data);
          let result = localStorage.getItem('request')
            ? JSON.parse(localStorage.getItem('request'))
            : [];
          let query = { method: 'DELETE', url: this.state.url };
          if (result == null) {
            result = [];
          }
          result.push(query);
          localStorage.setItem('request', JSON.stringify(result));
          this.props.handler(data.count, data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };
 
  render() {
    let localData = localStorage.getItem('request')
    ? JSON.parse(localStorage.getItem('request'))
    : [];
  if (localData == null) {
    localData = [];
  }
  // localData = JSON.parse(localStorage.getItem('request'));
  // console.log('aaaaa', localData);
  function renderMe(event) {
    let methodTarget = event.target.firstChild.textContent;
    console.log(methodTarget, 'method');
    let targetUrl = event.target.innerText.split('-')[1];
    console.log('targetUrl', targetUrl);
    let inputUrl = document.getElementById('url');
    inputUrl.value = targetUrl;
    let inputMethod = document.getElementById(`${methodTarget}`);
    inputMethod.setAttribute('checked', 'true');
    // console.log(inputMethod);
  }
    return (
      <React.Fragment>
        <main>
          <form
            data-testid="ancestor"
            className="container column"
            onSubmit={this.handleChangeUrl}
          >
            <input type="text" name="body"></input>
            <div className="first row" id="input">
              <label htmlFor="url">url</label>
              <input
                data-testid="descendantText"
                size="50"
                height="800"
                id="url"
                type="text"
                name="url"
                value={this.state.value}
              />
              <input
                data-testid="descendantSubmit"
                id="submit"
                type="submit"
                value="GO"
              />
            </div>
            <div className="second row" id="methods">
              <input
                data-testid="testId"
                type="radio"
                value="GET"
                name="method"
                id="GET"
              />
              <label>GET</label>
              <input type="radio" value="POST" name="method" id="POST" />
              <label>POST</label>
              <input type="radio" value="PUT" name="method" id="PUT" />
              <label>PUT</label>
              <input type="radio" value="DELETE" name="method" id="DELETE" />
              <label>DELETE</label>
              <input type="radio" value="PATCH" name="method" id="PATCH" />
              <label>PATCH</label>
            </div>
          <div>
      <div className="details">
        <If condition={localData !== null}>
          <Then>
            {localData.map((key, index) => {
              return (
                <div id="listener" key={index}>
                  <strong id="first-a" onClick={renderMe}>
                    {key.method}-{key.url}
                  </strong>
                </div>
              );
            })}
          </Then>
        </If>
      </div>
    </div>
            <If condition={this.state.whileFetching === true}>
              <Then>
                <div className="row">
                  <img
                    src="https://i.gifer.com/YCZH.gif"
                    alt="loading"
                    width="200px"
                  ></img>
                </div>
              </Then>
            </If>
          </form>
        </main>
      </React.Fragment>
    );
  }
}
export default Form;
