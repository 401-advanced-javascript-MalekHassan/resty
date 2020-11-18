import React from 'react';
import { If, Then } from '../if/if';

export default function Result({}) {
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
  );
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
