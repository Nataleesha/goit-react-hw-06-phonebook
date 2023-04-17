import css from "components/Form/Form.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "components/Redux/filterSlice.js";

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);
  const filterNames = (e) => {
    const filterValue = e.target.value;
    dispatch(setFilter(filterValue));
  };

  return (
    <label>
      Find contact by name
      <input
        className={css.input}
        type="text"
        name="filter"
        value={filter}
        onChange={filterNames}
      />
    </label>
  );
};

export default Filter;
