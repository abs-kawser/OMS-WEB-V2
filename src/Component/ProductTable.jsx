import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DIGITAL_CLOCK_VIEW_HEIGHT } from "@mui/x-date-pickers/internals/constants/dimensions";
import { useState, useEffect } from "react";
import SeletedProduct from "./SeletedProduct";
import { arrayIncludes } from "@mui/x-date-pickers/internals/utils/utils";

export default function ProductTable({ Products }) {

  const [selectedProductList, setSelectedProductList] = useState([]);
  let result = window.localStorage.getItem("selectedItemLists");
  const arr = JSON.parse(result);

  // console.log("Products",Products);
  // console.log("my arr: ", arr);

  
  const handleChange = (id, quantity) => {
    // console.log(selectedProductList);
    let temp = Array.from(
      selectedProductList.length ? selectedProductList : Products
    );

    const existingProduct = temp.find((product) => product.ProductId === id);

    if (existingProduct) {
      existingProduct.quantity = quantity;
      setSelectedProductList(temp);
    }
    window.localStorage.setItem("selectedItemLists", JSON.stringify(temp));
  };

  return (   
    <div style={{ width: "800px", margin: "auto" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Products</TableCell>
              <TableCell align="right">Qunitity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Products?.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.Name}
                  <br />
                  Price:{item.MRP}
                  <br />
                  Pack Size: {item.PackSize}
                </TableCell>
                <TableCell align="right">
                  <input
                    className="qtyInput"
                    placeholder="QTY"
                    type="number"
                    value={item.quantity ? item.quantity : ""}
                    onChange={(e) =>
                      handleChange(item.ProductId, e.target.value)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  );
}
