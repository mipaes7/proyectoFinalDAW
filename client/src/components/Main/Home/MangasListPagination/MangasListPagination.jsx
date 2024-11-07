import React from "react";
import { Pagination } from "@mui/material";

const MangaListPagination = ({ page, totalPages, onPageChange }) => {
  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <article className="pagination">
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        size="large"
        variant="outlined"
        shape="rounded"
      />
    </article>
  );
};

export default MangaListPagination;
