import React from 'react';

type SearchFormProps = {
  onSubmit: () => void;
  onInputChange: (query: string) => void;
  query: string
}
const SearchForm: React.FC<SearchFormProps> = ({query, onSubmit, onInputChange}) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex">
      <input
        type="text"
        value={query}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Type to Search..."
        className="form-control"
      />
      <button type="submit" className="btn btn-primary ml-2">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
