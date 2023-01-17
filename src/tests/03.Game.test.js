import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import Login from "../pages/Login";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from '@testing-library/react';
import App from "../App";
import { act } from "react-dom/test-utils";
import { test } from "./mocks/reduxState";

describe('', () => {
  it('', () => {
    renderWithRouterAndRedux(<Login />);

  })
})