import React from 'react';
import { render, getByAltText } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import MapStyleButton from '../MapStyleButton';

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

jest.mock('../MapToggleControl', () => ({
  MapToggleControl: jest.fn(),
}));

test('renders Map Style Toggle', () => {
  const { getByText, getByAltText } = render(<MapStyleButton text={"light"} />);

  const mapStyleToggleText = getByText("light");
  expect(mapStyleToggleText).toBeInTheDocument();

  const mapStyleToggle = getByAltText("map toggle");
  expect(mapStyleToggle).toBeInTheDocument();
  expect(mapStyleToggle).toHaveClass('map-toggle');
  expect(mapStyleToggle).toHaveClass('toggle');
  expect(mapStyleToggle).toHaveClass('button');
});
