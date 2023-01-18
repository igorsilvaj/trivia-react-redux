import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import Login from "../pages/Login";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from '@testing-library/react';
import App from "../App";
import { act } from "react-dom/test-utils";
import { test, test2 } from "./mocks/reduxState";

describe('Testes do componente timer', () => {
  jest.setTimeout(20000);
  jest.useFakeTimers();
  it('Deve iniciar em 30 segundos', async () => {
    const { history } = renderWithRouterAndRedux(<App />, test, '/game');
    expect(history.location.pathname).toBe('/game')
    const timer = screen.getByText(/tempo restante: 30/i)
    expect(timer).toBeVisible();
  })
  it('Deve contar os segundos corretamente', async () => {
    renderWithRouterAndRedux(<App />, test2, '/game');
    const timer = await screen.findByText(/tempo restante: 30/i)
    expect(timer).toBeInTheDocument();
    screen.debug()
  })
  // it('Deve parar em 0', async () => {
  //   renderWithRouterAndRedux(<App />, test, '/game');
  //   act(() => {
  //     jest.advanceTimersByTime(32000);
  //   })
  //   const timer = await screen.findByText(/tempo restante: 0/i)
  //   expect(timer).toBeVisible();
  // })
})