import {
  render, screen, fireEvent, configure,
} from '@testing-library/react';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import Search from '../Components/Search/Search';

configure({ testIdAttribute: 'id' })

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

test('renders search', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Search />
    </QueryClientProvider>
  );
  const searchElement = screen.queryByPlaceholderText(/Search/i) as Element;

  expect(searchElement).toBeInTheDocument();
  expect(searchElement?.hasAttribute('readonly')).toBeTruthy();
  
  fireEvent.select(searchElement)

  expect(searchElement?.getAttribute('readonly')).toBeFalsy();
});

test('search input accepts input', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Search />
    </QueryClientProvider>
  );
  const searchElement = screen.queryByPlaceholderText(/Search/i) as Element;

  expect(searchElement).toBeInTheDocument();
  expect(searchElement?.hasAttribute('readonly')).toBeTruthy();
  
  fireEvent.select(searchElement)
  fireEvent.change(searchElement, {
    target: { value: "test" }
  })

  expect(searchElement).toHaveValue('test')
});

export {}