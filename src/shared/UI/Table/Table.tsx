import React, { useState } from "react";
import "./Table.scss";
import { TableProps } from "./table.types";
import down from '@assets/svg/down-sort.svg'
import up from '@assets/svg/up-sort.svg'

export const Table: React.FC<TableProps> = ({ columns, data, onSort }) => {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key) {
      direction = sortConfig.direction === "asc" ? "desc" : "asc";
    }
    setSortConfig({ key, direction });
    onSort?.(key, direction);
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  return (
    <div className="table">
      <div className="table__header">
        {columns.map((column) => (
          <div
            key={column.key}
            className="table__column-header"
            onClick={() => handleSort(column.key)}
          >
            {column.title}
            <img src={sortConfig?.key === column.key && sortConfig.direction === "asc" ? down : up} alt="" />
          </div>
        ))}
      </div>
      <div className="table__body">
        {sortedData.map((row, index) => (
          <div key={index} className="table__row">
            {columns.map((column) => (
              <div className="table__cell" key={column.key} data-label={column.title}>
                {row[column.key]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
