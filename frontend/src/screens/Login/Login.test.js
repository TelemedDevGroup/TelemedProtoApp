import React from 'react';
import { render } from '@testing-library/react';
import Login from './Login.js';
import { MemoryRouter } from "react-router-dom";

test('check version at Home page', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={["/"]}>
      <Login />
    </MemoryRouter>
  );
  const versionElem = getByText( 'v'+process.env.REACT_APP_DEMO_VERSION);
  expect(versionElem).toBeInTheDocument();
});
