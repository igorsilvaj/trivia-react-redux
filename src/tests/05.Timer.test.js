import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen } from '@testing-library/react';
import App from "../App";
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
  })
})