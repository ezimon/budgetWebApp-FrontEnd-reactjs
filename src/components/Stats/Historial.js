import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "./historial.css";
import toast, { Toaster } from "react-hot-toast";

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
          if (params.value !== undefined) {
            return "$" + params.value;
          } else {
            return "-";
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
    console.log(sheetname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sheetname]);

  const fetchHist = (sheetname) => {
    fetch(apiUrl + `/historial/${sheetname}`)
      .then((data) => data.json())
      // .then((data) => Object.assign({}, data))
      // .then((data) => setHist(data))
      .then((data) => setGrid({ ...grid, rowData: data }));
    //   setIsLoading(false);
  };

  const onButtonClick = async () => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    let indexes = [];
    for (let i = 0; i < selectedNodes.length; i++) {
      const element = selectedNodes[i];
      indexes.push(element.rowIndex);
    }
    await fetch(apiUrl + "/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        indexes,
        sheetname,
      }),
    })
      // Aca se puede usar toast promise o como MIERDA se llame, se puede bindear a onButtonClick xq es una promesa
      .then((res) => fetchHist(sheetname))
      .then((res) => toast.success("Movimiento eliminado con éxito"))
      .catch((err) =>
        toast.error(
          "Algo salió mal, inténtelo de nuevo."
        )
      );
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
      <Toaster />
    </div>
  );
};
