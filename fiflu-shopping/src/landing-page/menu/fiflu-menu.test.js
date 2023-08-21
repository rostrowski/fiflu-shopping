import React from 'react';
import { render } from '@testing-library/react';
import FifluMenu from './fiflu-menu.component';

describe('FifluMenu', () => {
  it('renders without crashing', () => {
    const { container } = render(<FifluMenu />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

