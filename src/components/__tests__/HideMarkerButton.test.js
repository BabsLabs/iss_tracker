import React from 'react';
import { render, getByAltText } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import HideMarkerButton from '../HideMarkerButton';

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

jest.mock('../MarkerToggleControl', () => ({
  MarkerToggleControl: jest.fn(),
}));

test('renders Hide Event Marker Toggle', () => {
  const { getByAltText } = render(<HideMarkerButton name={"event"}/>);

  const eventToggle = getByAltText("event toggle");
  expect(eventToggle).toBeInTheDocument();
  expect(eventToggle).toHaveClass('event-toggle')
  expect(eventToggle).toHaveClass('toggle')
  expect(eventToggle).toHaveClass('not-toggled')
  expect(eventToggle).toHaveClass('button')
});

test('renders Hide Observatory Marker Toggle', () => {
  const { getByAltText } = render(<HideMarkerButton name={"observatory"}/>);

  const observatoryToggle = getByAltText("observatory toggle");
  expect(observatoryToggle).toBeInTheDocument();
  expect(observatoryToggle).toHaveClass('observatory-toggle')
  expect(observatoryToggle).toHaveClass('toggle')
  expect(observatoryToggle).toHaveClass('not-toggled')
  expect(observatoryToggle).toHaveClass('button')
});

