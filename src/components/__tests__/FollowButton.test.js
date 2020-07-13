import React from 'react';
import { render } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import FollowButton from '../FollowButton';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('renders Follow Button', () => {
  const { getByText } = render(<FollowButton />);

  const instructions = getByText("Follow");
  expect(instructions).toBeInTheDocument();
});

