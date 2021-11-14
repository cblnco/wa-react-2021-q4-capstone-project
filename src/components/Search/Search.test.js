import { screen, render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import products from '../../mocks/en-us/products.json';
import store from '../../redux/store';
import Search from '.';

describe('Homepage functionality', () => {
  const renderSearch = (searchTerm) => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/search?q=${searchTerm}`]}>
          <Route path="/search">
            <Search />
          </Route>
        </MemoryRouter>
      </Provider>
    );
  };

  it('Should render search term results', async () => {
    const {
      data: { name },
    } = products.results[0];
    renderSearch('sampleSearch');
    expect(await screen.findByText(name)).toBeInTheDocument();
  });

  it('Should render no results found message', async () => {
    const searchTerm = 'none';
    renderSearch(searchTerm);
    expect(
      await screen.findByText(`No results found for '${searchTerm}'.`)
    ).toBeInTheDocument();
  });
});
