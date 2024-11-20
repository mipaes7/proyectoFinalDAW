import React from "react";
import { Pagination } from "@mui/material";
import { useMediaQuery } from "@mui/material"

const MangaListPagination = ({ page, totalPages, onPageChange }) => {

  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 480px)");

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
        siblingCount={isVerySmallScreen ? 0 : isSmallScreen ? 1 : 2}
        boundaryCount={isVerySmallScreen ? 0 : 1}
      />
    </article>
  );
};

export default MangaListPagination;
