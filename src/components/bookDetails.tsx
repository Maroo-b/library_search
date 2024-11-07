import React from 'react';
import { Pagination, Table } from 'react-bootstrap'
import { ApiResponse } from '../api/openApi';

type Pagination = {
    currentPage: number;
    totalPages: number;

}
type BookDetailsProps = {
    onPageChange: (page: number) => void;
    pagination: Pagination;
    data: ApiResponse | null
}
const BookDetails: React.FC<BookDetailsProps> = ({ data, onPageChange, pagination }) => {

    const { currentPage, totalPages } = pagination;
    const pageRange = 3; // Number of pages to show around the current page
    // Calculate the range of pages to show
    const startPage = Math.max(1, currentPage - pageRange);
    const endPage = Math.min(totalPages, currentPage + pageRange);

    return (
        <>
            {data && (

                <>
                    <Table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author name</th>
                                <th>Edition count</th>
                                <th>First publishing year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.docs?.map((item) => (
                                <tr>
                                    <td>{item.title}</td>
                                    <td>{item.author_name}</td>
                                    <td>{item.edition_count}</td>
                                    <td>{item.first_publish_year}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination>
                        <Pagination.First onClick={() => onPageChange(1)} disabled={currentPage === 1} />
                        <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />

                        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
                            <Pagination.Item
                                key={page}
                                active={page === currentPage}
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </Pagination.Item>
                        ))}

                        <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                        <Pagination.Last onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} />
                    </Pagination>

                </>
            )}
        </>
    );
};

export default BookDetails;