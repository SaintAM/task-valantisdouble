import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { selectFilters, setFilterName, setFilterValues } from "../../redux/slice/filters";
import { useDispatch, useSelector } from "react-redux";

export default function FiltersBlock({ isFilter }) {
  const dispatch = useDispatch();
  const { filterValues, filterName, fields } = useSelector(selectFilters);

  const handleChangeFilter = (event) => {
    dispatch(setFilterName(event.target.value));
  };

  const handleChangeField = (event) => {
    dispatch(setFilterValues(event.target.value));
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 180 }}>
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

      <FormControl sx={{ m: 1, minWidth: 180 }}>
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
          {!fields ? (
            <>
              <MenuItem value={""}></MenuItem>
            </>
          ) : (
            fields.map((field, id) =>(
              <MenuItem key={id} value={field}>{field}</MenuItem>
						))
          )}
        </Select>
      </FormControl>
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
