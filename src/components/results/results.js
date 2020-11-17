import React from 'react';
import ReactJson from 'react-json-view';
import './results.scss';
import { If, Then, Else } from '../if/if';

export default function Result({ header, count, results }) {
  return (
    <div>
      <p>{count}</p>
      <If condition={results}>
        <Then>
          <strong>
            <ReactJson name="Header" src={header} />
          </strong>
          <ReactJson name="Response" src={results} />;
        </Then>
        <Else>
          <strong>Please Enter valid details</strong>
        </Else>
      </If>
    </div>
  );
}
