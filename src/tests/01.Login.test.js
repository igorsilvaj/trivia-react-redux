import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import Login from "../pages/Login";
import userEvent from "@testing-library/user-event";
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import App from "../App";
import { act } from "react-dom/test-utils";

const mockData = '3ae74acd9b3e9db480abce3be612b84b54e85f0482b0448059ca764939849236';

describe('Test Login component', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockData),
      });
  });

  it('should be possible to write the user name in the correct field', () => {
    renderWithRouterAndRedux(<Login />);
    const email = screen.getByRole('textbox', { name: /email:/i });
    expect(email).toBeInTheDocument();
    userEvent.type(email, 'Arthur@betrybe.com');
    expect(email.value).toBe('Arthur@betrybe.com');
  });

  it('should redirect to game page', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const btnPlay = screen.getByRole('button', { name: /play/i });
    expect(btnPlay).toBeDisabled();
    const email = screen.getByRole('textbox', { name: /email:/i });
    const name = screen.getByRole('textbox', { name: /nome:/i });
    expect(email).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    
    
    userEvent.type(email, 'Arthur@betrybe.com');
    userEvent.type(name, 'Arthur');
    expect(btnPlay).toBeEnabled();
    userEvent.click(btnPlay);

    await waitFor(() => expect(history.length).toBe(2))
    await act( async () => {
      expect(history.location.pathname).toBe('/game')
    })
  });

  it('should redirect to game settings page', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    
    const btnConfig = screen.getByRole('button', {  name: /configurações/i})
    userEvent.click(btnConfig);
    const { pathname } = history.location;
    expect(pathname).toBe('/settings')
  });
});
