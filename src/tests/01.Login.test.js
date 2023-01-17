import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import Login from "../pages/Login";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from '@testing-library/react';
import App from "../App";
import { act } from "react-dom/test-utils";
import { test } from "./mocks/reduxState";

const token = '38266f6dd1a9deb4e0a9b3357fc1a93f55dde432ae3c290c26624bb101a7bdb5';

describe('Testa o componente de login', () => {
  it('deve ser possível escrever o nome de usuário no campo correto', () => {
    renderWithRouterAndRedux(<Login />);
    const email = screen.getByRole('textbox', { name: /email:/i });
    expect(email).toBeInTheDocument();
    userEvent.type(email, 'Arthur@betrybe.com');
    expect(email.value).toBe('Arthur@betrybe.com');
  });

  it('deve redirecionar para a página do jogo', async () => {
    const { history } = renderWithRouterAndRedux(<App />, test, '/');

    const btnPlay = screen.getByRole('button', { name: /play/i });
    const email = screen.getByRole('textbox', { name: /email:/i });
    const name = screen.getByRole('textbox', { name: /nome:/i });

    expect(btnPlay).toBeDisabled();
    expect(email).toBeInTheDocument();
    expect(name).toBeInTheDocument();

    userEvent.type(email, 'Arthur@betrybe.com');
    userEvent.type(name, 'Arthur');
    expect(btnPlay).toBeEnabled();

    await act(async () => {
      userEvent.click(btnPlay);

      const waiting = true;
      await new Promise((r) => setTimeout(r, 2000));
      expect(waiting).toBeDefined();

      await waitFor(() => expect(history.length).toBe(2))
      expect(history.location.pathname).toBe('/game')
    })
  });

  it('deve redirecionar para a página de configurações do jogo', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const btnConfig = screen.getByRole('button', { name: /configurações/i })
    userEvent.click(btnConfig);
    const { pathname } = history.location;
    expect(pathname).toBe('/settings')
  });

  it('deve carregar um componente loading enquanto faz chamadas a API', async () => {
    renderWithRouterAndRedux(<App />, test, '/');

    const btnPlay = screen.getByRole('button', { name: /play/i });
    const email = screen.getByRole('textbox', { name: /email:/i });
    const name = screen.getByRole('textbox', { name: /nome:/i });

    expect(btnPlay).toBeDisabled();
    expect(email).toBeInTheDocument();
    expect(name).toBeInTheDocument();

    userEvent.type(email, 'Arthur@betrybe.com');
    userEvent.type(name, 'Arthur');
    expect(btnPlay).toBeEnabled();

    userEvent.click(btnPlay);

    expect(await screen.findByText('Loading...')).toBeInTheDocument()
  });
});
