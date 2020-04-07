import React from 'react';
import { render } from '@testing-library/react';
import HomePage from './home_page.js';
import { MemoryRouter } from "react-router-dom";

test('check version at Home page', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={["/"]}>
      <HomePage />
    </MemoryRouter>
  );
  const versionElem = getByText( 'v'+process.env.REACT_APP_DEMO_VERSION);
  expect(versionElem).toBeInTheDocument();
});
