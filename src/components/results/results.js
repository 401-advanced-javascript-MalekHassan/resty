import React from 'react';
import ReactJson from 'react-json-view';
import './results.scss';

export default function Result({ header, count, results }) {
  return (
    <ul>
      <li>{count}</li>
      <a>
        {' '}
        <ReactJson name="Header" src={header} />
      </a>
      <ReactJson name="Response" src={results} />;
    </ul>
  );
}
