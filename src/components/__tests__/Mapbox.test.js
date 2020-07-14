import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import Mapbox, { issService } from '../Mapbox';

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

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn()
  })),
  NavigationControl: jest.fn(),
  Marker: jest.fn(),
  Popup: jest.fn(),
  FollowControl: jest.fn(),
  MarkerToggleControl: jest.fn(),
  MapToggleControl: jest.fn(),
  InstructionPopup: jest.fn()
}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Mapbox />, div);
})



