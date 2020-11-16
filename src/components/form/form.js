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
    fetch(`${e.target.url.value}`, {
      method: e.target.method.value,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        this.props.handler(data.count, data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  onSubmit = () => {};
  render() {
    return (
      <main>
        <form
          data-testid="ancestor"
          class="container column"
          onSubmit={this.handleChangeUrl}
        >
          <div class="first row" id="input">
            <label for="url">url</label>
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
          <div class="second row" id="methods">
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
          </div>
        </form>
        <div class="details">
          <strong id="first-a">{this.state.method}</strong>
          <strong id="second-a">{this.state.url}</strong>
        </div>
      </main>
    );
  }
}
export default Form;
