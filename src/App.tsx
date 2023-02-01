import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import Homepage from './Pages/Homepage/Homepage';
import Show from './Pages/Show/Show';
import ErrorBoundary from './ErrorBoundary';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/show/:id" element={<Show />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
