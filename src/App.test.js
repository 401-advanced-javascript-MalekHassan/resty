import { getByTestId, render, screen } from '@testing-library/react';
import App from './App';
import Result from '../src/components/results/results';
import Form from '../src/components/form/form';
import '@testing-library/jest-dom';

test('should render the list', () => {
  const results = [{ name: 'Luke Skywalker', url: 'https://' }];

  render(<Result results={results} />);
  const items = screen.getAllByRole('listitem');
  expect(items).toHaveLength(1);
});
test('To check if the get button is checked ', () => {
  const { element } = render(<Form />);
  const checkedGetRadio = screen.getByTestId('testId');
  expect(checkedGetRadio).toBeChecked();
});
test('check if te form has a text input', async () => {
  const { element } = render(<Form />);
  const checkDescendant = screen.getByTestId('ancestor');
  const checkTest = screen.getByTestId('descendantText');
  const checkSubmit = screen.getByTestId('descendantSubmit');
  expect(checkDescendant).toContainElement(checkTest);
});
test('check if te form has a submit button', async () => {
  const { element } = render(<Form />);
  const checkDescendant = screen.getByTestId('ancestor');
  const checkTest = screen.getByTestId('descendantText');
  const checkSubmit = screen.getByTestId('descendantSubmit');
  expect(checkDescendant).toContainElement(checkSubmit);
});
