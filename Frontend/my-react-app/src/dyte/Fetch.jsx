import { useState } from "react";
import axios from "axios";
import FilterInputs from "./Filter.jsx";
import LogDisplay from "./table.jsx";
import LogEntryForm from "./LogEntryForm.jsx";


export default function Fetch() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    level: "",
    message: "",
    resourceId: "",
    timestamp: "",
    traceId: "",
    spanId: "",
    commit: "",
    parentResourceId: "",
  });

  const handleInputChange = (filterName, value) => {
    setFilters({ ...filters, [filterName]: value });
  };

   const handleLogSubmit = (newLog) => {
     setLogs([...logs, newLog]); // Add new log to the logs array
   };
   

  
  const handleSearch = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3000/search", {
        params: filters,
        headers: {
          "Cache-Control": "no-cache", // Disable caching 
        },
      });
      console.log(response.data);
      setLogs(response.data);
      setError(""); // Clear previous errors
    } catch (error) {
      setError("Failed to fetch logs. Please try again.");
      console.error("Error fetching logs:", error);
    }
  };

 
  return (
    <div className="App">
      <h2>LOG INJESTOR INTERFACE</h2>
      <div>
        {" "}
        <LogEntryForm onLogSubmit={handleLogSubmit} />
      </div>

      <h2>QUERY INTERFACE</h2>

      <div>
        {error && <div className="error-message">{error}</div>}

        <FilterInputs
          onSearch={handleSearch}
          onInputChange={handleInputChange}
        />

        <LogDisplay logs={logs} />
      </div>
    </div>
  );
}
