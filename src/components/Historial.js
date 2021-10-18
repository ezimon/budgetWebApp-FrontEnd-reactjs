import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "./historial.css";

export const Historial = ({ apiUrl }) => {
  
  const [sheetname, setSheetname] = useState("mesA");
  const gridRef = useRef(null);
  const [grid, setGrid] = useState({
    columnDefs: [
      { headerName: "Fecha", field: "0", checkboxSelection: true, flex: 2 },
      { headerName: "Concepto", field: "1", flex: 2 },
      {
        headerName: "Monto",
        field: "2",
        flex: 1.5,
        valueFormatter: (params) => {
          if (params.value.length !== 0) {
            return "$" + params.value;
          } else {
            return "-"
          }
        },
      },
      // { headerName: "monto", field: "3", flex: 1 },
      { headerName: "Abonó", field: "4", flex: 2 },
    ],
    rowData: null,
  });
// eslint-disable-next-line
  const [del, setDel] = useState({
    sheetname: "mesA",
  });

  useEffect(() => {
    fetchHist(sheetname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sheetname]);

  const fetchHist = async (sheetname) => {
    await fetch(apiUrl + `/historial?sheetname=${sheetname}`)
      .then((data) => data.json())
      // .then((data) => Object.assign({}, data))
      // .then((data) => setHist(data))
      .then((data) => setGrid({ ...grid, rowData: data }));
    //   setIsLoading(false);
  };

  const onButtonClick = () => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    let indexes = [];
    for (let i = 0; i < selectedNodes.length; i++) {
      const element = selectedNodes[i];
      indexes.push(element.rowIndex);
    }
    // fetch(apiUrl + "/delete", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     indexes,
    //     del.sheetname,
    //   }),
    // })
    // const selectedData = selectedNodes.map((node) => node.data);
    // const selectedDataStringPresentation = selectedData
    //   .map((node) => `${node[0]} ${node[1]}`)
    //   .join(", ");
    console.log(indexes);
  };

  return (
    <div className="grid ag-theme-balham">
      <select
        className="monthSelect"
        name="sheetname"
        onChange={(event) => {
          setSheetname(event.target.value);
        }}
      >
        <option defaultValue value="mesA">
          mes actual
        </option>
        <option value="January">enero</option>
        <option value="February">febrero</option>
        <option value="March">marzo</option>
        <option value="April">abril</option>
        <option value="May">mayo</option>
        <option value="June">junio</option>
        <option value="July">julio</option>
        <option value="August">agosto</option>
        <option value="September">septiembre</option>
        <option value="October">octubre</option>
        <option value="November">noviembre</option>
        <option value="December">diciembre</option>
      </select>
      <button className="btn" onClick={onButtonClick}>
        Delete
      </button>
      <AgGridReact
        ref={gridRef}
        columnDefs={grid.columnDefs}
        rowData={grid.rowData}
        rowSelection="multiple"
        
        // resizable={true}
        // onGridReady={params=> gridApi = params.api}
      />
    </div>
  );
};
