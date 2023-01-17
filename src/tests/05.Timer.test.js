import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import Login from "../pages/Login";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from '@testing-library/react';
import App from "../App";
import { act } from "react-dom/test-utils";
import { test } from "./mocks/reduxState";

describe('Testes da página de game', () => {
  it('Deve renderizar o componente game na rota "/game"', () => {
    const { history } = renderWithRouterAndRedux(<App />, test, '/game');
    expect(history.location.pathname).toBe('/game')
  })
})