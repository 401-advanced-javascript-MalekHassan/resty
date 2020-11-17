import './form.scss';
import React from 'react';
import superagent from 'superagent';
// import History from './components/history/history';
let localData = [];
let array = [];
localStorage.setItem('request', JSON.stringify(array));
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: '', method: '', body: [] };
  }
  handleChangeUrl = async (e) => {
    e.preventDefault();
    await this.setState({
      url: e.target.url.value,
      method: e.target.method.value,
      body: e.target.body.value,
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
          let string = JSON.stringify(data);
          let newArray = JSON.parse(localStorage.getItem('request'));
          newArray.push({
            method: 'GET',
            url: e.target.url.value,
            data: string,
          });
          localStorage.setItem('request', JSON.stringify(newArray));
          localData = JSON.parse(localStorage.getItem('request'));
          console.log('kaakakakaka', array);
          this.props.handler(data.count, data);
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
          // console.log('im the data', data);
          let string = JSON.stringify(data);
          let newArray = JSON.parse(localStorage.getItem('request'));
          let query = {
            url: this.state.url,
            method: this.state.method,
            body: string,
          };
          newArray.push(query);
          localStorage.setItem('request', JSON.stringify(newArray));
          localData = JSON.parse(localStorage.getItem('request'));
          console.log('kaakakakaka', array);
          // console.log('sksiwjwjw', data.header);
          this.props.handler(data.count, data.body);

          // let history = localStorage.getItem('history')
          //   ? JSON.parse(localStorage.getItem('history'))
          //   : [];
          // let check = false;
          // history.forEach((item) => {
          //   if (item.url === query.url && item.method === query.method) {
          //     check = true;
          //   }
          // });
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
          console.log('Success:', data);
          // let string = JSON.stringify(data);
          let newArray = JSON.parse(localStorage.getItem('request'));
          newArray.push({
            method: 'DELETE',
          });
          localStorage.setItem('request', JSON.stringify(newArray));
          localData = JSON.parse(localStorage.getItem('request'));
          console.log('sjs', array);
          this.props.handler(data.count, data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };
  render() {
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
                defaultChecked
                aria-checked="true"
                data-testid="testId"
                type="radio"
                value="GET"
                name="method"
              />
              <label>GET</label>
              <input type="radio" value="POST" name="method" />
              <label>POST</label>
              <input type="radio" value="PUT" name="method" />
              <label>PUT</label>
              <input type="radio" value="DELETE" name="method" />
              <label>DELETE</label>
              <input type="radio" value="PATCH" name="method" />
              <label>PATCH</label>
            </div>
          </form>
          <div className="details">
            {localData.map((key, index) => {
              return (
                <div key={index}>
                  <strong id="first-a">{key.method}</strong>
                  <strong id="second-a">{key.url}</strong>
                </div>
              );
            })}
          </div>
        </main>
      </React.Fragment>
    );
  }
}
export default Form;
