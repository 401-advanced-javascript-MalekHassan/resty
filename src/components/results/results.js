import React from 'react';
import ReactJson from 'react-json-view';
import './results.scss';

export default function Result({ header, count, results }) {
  return (
    <ul>
      <li>{count}</li>
      <strong>
        <ReactJson name="Header" src={header} />
      </strong>
      <ReactJson name="Response" src={results} />;
    </ul>
  );
}
