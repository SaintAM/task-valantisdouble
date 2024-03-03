import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "./ProductBlock/Skeleton";
import ProductBlock from "./ProductBlock";
import { fetchProducts, selectProducts } from "../redux/slice/product";
import { fetchFilters, selectFilters } from "../redux/slice/filters";
import PaginationBase from "./Pagination";
import FiltersBlock from "./FiltersBlock";

const Home = () => {
  const dispatch = useDispatch();
  const { items, status, currentPage } = useSelector(selectProducts);
  const { filterValues, fields, filterName } = useSelector(selectFilters);
  const [isFilter, setIsFilter] = React.useState(false);

  React.useEffect(() => {
    // FilterName менять будем в ProductBlock

    dispatch(fetchProducts({ isFilter, currentPage }));
  }, [currentPage]);

  React.useEffect(() => {
    dispatch(fetchFilters({ filterName }));
  }, [filterName]);

  React.useEffect(() => {
    setIsFilter(true)
    dispatch(fetchProducts({ isFilter, filterName, filterValues }));
    setIsFilter(false)

  }, [filterValues]);

  if (!items) return <p>Загрузка...</p>;

  const products = items.map((obj, i) => <ProductBlock key={i} {...obj} />);
  const skeletons = [...new Array(50)].map((_, i) => <Skeleton key={i} />);

  return (
    <>
      <div className="wrapper">
        <div className="pagination">
          <PaginationBase />
        </div>

        <div className="filter">
          <FiltersBlock isFilter={isFilter} />
        </div>

        <div className="body-item">
          {status === "failed" ? (
            <div> произошла ошибка</div>
          ) : status === "pending" ? (
            skeletons
          ) : (
            products
          )}
        </div>
      </div>
    </>
  );
};

export default Home;