import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, setCurrentPage } from "../../redux/slice/product";

const PaginationBase = () => {
  const { currentPage } = useSelector(selectProducts);
  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    dispatch(setCurrentPage(value));
  };
  return (
    <Stack spacing={2}>
      <Pagination count={currentPage + 7} page={currentPage} onChange={handleChange} />
    </Stack>
  );
};

export default PaginationBase;
