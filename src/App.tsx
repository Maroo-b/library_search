import { useState, useEffect } from 'react'
import { Container, Spinner } from 'react-bootstrap';
import SearchForm from './components/searchFrom';
import BookDetails from './components/bookDetails';
import GuestNavBar from './components/navBar/guestNavBar';
import UserNavBar from './components/navBar/userNavBar';
import { fetchData, ApiResponse } from './api/openApi';
import { isValidUser } from './utilities/login';

import './App.css'


function App() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [callDurations, setCallDuration] = useState<number[]>([])

  const handleSubmit = () => {
    fetchDataWithDuration(currentPage)
  };

  const itemsPerPage = 5;

  const fetchDataWithDuration = async (page: number) => {
    setLoading(true);
    const startTime = performance.now();
    const response = await fetchData(page, query)
    setData(response);
    setTotalPages(Math.ceil(response.numFound / itemsPerPage));
    const endTime = performance.now();
    setCallDuration( (prevDuration) => [endTime - startTime, ...prevDuration])
    setLoading(false);
  }

  const handleLogin = (username: string, password: string): boolean => {
    if (isValidUser(username, password)) {
      setIsAuthenticated(true);
      return true
    } else {
      setIsAuthenticated(false);
      return false
    }
  };

  useEffect(() => {
    if (!query) return

    const debounce = setTimeout(() => {
      fetchDataWithDuration(currentPage)
    }, 500)

    return () => clearTimeout(debounce)
  }, [currentPage, query]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const averageDuration = (): string|null => {
    console.log({callDurations})
    if (callDurations.length > 0) {
      const sum = callDurations.reduce((acc, curr) => acc + curr, 0);
      return (sum / callDurations.length).toFixed(2);
    }
    return null
  }
  return (
    <>
      <Container>
        {isAuthenticated ? 
          <UserNavBar averageDuration={averageDuration} setIsAuthenticated={setIsAuthenticated} />
      :
      <GuestNavBar handleLogin={handleLogin} />
      }
        {isAuthenticated && (
          <div>

            <h1>Library search</h1>
            <SearchForm query={query} onSubmit={handleSubmit} onInputChange={setQuery} />
            {
              loading ?
                <div className="text-center mt-3">
                  <Spinner animation="border" role="status"/>
                </div>
                : (

                  <BookDetails data={data} onPageChange={handlePageChange} pagination={{currentPage, totalPages}} />
                )
            }
          </div>

        )}
      </Container >
    </>
  )
}

export default App
