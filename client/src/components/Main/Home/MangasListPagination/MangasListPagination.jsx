import React from "react";

const MangaListPagination = ({ page, totalPages, onPageChange }) => {
  
  const handlePreviousPage = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  return (
    <article className="pagination">
      <button className="pageBtn" onClick={handlePreviousPage} disabled={page === 1}>
        Previous
      </button>
      <span className="pageInfo">Page {page} of {totalPages}</span>
      <button className="pageBtn" onClick={handleNextPage} disabled={page === totalPages}>
        Next
      </button>
    </article>
  );
};

export default MangaListPagination;
