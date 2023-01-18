import React from "react";
import { useMemo } from "react";
import { useTable } from "react-table";

const Table = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <table {...getTableProps()} className="table table-zebra w-full">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className="hover cursor-pointer ">
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const SimpleTable = () => {
  const columns = useMemo(() => [
    {
      Header: "Top Keywords",
      columns: [
        {
          Header: "Keyword",
          accessor: "keyword",
        },
        {
          Header: "Revenue",
          accessor: "revenue",
        },

        {
          Header: "Conversion Rate",
          accessor: "conversion_rate",
        },
      ],
    },
  ]);

  const data = [
    {
      keyword: "Addidas",
      revenue: 100,

      conversion_rate: "60%",
    },
    {
      keyword: "Puma",
      revenue: 150,

      conversion_rate: "60%",
    },
    {
      keyword: "Jack & Jhons",
      revenue: 180,

      conversion_rate: "60%",
    },
    {
      keyword: "Nike",
      revenue: 1002,

      conversion_rate: "90%",
    },
    {
      keyword: "Where to buy",
      revenue: 1500,

      conversion_rate: "90%",
    },
    {
      keyword: "Doremon",
      revenue: 100,

      conversion_rate: "60%",
    },
  ];
  return (
    <div className=" overflow-x-auto">
      <Table columns={columns} data={data.slice(0, 5)} />
    </div>
  );
};

export default SimpleTable;
