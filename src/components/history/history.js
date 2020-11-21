import React from 'react';
import { If, Then } from '../if/if';
import ReactJson from 'react-json-view';

export default class History extends React.Component {
  constructor(props){
      super(props);
    this.state = { data : [] , results:[] };
  }
  componentDidMount() {
  let localData = localStorage.getItem('request')
    ? JSON.parse(localStorage.getItem('request'))
    : [];
  if (localData == null) {
    localData = [];
  }
  this.setState({
      results:localData
    });
  }
 
  // localData = JSON.parse(localStorage.getItem('request'));
  // console.log('aaaaa', localData);
  
 renderMe = (event) =>{
   let dataTarget;
    let methodTarget = event.target.firstChild.textContent;
    console.log('methodTarget',methodTarget);
    let targetUrl = event.target.innerText.split('-')[1];
    console.log('targetUrl',targetUrl);
    console.log(event);
    this.state.results.forEach((key)=>{
    if (methodTarget === key.method && targetUrl === key.url ){
       dataTarget = key.data;
    }
    })
    this.setState({
      data:dataTarget
    });
  }
 render() {
  return (
    <div>
      <div className="details">
        <If condition={this.state.results !== null}>
          <Then>
            {this.state.results.map((key, index) => {
              return (
                <div id="listener" key={index}>
                  <strong id="first-a" onClick={this.renderMe}>
                    {key.method}-{key.url}
                  </strong>
                </div>
              );
            })}
         <ReactJson name="results" src={this.state.data} />;
          </Then>
        </If>
      </div>
    </div>
  );
}
}
// <If condition={localData !== null}>
//   <Then>
//     {localData.map((key, index) => {
//       return (
//         <div id="listener" key={index}>
//           <strong id="first-a">{key.method}</strong>
//           <strong id="second-a">{key.url}</strong>
//         </div>
//       );
//     })}
//   </Then>
//   <Else>
//     <strong>Please Enter valid details</strong>
//   </Else>
// </If>;
