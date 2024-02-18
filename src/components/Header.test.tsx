import { screen } from '@testing-library/react';
import { render } from '../testUtils';
import Header from './Header';

test('renders header', () => {
  render(<Header />);
  const linkElement = screen.getByText(/Noggin/i);
  expect(linkElement).toBeInTheDocument();
});
