
import { TextField, Button, Grid } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PropTypes from "prop-types";

const FilterInputs = ({ onSearch, onInputChange }) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <TextField
          label="Level"
          onChange={(e) => onInputChange("level", e.target.value)}
        />
      </Grid>
      <Grid item>
      
        <Tooltip title="Use regular expressions for advanced search patterns.">
          <TextField
            label="Message"
            onChange={(e) => onInputChange("message", e.target.value)}
          />
          <HelpOutlineIcon />
        </Tooltip>
      </Grid>
      <Grid item>
        <TextField
          label="Resource ID"
          onChange={(e) => onInputChange("resourceId", e.target.value)}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Timestamp"
          onChange={(e) => onInputChange("timestamp", e.target.value)}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Trace ID"
          onChange={(e) => onInputChange("traceId", e.target.value)}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Span ID"
          onChange={(e) => onInputChange("spanId", e.target.value)}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Commit"
          onChange={(e) => onInputChange("commit", e.target.value)}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Parent Resource ID"
          onChange={(e) => onInputChange("parentResourceId", e.target.value)}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={onSearch}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

FilterInputs.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default FilterInputs;
