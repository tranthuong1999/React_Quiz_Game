import { Pagination } from "@mui/material";

export const FCPagination = (props) => {
  const { totalPage, handleChange, page } = props;

  return (
    <div style={{ marginTop: "0.5rem", float: "right", marginBottom: "50px" }}>
      <Pagination
        count={totalPage}
        color="primary"
        variant="outlined"
        onChange={handleChange}
        page={page}
      />
    </div>
  );
};
