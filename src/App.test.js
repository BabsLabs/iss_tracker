import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn()
  })),
  NavigationControl: jest.fn(),
  Marker: jest.fn(),
  Popup: jest.fn()
}));

test('renders app instructions', () => {
  const { getByText } = render(<App />);
  
  const instructions = getByText("International Space Station (ISS) Tracker");
  expect(instructions).toBeInTheDocument();
  
  const toggleInstructions = getByText("Toggle markers with the Observatory and Event buttons");
  expect(toggleInstructions).toBeInTheDocument();
  
  const markerInstructions = getByText("Click markers for more info");
  expect(markerInstructions).toBeInTheDocument();
  
  const mapStyleInstructions = getByText("Change the Map style with the button");
  expect(mapStyleInstructions).toBeInTheDocument();
  
  const positionInstructions = getByText("The position of the ISS is updated every 3 seconds");
  expect(positionInstructions).toBeInTheDocument();
  
  const proceedInstructions = getByText("(Click to Proceed)");
  expect(proceedInstructions).toBeInTheDocument();
});
