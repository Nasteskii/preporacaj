import { TextField } from "@mui/material";
import { RecommendationComment } from "../../types/RecommendationComment";

interface CommentComponentProps {
  recommendationComment?: RecommendationComment;
  disabled: boolean;
}

function CommentComponent({
  recommendationComment,
  disabled,
}: CommentComponentProps) {
  return (
    <div className="my-3">
      <h2 className="text-purple">
        {recommendationComment?.profile?.username}
      </h2>
      <TextField
        id="commentInput"
        name="content"
        className="bg-gray-light"
        value={recommendationComment?.commentContent}
        fullWidth
        multiline
        color="secondary"
        disabled={disabled}
        inputProps={{
          style: {
            WebkitTextFillColor: "black",
            color: "black",
          },
        }}
      ></TextField>
    </div>
  );
}

export default CommentComponent;
