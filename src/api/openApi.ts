
export type BookData = {
  edition_count: string,
  title: string,
  author_name: string[],
  first_publish_year: number
}

export type ApiResponse = {
    numFound: number,
    docs: BookData[]
}
  export const itemsPerPage = 15;
  const baseApi = 'https://openlibrary.org/search.json?fields=title,author_name,edition_count,first_publish_year'



  export const fetchData = async (page: number, query: string): Promise<ApiResponse> => {
    const encodedValue = encodeURIComponent(query);
    const response = await fetch(`${baseApi}&q=${encodedValue}&page=${page}&limit=${itemsPerPage}`);
    const result : ApiResponse = await response.json();
    return result
  }