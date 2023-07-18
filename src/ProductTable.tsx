import React, { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import DatePicker from "react-datepicker";
import DataTable from "react-data-table-component";
import "react-datepicker/dist/react-datepicker.css";
import "react-bootstrap-typeahead/css/Typeahead.css";

interface Product {
  brandName: string;
  brandType: string;
  dateProductArrived: string | Date | null;
  dateProductSold: string | Date | null;
  uniqueHashKey: string;
  numberOfProductSold: number;
  profitMargin: number;
}

const ProductTable: React.FC = () => {
  const [brandName, setBrandName] = useState<string>("");
  const [brandType, setBrandType] = useState<string>("");
  const [uniqueHashKey, setUniqueHashKey] = useState<string>("");
  const [dateProductArrived, setDateProductArrived] = useState<
    string | Date | null
  >(null);
  const [dateProductSold, setDateProductSold] = useState<string | Date | null>(
    null
  );

  const products: Product[] = [
    {
      brandName: "Brand A",
      brandType: "Type A",
      dateProductArrived: "2023-07-01",
      dateProductSold: "2023-07-05",
      uniqueHashKey: "abc123",
      numberOfProductSold: 100,
      profitMargin: 0.25,
    },
    {
      brandName: "Brand B",
      brandType: "Type B",
      dateProductArrived: "2023-07-02",
      dateProductSold: "2023-07-07",
      uniqueHashKey: "def456",
      numberOfProductSold: 200,
      profitMargin: 0.15,
    },
    {
      brandName: "Brand C",
      brandType: "Type C",
      dateProductArrived: "2023-07-03",
      dateProductSold: "2023-07-09",
      uniqueHashKey: "ghi789",
      numberOfProductSold: 150,
      profitMargin: 0.18,
    },
    {
      brandName: "Brand D",
      brandType: "Type D",
      dateProductArrived: "2023-07-04",
      dateProductSold: "2023-07-10",
      uniqueHashKey: "jkl012",
      numberOfProductSold: 300,
      profitMargin: 0.12,
    },
    {
      brandName: "Brand E",
      brandType: "Type E",
      dateProductArrived: "2023-07-05",
      dateProductSold: "2023-07-12",
      uniqueHashKey: "mno345",
      numberOfProductSold: 250,
      profitMargin: 0.2,
    },
  ];

  const columns = [
    {
      name: "Brand Name",
      selector: "brandName",
      sortable: true,
    },
    {
      name: "Brand Type",
      selector: "brandType",
      sortable: true,
    },
    {
      name: "Arrival Date",
      selector: "dateProductArrived",
      sortable: true,
      cell: (row: Product) =>
        row.dateProductArrived
          ? row.dateProductArrived.toString().split("T")[0]
          : "",
    },
    {
      name: "Sold Date",
      selector: "dateProductSold",
      sortable: true,
      cell: (row: Product) =>
        row.dateProductSold ? row.dateProductSold.toString().split("T")[0] : "",
    },
    {
      name: "Unique Hash Key",
      selector: "uniqueHashKey",
      sortable: true,
    },
    {
      name: "Number of Products Sold",
      selector: "numberOfProductSold",
      sortable: true,
    },
    {
      name: "Profit Margin",
      selector: "profitMargin",
      sortable: true,
      cell: (row: Product) => (row.profitMargin * 100).toFixed(2) + "%",
    },
  ];

  const filteredProducts = products.filter(
    (product) =>
      (!brandName ||
        product.brandName.toLowerCase().includes(brandName.toLowerCase())) &&
      (!brandType ||
        product.brandType.toLowerCase().includes(brandType.toLowerCase())) &&
      (!uniqueHashKey ||
        product.uniqueHashKey
          .toLowerCase()
          .includes(uniqueHashKey.toLowerCase())) &&
      (!dateProductArrived ||
        product.dateProductArrived?.toString().split("T")[0] ===
          dateProductArrived?.toString().split("T")[0]) &&
      (!dateProductSold ||
        product.dateProductSold?.toString().split("T")[0] ===
          dateProductSold?.toString().split("T")[0])
  );

  const handleBrandNameChange = (selected: any[]) => {
    setBrandName(selected[0]?.toString() || ""); // Use toString() to convert the option object to a string
  };

  const handleBrandTypeChange = (selected: any[]) => {
    setBrandType(selected[0]?.toString() || ""); // Use toString() to convert the option object to a string
  };

  const handleUniqueHashKeyChange = (selected: any[]) => {
    setUniqueHashKey(selected[0]?.toString() || ""); // Use toString() to convert the option object to a string
  };

  return (
    <div>
      <h1>Product Table</h1>
      <div className="typeahead-container">
        <div className="input-field">
          <Typeahead
            labelKey="brandName"
            options={products.map((product) => product.brandName)}
            placeholder="Select Brand Name"
            onChange={handleBrandNameChange}
          />
        </div>
        <div className="input-field">
          <Typeahead
            labelKey="brandType"
            options={products.map((product) => product.brandType)}
            placeholder="Select Brand Type"
            onChange={handleBrandTypeChange}
          />
        </div>
        <div className="input-field">
          <Typeahead
            labelKey="uniqueHashKey"
            options={products.map((product) => product.uniqueHashKey)}
            placeholder="Select Unique Hash Key"
            onChange={handleUniqueHashKeyChange}
          />
        </div>
      </div>

      <div className="datepicker-container">
        <DatePicker
          selected={
            typeof dateProductArrived === "string"
              ? null
              : (dateProductArrived as Date)
          } // Cast to Date
          placeholderText="Select Arrival Date"
          onChange={(date) => setDateProductArrived(date)}
          dateFormat="yyyy-MM-dd"
          isClearable
        />
      </div>
      <div className="datepicker-container">
        <DatePicker
          selected={
            typeof dateProductSold === "string"
              ? null
              : (dateProductSold as Date)
          } // Cast to Date
          placeholderText="Select Sold Date"
          onChange={(date) => setDateProductSold(date)}
          dateFormat="yyyy-MM-dd"
          isClearable
        />
      </div>

      <DataTable columns={columns} data={filteredProducts} />
    </div>
  );
};

export default ProductTable;
