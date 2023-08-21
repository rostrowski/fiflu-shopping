import React from 'react';
import { render } from '@testing-library/react';
import OpenCreateListComponent from './open-create-list.component';

describe('OpenCreateListComponent', () => {
  it('renders without crashing', () => {
    const { container } = render(<OpenCreateListComponent />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

