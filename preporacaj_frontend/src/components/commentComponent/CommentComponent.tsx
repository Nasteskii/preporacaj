import { TextField } from "@mui/material";

function CommentComponent() {
  return (
    <div className="my-3">
      <h2 className="text-purple">User</h2>
      <TextField
        className="bg-gray-light"
        value="Comment"
        fullWidth={true}
        multiline={true}
        color="secondary"
        disabled={true}
      ></TextField>
    </div>
  );
}

export default CommentComponent;
