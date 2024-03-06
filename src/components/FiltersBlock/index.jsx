import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import styles from "./FiltersBlock.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFilters,
  selectFilters,
  setFilterName,
  setFilterValues,
} from "../../redux/slice/filters";
import { setCurrentPage } from "../../redux/slice/product";

export default function FiltersBlock({ setIsFilter }) {
  const dispatch = useDispatch();
  const { filterValues, filterName, fields } = useSelector(selectFilters);

  const handleChangeFilter = (event) => {
    dispatch(setFilterName(event.target.value));
  };

  React.useEffect(() => {
    if (filterName) {
      dispatch(fetchFilters({ filterName }));
    }
  }, [filterName]);

  const handleChangeField = (event) => {
    dispatch(setFilterValues(event.target.value));
    dispatch(setCurrentPage(1));
    setIsFilter(true);
  };

  const onClickRemove = () => {
    setIsFilter(false);
    dispatch(setFilterValues(""));
    dispatch(setFilterName(""));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className={styles.root}>
      <FormControl sx={{ m: 0, minWidth: 180 }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Фильтрация
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={filterName}
          onChange={handleChangeFilter}
          autoWidth
          label="Filters"
        >
          <MenuItem value={"price"}>Цена</MenuItem>
          <MenuItem value={"brand"}>Название бренда</MenuItem>
          <MenuItem value={"product"}>Название товара</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 0, minWidth: 240 }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Выбирите из списка
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={filterValues}
          onChange={handleChangeField}
          autoWidth
          label="Fields"
        >
          {!fields.length ? (
            <>
              <MenuItem value={""}></MenuItem>
            </>
          ) : (
            fields.map((field, id) => (
              <MenuItem key={id} value={field}>
                {field}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      <Button variant="outlined" color="error" onClick={onClickRemove}>
        Очистить
      </Button>
    </div>
  );
}
