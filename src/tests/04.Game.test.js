import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import Login from "../pages/Login";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from '@testing-library/react';
import App from "../App";
import { act } from "react-dom/test-utils";
import { test2, test3 } from "./mocks/reduxState";
import { correctRanking } from "./mocks/localStorage";

describe('Testes da página de game', () => {
  it('Deve renderizar o componente game na rota "/game"', () => {
    const { history } = renderWithRouterAndRedux(<App />, test2, '/game');
    expect(history.location.pathname).toBe('/game')
  })
  it('Deve voltar para login ao acessar game com um token ínvalido', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/game');
    expect(history.location.pathname).toBe('/')
  })
  it('Deve renderizar um timer iniciando em "30" segundos', () => {
    renderWithRouterAndRedux(<App />, test2, '/game');
    const timer = screen.getByText(/tempo restante: 30/i)
    expect(timer).toBeVisible();
  })
  it('Deve renderizar a pontuação do usuario iniciando em "0"', () => {
    renderWithRouterAndRedux(<App />, test2, '/game');
    const score = screen.getByTestId('header-score');
    expect(score.innerHTML).toEqual('0');
  })
  it('Deve renderizar o game sem o botão "Próxima pergunta" no inicio', () => {
    renderWithRouterAndRedux(<App />, test2, '/game');
    const nextQuestion = screen.queryByText(/próxima pergunta/i);
    expect(nextQuestion).toBeNull();;
  })
  it('Deve renderizar a proxima questão ao clicar no botão "Próxima pergunta"', () => {
    renderWithRouterAndRedux(<App />, test2, '/game');
    const firstQuestion = screen.getByRole('button', {  name: /Andrew Gold/i});
    expect(firstQuestion).toBeVisible();
    userEvent.click(firstQuestion);
    const nextQuestion = screen.getByRole('button', {  name: /próxima pergunta/i});
    expect(nextQuestion).toBeVisible();
    userEvent.click(nextQuestion);
    const secondQuestion = screen.getByRole('button', {  name: /King Ghidora/i});
    expect(secondQuestion).toBeVisible();
  })
  it('Deve renderizar o componente de Feedback após clicar no botão "Próxima pergunta" estando na última pergunta', () => {
    const { history } = renderWithRouterAndRedux(<App />, test3, '/game');
    const lastQuestion = screen.getByRole('button', {  name: /Duke/i});
    expect(lastQuestion).toBeVisible();
    userEvent.click(lastQuestion);
    const nextQuestion = screen.getByRole('button', {  name: /próxima pergunta/i});
    expect(nextQuestion).toBeVisible();
    userEvent.click(nextQuestion);
    expect(history.location.pathname).toBe('/feedback');
  })
  it('Deve renderizar o componente Feedback e adicionar a pessoa usuaria ao ranking', () => {
    localStorage.setItem('ranking', JSON.stringify(correctRanking));
    const { history } = renderWithRouterAndRedux(<App />, test3, '/game');
    const lastQuestion = screen.getByRole('button', {  name: /Duke/i});
    expect(lastQuestion).toBeVisible();
    userEvent.click(lastQuestion);
    const nextQuestion = screen.getByRole('button', {  name: /próxima pergunta/i});
    expect(nextQuestion).toBeVisible();
    userEvent.click(nextQuestion);
    expect(history.location.pathname).toBe('/feedback');
  })
})