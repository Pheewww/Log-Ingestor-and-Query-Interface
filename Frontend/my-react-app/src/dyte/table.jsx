
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import PropTypes from "prop-types";

const LogDisplay = ({ logs }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Level</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Resource ID</TableCell>
            <TableCell>Timestamp</TableCell>
            <TableCell>Trace ID</TableCell>
            <TableCell>Span ID</TableCell>
            <TableCell>Commit</TableCell>
            <TableCell>Parent Resource ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((log, index) => (
            <TableRow key={index}>
              <TableCell>{log.level}</TableCell>
              <TableCell>{log.message}</TableCell>
              <TableCell>{log.resourceId}</TableCell>
              <TableCell>{log.timestamp}</TableCell>
              <TableCell>{log.traceId}</TableCell>
              <TableCell>{log.spanId}</TableCell>
              <TableCell>{log.commit}</TableCell>
              <TableCell>{log.metadata?.parentResourceId || "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

LogDisplay.propTypes = {
  logs: PropTypes.arrayOf(
    PropTypes.shape({
      level: PropTypes.string,
      message: PropTypes.string,
      resourceId: PropTypes.string,
      timestamp: PropTypes.string,
      traceId: PropTypes.string,
      spanId: PropTypes.string,
      commit: PropTypes.string,
      metadata: PropTypes.shape({
        parentResourceId: PropTypes.string,
      }),
    })
  ),
};



export default LogDisplay;
