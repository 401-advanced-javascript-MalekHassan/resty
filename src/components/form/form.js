import './form.scss';
import React from 'react';
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: '', method: '' };
  }
  handleChangeUrl = (e) => {
    e.preventDefault();
    this.setState({ url: e.target.url.value, method: e.target.method.value });
  };
  onSubmit = () => {};
  render() {
    return (
      <main>
        <form class="container column" onSubmit={this.handleChangeUrl}>
          <div class="first row" id="input">
            <label for="url">url</label>
            <input
              size="50"
              height="800"
              id="url"
              type="text"
              name="url"
              value={this.state.value}
            />
            <input id="submit" type="submit" value="GO" />
          </div>
          <div class="second row" id="methods">
            <input type="radio" value="GET" name="method" />
            <label>GET</label>
            <input type="radio" value="POST" name="method" />
            <label>POST</label>
            <input type="radio" value="PUT" name="method" />
            <label>PUT</label>
            <input type="radio" value="DELETE" name="method" />
            <label>DELETE</label>
          </div>
        </form>
        <div class="details">
          <a id="first-a">{this.state.method}</a>{' '}
          <a id="second-a">{this.state.url}</a>
        </div>
      </main>
    );
  }
}
export default Form;
