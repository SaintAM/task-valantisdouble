import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  fetchFilters,
  selectFilters,
  setFilterName,
  setFilterValues,
} from "../../redux/slice/filters";
import { useDispatch, useSelector } from "react-redux";
import styles from "./FiltersBlock.module.scss";

export default function FiltersBlock({ setIsFilter }) {
  const dispatch = useDispatch();
  const { filterValues, filterName, fields } = useSelector(selectFilters);
  // цена, прайс, бренд
  const handleChangeFilter = (event) => {
    dispatch(setFilterName(event.target.value));
  };

  React.useEffect(() => {
    //получение fields
    if (filterName) {
      dispatch(fetchFilters({ filterName }));
    }
  }, [filterName]);

  // Значение цены прайса, бренда
  const handleChangeField = (event) => {
    dispatch(setFilterValues(event.target.value));
    setIsFilter(true);
  };
  const onClickRemove = () => {
    setIsFilter(false);
    dispatch(setFilterValues(""));
    dispatch(setFilterName(""));
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

{
  /* <InputLabel id="demo-simple-select-disabled-label">-</InputLabel>
<Select
	labelId="demo-simple-select-disabled-label"
	id="demo-simple-select-disabled"
	label="-"
>
	<MenuItem value="">
		<em>None</em>
	</MenuItem>
</Select> */
}
