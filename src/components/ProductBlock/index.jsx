import React from "react";
import styles from "./ProductBlock.module.scss";

const ProductBlock = ({ brand, id, price, product }) => {
  return (
    <div className={styles.root}>
      <p>{brand || "Неизвестный бренд"}</p>
      <p>{`id: ${id || '-'}`}</p>
      <p>
        {new Intl.NumberFormat("ru-RU", {
          style: "currency",
          currency: "USD",
        }).format(price)}
      </p>
      <p>{product || '-'}</p>
    </div>
  );
};

export default ProductBlock;
