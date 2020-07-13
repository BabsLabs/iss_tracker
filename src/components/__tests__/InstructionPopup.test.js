import React from 'react';
import { render, getByAltText } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import InstructionPopup from '../InstructionPopup';

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
  Popup: jest.fn()
}));

test('renders app instructions', () => {
  const { getByText, getByAltText } = render(<InstructionPopup />);
  
  const instructions = getByText("International Space Station (ISS) Tracker");
  expect(instructions).toBeInTheDocument();
  
  const toggleInstructions = getByText("Toggle markers with the Observatory and Event buttons");
  expect(toggleInstructions).toBeInTheDocument();

  const instructionsISSLogo = getByAltText("(ISS LOGO)");
  expect(instructionsISSLogo).toBeInTheDocument();

  const instructionsObservatoryImage = getByAltText("Observatory Toggle");
  expect(instructionsObservatoryImage).toBeInTheDocument();

  const instructionsEventImage = getByAltText("Event Toggle");
  expect(instructionsEventImage).toBeInTheDocument();
  
  const markerInstructions = getByText("Click markers for more info");
  expect(markerInstructions).toBeInTheDocument();
  
  const mapStyleInstructions = getByText("Change the Map style with the button");
  expect(mapStyleInstructions).toBeInTheDocument();

  const instructionsStyleToggleImage = getByAltText("Style Toggle");
  expect(instructionsStyleToggleImage).toBeInTheDocument();
  
  const positionInstructions = getByText("The position of the ISS is updated every 3 seconds");
  expect(positionInstructions).toBeInTheDocument();
  
  const proceedInstructions = getByText("(Click to Proceed)");
  expect(proceedInstructions).toBeInTheDocument();
});

