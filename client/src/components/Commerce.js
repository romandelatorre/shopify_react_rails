import React from "react";
import { useEffect, useState } from "react";

export const Commerce = () => {
  const [dataCommerce, setDataCommerce] = useState([]);
  
  useEffect(() => {
    fetch("api/v1/commerces")
      .then((response) => response.json())
      .then((data) => setDataCommerce(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {dataCommerce.map((item) => (
        <div>{item.product}</div>
      ))}
    </div>
  );
};
