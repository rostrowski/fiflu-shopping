import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ItemsList from './items-list.component';

describe('ItemsList', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        shared: () => ({ draggingModeOn: false }),
      },
    });
  });

  it('renders without crashing', () => {
    const { container } = render(
      <Provider store={store}>
        <ItemsList items={[]} />
      </Provider>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders new items when items prop changes', () => {
    const { rerender, getByText } = render(
      <Provider store={store}>
        <ItemsList items={[{ id: '1', name: 'Item 1', crossedOut: false }]} />
      </Provider>
    );
    expect(getByText('Item 1')).toBeInTheDocument();

    rerender(
      <Provider store={store}>
        <ItemsList items={[{ id: '2', name: 'Item 2', crossedOut: false }]} />
      </Provider>
    );
    expect(getByText('Item 2')).toBeInTheDocument();
  });

  // Add more tests here...

  it('changes the order of items when an item is dragged and dropped', () => {
    // TODO: Implement this test
  });

  it('renders items differently when draggingModeOn prop changes', () => {
    // TODO: Implement this test
  });
});

