import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import { exportExcel, exportPdf } from "./export";
import "./style.css";
import TextInput from "../../ui/inputs/textInput";
import DatePicker from "../../ui/inputs/datePicker";
import SingleSelectInput from "../../ui/inputs/singleSelectInput";
import { LuFilter, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { VscListFilter } from "react-icons/vsc";

const Table = ({ tableOptions, tableTitle, className }) => {
  let timeoutId = 0;

  const [selectedRows, setSelectedRows] = useState([]);
  const [operationsMenu, setOperationsMenu] = useState(false);
  const [columnsMenu, setColumnsMenu] = useState(false);
  const [downloadMenu, setDownloadMenu] = useState(false);
  const [searchInput, setSearchInput] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [activeColumns, setActiveColumns] = useState(tableOptions?.columns);
  const [activeFilters, setActiveFilters] = useState([]);

  const [rowCount, setRowCount] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [pageData, setPageData] = useState([]);
  const [visibleFilterMenu, setVisibleFilterMenu] = useState(null);

  const [sortParams, setSortParams] = useState({
    column: null,
    direction: null,
  });

  const [tableOptionsData, setTableOptionsData] = useState(tableOptions);
  const [tableData, setTableData] = useState(tableOptions?.data);

  const inputRef = useRef();

  const downloadOptions = [
    {
      id: "excel",
      icon: "pi pi-file",
      label: "Excel",
      onClick: () => exportExcel(tableData, tableOptions, "test"),
    },
    {
      id: "pdf",
      icon: "pi pi-file",
      label: "PDF",
      onClick: () => exportPdf(tableData, tableOptions, "test"),
    },
  ];

  const rowCountOptions = [
    {
      value: 10,
      label: "10",
    },
    {
      value: 20,
      label: "20",
    },
    {
      value: 50,
      label: "50",
    },
    {
      value: 100,
      label: "100",
    },
  ];

  const filterOptions = [
    {
      id: "contains",
      label: "İçeren",
      type: ["text", "number"],
      formula: (val, data) => {
        if (data.includes(val)) {
          return true;
        }
      },
    },
    {
      id: "equals",
      label: "Aynı",
      type: ["text", "number", "dropdown", "refData"],
      formula: (val, data) => {
        if (data == val) {
          return true;
        }
      },
    },
    {
      id: "starts",
      label: "Başlayan",
      type: ["text"],
      formula: (val, data) => {
        if (data.startsWith(val, 0)) {
          return true;
        }
      },
    },
    {
      id: "starts",
      label: "Başlayan",
      type: ["text"],
      formula: (val, data) => {
        if (data.endsWith(val, 0)) {
          return true;
        }
      },
    },
    {
      id: "greater",
      label: "Büyüktür",
      type: ["number"],
      formula: (val, data) => {
        if (val > data) {
          return true;
        }
      },
    },
    {
      id: "lower",
      label: "Küçüktür",
      type: ["number"],
      formula: (val, data) => {
        if (val > data) {
          return true;
        }
      },
    },
    {
      id: "equalDate",
      label: "Eşit",
      type: ["date"],
      formula: (val, data) => {
        if (moment(val, "YYYY-MM-DD").isSame(moment(data, "YYYY-MM-DD"))) {
          return true;
        }
      },
    },
    {
      id: "lowerDate",
      label: "Önce",
      type: ["date"],
      formula: (val, data) => {
        if (moment(val, "YYYY-MM-DD").isAfter(moment(data, "YYYY-MM-DD"))) {
          return true;
        }
      },
    },
    {
      id: "greaterDate",
      label: "Sonra",
      type: ["date"],
      formula: (val, data) => {
        if (moment(val, "YYYY-MM-DD").isBefore(moment(data, "YYYY-MM-DD"))) {
          return true;
        }
      },
    },
    {
      id: "betweenDate",
      label: "Arasında",
      type: ["date"],
      formula: (val, data) => {
        if (moment(val, "YYYY-MM-DD").isBefore(moment(data, "YYYY-MM-DD"))) {
          return true;
        }
      },
    },
  ];

  useEffect(() => {
    if (tableOptions) {
      calculateTableData(tableOptions);
    }
  }, [tableOptions]);

  useEffect(() => {
    const data = tableData?.filter(
      (item, index) =>
        index + 1 > rowCount * (activePage - 1) &&
        index + 1 <= rowCount * activePage
    );

    const pages = (tableData?.length / rowCount).toString();

    setPageCount(
      parseInt(pages.split(".")[0]) + parseInt(pages.split(".")[1] ? 1 : 0)
    );

    setPageData(data);
  }, [tableData, activePage, rowCount]);

  const calculateTableData = async (tableOptions) => {
    const newData = [...tableOptions?.data];

    for (const row of newData) {
      if (!row.id) {
        row.id = Math.random();
      }
    }

    setTableData(newData);
  };

  const handleSelection = (rowData) => {
    let rows = [...selectedRows];
    const found = rows.find((row) => row.id == rowData.id);
    if (tableOptions?.selectionMode == "multiple") {
      if (found) {
        rows = rows?.filter((item) => item.id != rowData.id);
      } else {
        rows.push(rowData);
      }
    } else {
      if (found) {
        rows = [];
      } else {
        rows = [rowData];
      }
    }
    if (tableOptions?.getSelectionValue !== undefined) {
      calculateSelectionValue(rows);
    }
    setSelectedRows(rows);
  };

  const handleSelectionAll = (val) => {
    let rows = [];
    if (selectedRows?.length != tableData?.length) {
      for (const item of tableData) {
        rows.push(item);
      }
    }
    if (tableOptions?.getSelectionValue !== undefined) {
      calculateSelectionValue(rows);
    }
    setSelectedRows(rows);
  };

  const calculateSelectionValue = (rows) => {
    if (tableOptions?.selectionMode == "multiple") {
      tableOptions?.getSelectionValue(rows, tableData);
    } else {
      tableOptions?.getSelectionValue(
        rows?.length > 0 ? rows[0] : {},
        tableData
      );
    }
  };

  const changeFilterValue = (val, column) => {
    let newFilters = [...activeFilters];
    let found = false;

    const defaultOperators = {
      text: "contains",
      number: "contains",
      dropdown: "equals",
      refData: "equals",
      date: "equalDate",
    };

    if (val !== null && val !== undefined && val !== "") {
      for (const item of newFilters) {
        if (item.field == column.field) {
          found = true;
          item.val = val;
        }
      }
      if (!found) {
        newFilters.push({
          field: column.field,
          val: val,
          operator: column.filterOperator
            ? column.filterOperator
            : defaultOperators[column.dataType],
        });
      }
    } else {
      newFilters = newFilters?.filter((item) => item.field != column.field);
    }

    handleTableQuery(newFilters, activePage, rowCount);
    setActiveFilters(newFilters);
  };

  const changeFilterOperator = (val, column) => {
    let newFilters = [...activeFilters];
    let found = false;

    if (val) {
      for (const item of newFilters) {
        if (item.field == column.field) {
          if (val) {
            found = true;
            item.operator = val;
          }
        }
      }
      if (!found) {
        newFilters.push({
          field: column.field,
          val: "",
          operator: val,
        });
      }
    } else {
      newFilters = newFilters?.filter((item) => item.field != column.field);
    }

    handleTableQuery(newFilters, activePage, rowCount);
    setActiveFilters(newFilters);
  };

  const convertValue = (val, type) => {
    let value;
    if (val != undefined && val != null) {
      if (type == "contains" || "equals") {
        const stringValue = val.toString();
        value = stringValue.toLocaleUpperCase("TR");
      }
    } else {
      value = val;
    }

    return value;
  };

  useEffect(() => {
    if (activeFilters?.length > 0) {
      let filteredData = [...tableOptions?.data];

      for (const element of activeFilters) {
        filteredData = filteredData?.filter((item) =>
          filterOptions
            .find((item) => item.id == element.operator)
            .formula(
              convertValue(element.val, element.operator),
              convertValue(item[element.field], element.operator)
            )
        );
      }
      setTableData(filteredData);
    } else {
      setTableData(tableOptions?.data);
    }
  }, [activeFilters]);

  const selectColumn = (val) => {
    let newData = [...activeColumns];
    if (activeColumns?.map((item) => item.field).includes(val.field)) {
      newData = newData?.filter((item) => item.field != val.field);
    } else {
      newData.push(val);
    }
    setActiveColumns(newData);
  };

  const selectSorting = (column) => {
    let direction = "asc";
    if (sortParams.column == column.field) {
      if (!sortParams.direction) {
        direction = "asc";
      } else if (sortParams.direction == "asc") {
        direction = "desc";
      } else if (sortParams.direction == "desc") {
        direction = null;
      }
    }

    const newData = [...tableData];

    let sortedData = [];

    if (!direction) {
      sortedData = newData;
    } else {
      if (column.dataType == "text" || column.dataType == "dropdown") {
        if (direction == "asc") {
          sortedData = newData.sort(function (a, b) {
            return b[column.field].localeCompare(a[column.field]);
          });
        } else if (direction == "desc") {
          sortedData = newData.sort(function (a, b) {
            return a[column.field].localeCompare(b[column.field]);
          });
        }
      } else if (column.dataType == "number") {
        if (direction == "asc") {
          sortedData = newData.sort(function (a, b) {
            return b[column.field] - a[column.field];
          });
        } else if (direction == "desc") {
          sortedData = newData.sort(function (a, b) {
            return a[column.field] - b[column.field];
          });
        }
      } else if (column.dataType == "date") {
        if (direction == "asc") {
          sortedData = newData.sort(function (a, b) {
            return (
              moment(b[column.field], "YYYY-MM-DD").toDate() -
              moment(a[column.field], "YYYY-MM-DD").toDate()
            );
          });
        } else if (direction == "desc") {
          sortedData = newData.sort(function (a, b) {
            return (
              moment(a[column.field], "YYYY-MM-DD").toDate() -
              moment(b[column.field], "YYYY-MM-DD").toDate()
            );
          });
        }
      } else if (column.dataType == "refData") {
        if (direction == "asc") {
          sortedData = newData.sort(function (a, b) {
            return b["refData" + column.field].localeCompare(
              a["refData" + column.field]
            );
          });
        } else if (direction == "desc") {
          sortedData = newData.sort(function (a, b) {
            return a["refData" + column.field].localeCompare(
              b["refData" + column.field]
            );
          });
        }
      }
    }

    setTableData(sortedData);
    setSortParams({ column: column.field, direction: direction });
  };

  const handleSearch = async () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
      const value = inputRef.current.value;
      if (value?.length == 0) {
        setTableData(tableOptions?.data);
      } else if (value?.length > 2) {
        const newData = [...tableOptions?.data];

        const filteredData = [];
        for (const row of newData) {
          for (const property in row) {
            if (convertValue(row[property]).includes(convertValue(value))) {
              filteredData.push(row);
            }
          }
        }
        setTableData(filteredData);
      }
    }, 1500);
  };

  const handleTableQuery = async (activeFilters, activePage, rowCount) => {};

  return (
    <div className={`ui-table ${className}`}>
      {/* <div className="ui-table-topbar">
        <div className="ui-table-topbar-title">
          <span>{tableTitle}</span>
        </div>
        <div className="ui-table-topbar-controls">
          <div className="ui-table-topbar-buttons">
            {tableOptionsData?.headers?.dynamicButtons
              ?.filter((button) => !button.operation)
              ?.map((button) => (
                <>
                  {(button.disabled === false ||
                    (button.disabled !== true && selectedRows?.length > 0)) && (
                    <button
                      type="button"
                      className="ui-table-topbar-button"
                      onClick={() =>
                        button._onClick(
                          tableOptions?.selectionMode == "multiple"
                            ? selectedRows
                            : selectedRows?.length > 0
                            ? selectedRows[0]
                            : {},
                          tableData
                        )
                      }
                    >
                      <i className={button.icon}></i>
                      <span>{button.label}</span>
                    </button>
                  )}
                </>
              ))}
          </div>
          {tableOptionsData?.headers?.dynamicButtons?.filter(
            (button) => button.operation
          )?.length > 0 && (
            <div className="ui-table-topbar-operations">
              {operationsMenu && (
                <div
                  className="ui-table-mask"
                  onClick={() => setOperationsMenu(false)}
                ></div>
              )}
              <button
                type="button"
                className="ui-table-topbar-operations-button"
                onClick={() => setOperationsMenu(!operationsMenu)}
              >
                <i className="pi pi-cog"></i>
              </button>
              {operationsMenu && (
                <div className="ui-table-topbar-operations-menu">
                  {tableOptionsData?.headers?.dynamicButtons
                    ?.filter((button) => button.operation)
                    ?.map((button) => (
                      <>
                        {button.disabled !== true &&
                          selectedRows?.length > 0 && (
                            <button
                              type="button"
                              className="ui-table-topbar-button"
                              onClick={() =>
                                button._onClick(
                                  tableOptions?.selectionMode == "multiple"
                                    ? selectedRows
                                    : selectedRows?.length > 0
                                    ? selectedRows[0]
                                    : {},
                                  tableData
                                )
                              }
                            >
                              <i className={button.icon}></i>
                              <span>{button.label}</span>
                            </button>
                          )}
                      </>
                    ))}
                </div>
              )}
            </div>
          )}

          <div className="ui-table-topbar-columns">
            {columnsMenu && (
              <div
                className="ui-table-mask"
                onClick={() => setColumnsMenu(false)}
              ></div>
            )}
            <button
              type="button"
              className="ui-table-topbar-columns-button"
              onClick={() => setColumnsMenu(!columnsMenu)}
            >
              <i className="pi pi-bars"></i>
            </button>
            {columnsMenu && (
              <div className="ui-table-topbar-columns-menu">
                <div
                  className="ui-table-topbar-columns-menu-header"
                  onClick={() =>
                    setActiveColumns(
                      activeColumns?.length == tableOptions?.columns?.length
                        ? []
                        : tableOptions?.columns
                    )
                  }
                >
                  <div
                    className={`ui-table-topbar-columns-header-check ${
                      activeColumns?.length == tableOptions?.columns?.length &&
                      "active"
                    } `}
                  ></div>

                  <span className="ui-table-topbar-columns-header-label">
                    Hepsi
                  </span>
                </div>
                <div className="ui-table-topbar-columns-menu-body">
                  {tableOptions?.columns?.map((item) => (
                    <div
                      className="ui-table-topbar-columns-item"
                      onClick={() => selectColumn(item)}
                    >
                      <div
                        className={`ui-table-topbar-columns-item-check ${
                          activeColumns
                            ?.map((item) => item.field)
                            .includes(item.field) && "active"
                        } `}
                      ></div>

                      <span className="ui-table-topbar-columns-item-label">
                        {item.header}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className={`ui-table-topbar-search ${searchInput && "active"}`}>
            <input
              className="ui-table-topbar-search-input"
              placeholder="Search"
              ref={inputRef}
              value={searchInputValue}
              onChange={(e) => {
                handleSearch();
                setSearchInputValue(e.target.value);
              }}
            ></input>

            {searchInput ? (
              <button
                type="button"
                className="ui-table-topbar-search-button"
                onClick={() => {
                  setTableData(tableOptions?.data);
                  setSearchInputValue("");
                  setSearchInput(false);
                }}
              >
                <i className="pi pi-times"></i>
              </button>
            ) : (
              <button
                type="button"
                className="ui-table-topbar-search-button"
                onClick={() => setSearchInput(true)}
              >
                <i className="pi pi-search"></i>
              </button>
            )}
          </div>
          <div className="ui-table-topbar-download">
            {downloadMenu && (
              <div
                className="ui-table-mask"
                onClick={() => setDownloadMenu(false)}
              ></div>
            )}
            <button
              type="button"
              className="ui-table-topbar-download-button"
              onClick={() => setDownloadMenu(!downloadMenu)}
            >
              <i className="pi pi-download"></i>
            </button>
            {downloadMenu && (
              <div className="ui-table-topbar-download-menu">
                {downloadOptions?.map((item) => (
                  <>
                    <div
                      className="ui-table-topbar-download-item"
                      onClick={() => item.onClick && item.onClick(tableData)}
                    >
                      <i className={item.icon}></i>
                      <span>{item.label}</span>
                    </div>
                  </>
                ))}
              </div>
            )}
          </div>
        </div>
      </div> */}
      <div className="ui-table-scroll">
        <div className="ui-table-header">
          <div className="ui-table-header-titles">
            {!tableOptions?.isSelectionMode && (
              <div className="ui-table-header-titles-selection"></div>
            )}
            {tableOptions?.isSelectionMode &&
              tableOptions?.selectionMode !== "multiple" && (
                <div className="ui-table-header-titles-radiobutton"></div>
              )}
            {tableOptions?.selectionMode == "multiple" && (
              <div className="ui-table-header-titles-checkbox"></div>
            )}

            {tableOptions?.columns
              ?.filter((column) =>
                activeColumns?.map((item) => item.field).includes(column.field)
              )
              ?.map((column) => (
                <div
                  className={`ui-table-header-titles-column column-type-${column.dataType}`}
                  style={{ minWidth: column.width && column.width }}
                >
                  <span className="ui-table-header-titles-title">
                    {column.header}
                  </span>
                  <button
                    type="button"
                    className="ui-table-header-titles-sort"
                    onClick={() => selectSorting(column)}
                  >
                    {(sortParams.column == null ||
                      sortParams.column != column.field ||
                      sortParams.direction == null) && (
                      <i className="pi pi-sort-alt"></i>
                    )}

                    {sortParams.column == column.field &&
                      sortParams.direction == "asc" && (
                        <i className="pi pi-arrow-down ui-table-selected-sort"></i>
                      )}
                    {sortParams.column == column.field &&
                      sortParams.direction == "desc" && (
                        <i className="pi pi-arrow-up ui-table-selected-sort"></i>
                      )}
                  </button>
                </div>
              ))}
          </div>
          <div className="ui-table-header-filters">
            {!tableOptions?.isSelectionMode && (
              <div className="ui-table-header-filters-selection"></div>
            )}
            {tableOptions?.isSelectionMode &&
              tableOptions?.selectionMode !== "multiple" && (
                <div className="ui-table-header-filters-radiobutton"></div>
              )}
            {tableOptions?.selectionMode == "multiple" && (
              <div
                className={`ui-table-header-filters-checkbox ${
                  selectedRows?.length == tableData?.length
                    ? "ui-table-header-checkbox-filters-selected"
                    : ""
                } `}
              >
                <div
                  className="ui-table-header-filters-select-all"
                  onClick={() => handleSelectionAll()}
                >
                  <div />
                </div>
              </div>
            )}

            {tableOptions?.columns
              ?.filter((column) =>
                activeColumns?.map((item) => item.field).includes(column.field)
              )
              ?.map((column) => (
                <div
                  className={`ui-table-header-filters-column column-type-${column.dataType}`}
                  style={{ minWidth: column.width && column.width }}
                >
                  {!column.disabledFilter && (
                    <>
                      <div className="ui-table-header-filters-input">
                        {column.dataType == "text" && (
                          <TextInput
                            className="ui-table-input"
                            onChange={(e) => {
                              changeFilterValue(e, column);
                            }}
                          />
                        )}
                        {column.dataType == "dropdown" && (
                          <SingleSelectInput
                            className="ui-table-input"
                            options={column.dropDownValues}
                            onChange={(val) => changeFilterValue(val, column)}
                          />
                        )}
                        {column.dataType == "date" && (
                          <DatePicker
                            className="ui-table-input"
                            onChange={(val) => changeFilterValue(val, column)}
                          />
                        )}
                      </div>

                      <button
                        type="button"
                        className="ui-table-header-filters-options"
                        onClick={() => setVisibleFilterMenu(column)}
                      >
                        <VscListFilter />
                      </button>

                      {visibleFilterMenu == column && (
                        <>
                          <div
                            className="ui-table-mask"
                            onClick={() => setVisibleFilterMenu(null)}
                          ></div>
                          <div className="ui-table-filter-menu">
                            {filterOptions
                              ?.filter((filter) =>
                                column.filterOperator
                                  ? filter?.id == column.filterOperator
                                  : filter?.type.includes(column.dataType)
                              )
                              ?.map((filter) => (
                                <div
                                  className={`ui-table-filter-menu-item ${
                                    activeFilters.find(
                                      (item) =>
                                        item.field == column.field &&
                                        item.operator == filter?.id
                                    ) && "active-filter"
                                  }`}
                                  onClick={() => {
                                    changeFilterOperator(filter.id, column);
                                    setVisibleFilterMenu(null);
                                  }}
                                >
                                  <div className="ui-table-filter-menu-item-radio"></div>
                                  <span className="ui-table-filter-menu-item-label">
                                    {filter?.label}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              ))}
          </div>
        </div>

        <div className="ui-table-body">
          {pageData.length > 0 ? (
            <>
              {pageData?.map((row) => (
                <div
                  className={`ui-table-body-row ${
                    selectedRows.find((item) => item.id == row.id) &&
                    "ui-table-body-row-selected"
                  }`}
                >
                  {!tableOptions?.isSelectionMode && (
                    <div className="ui-table-body-column-selection"></div>
                  )}
                  {tableOptions?.isSelectionMode &&
                    tableOptions?.selectionMode !== "multiple" && (
                      <div
                        className="ui-table-body-column-radiobutton"
                        onClick={() => handleSelection(row)}
                      >
                        <div />
                      </div>
                    )}
                  {tableOptions?.selectionMode == "multiple" && (
                    <div
                      className="ui-table-body-column-checkbox"
                      onClick={() => handleSelection(row)}
                    >
                      <div />
                    </div>
                  )}

                  {tableOptions?.columns
                    ?.filter((column) =>
                      activeColumns
                        .map((item) => item.field)
                        .includes(column.field)
                    )
                    ?.map((column) => (
                      <div
                        onClick={() => handleSelection(row)}
                        className={`ui-table-body-column column-type-${column.dataType}`}
                        style={{
                          minWidth: column.width && column.width,
                        }}
                      >
                        <>
                          {column.body ? (
                            <>
                              <div className="ui-table-cell-body">
                                {column.body(row, row[column.field])}
                              </div>
                            </>
                          ) : (
                            <>
                              {column.dataType == "text" && (
                                <span className="ui-table-cell-text">
                                  {row[column.field]}
                                </span>
                              )}
                              {column.dataType == "number" && (
                                <span className="ui-table-cell-text">
                                  {row[column.field]}
                                </span>
                              )}
                              {column.dataType == "date" && (
                                <span className="ui-table-cell-text">
                                  {moment(
                                    row[column.field],
                                    "YYYY-MM-DD"
                                  ).format("DD/MM/YYYY")}
                                </span>
                              )}
                              {column.dataType == "dropdown" && (
                                <>
                                  <span className="ui-table-cell-text">
                                    {
                                      column.dropDownValues.find(
                                        (item) =>
                                          item.value == row[column.field]
                                      )?.label
                                    }
                                  </span>
                                </>
                              )}
                              {column.dataType == "refData" && (
                                <>
                                  <span className="ui-table-cell-text">
                                    {row["refData" + column.field]}
                                  </span>
                                </>
                              )}
                            </>
                          )}
                        </>
                      </div>
                    ))}
                </div>
              ))}
            </>
          ) : (
            <div className="ui-table-body-no-data">
              <span>No Data</span>
            </div>
          )}
        </div>
      </div>
      <div className="ui-table-footer">
        <div className="ui-table-footer-left">
          <span>{`${tableData?.length} result found`}</span>
        </div>
        <div className="ui-table-footer-pager">
          <button
            type="button"
            className={`ui-table-pager-prev ${
              activePage == 1 ? "ui-table-disabled-page" : ""
            }`}
            onClick={() => {
              handleTableQuery(activeFilters, activePage - 1, rowCount);
              setActivePage(activePage - 1);
            }}
          >
            <LuChevronLeft />
          </button>
          {[...Array(pageCount ? pageCount : 0)]?.map((item, index) => (
            <button
              type="button"
              className={`ui-table-pager-page ${
                activePage == index + 1 ? "ui-table-active-page" : ""
              }`}
              onClick={() => {
                handleTableQuery(activeFilters, index + 1, rowCount);
                setActivePage(index + 1);
              }}
            >
              <span>{index + 1}</span>
            </button>
          ))}
          <button
            type="button"
            className={`ui-table-pager-next ${
              pageCount == activePage ? "ui-table-disabled-page" : ""
            }`}
            onClick={() => {
              handleTableQuery(activeFilters, activePage + 1, rowCount);
              setActivePage(activePage + 1);
            }}
          >
            <LuChevronRight />
          </button>

          <SingleSelectInput
            options={rowCountOptions}
            onChange={(val) => {
              handleTableQuery(activeFilters, activePage, val);
              setRowCount(val);
            }}
            value={rowCount}
          />
        </div>
      </div>
    </div>
  );
};

export default Table;
