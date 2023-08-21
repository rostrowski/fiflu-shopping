import React from 'react';
import { render } from '@testing-library/react';
import Item from './item.component';

describe('Item', () => {
  it('renders without crashing', () => {
    const { container } = render(<Item id="1" name="Item 1" crossedOut={false} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with crossed out style when crossedOut prop is true', () => {
    const { getByText } = render(<Item id="1" name="Item 1" crossedOut={true} />);
    const itemElement = getByText('Item 1');
    expect(itemElement).toHaveClass('crossed-out');
  });

  it('renders without crossed out style when crossedOut prop is false', () => {
    const { getByText } = render(<Item id="1" name="Item 1" crossedOut={false} />);
    const itemElement = getByText('Item 1');
    expect(itemElement).not.toHaveClass('crossed-out');
  });
});

