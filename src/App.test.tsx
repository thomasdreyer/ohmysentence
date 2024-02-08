import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

describe('<App />', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('shows word type grid when button is clicked', () => {
    const { getByText } = render(<App />);
    fireEvent.click(getByText('SHOW WORD TYPE GRID'));
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('shows word grid when button is clicked', async () => {
    const { getByText } = render(<App />);
    fireEvent.click(getByText('SHOW WORD GRID'));
    await waitFor(() => {
      expect(getByText('Loading...')).toBeInTheDocument();
    });
  });


  
});
