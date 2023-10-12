import { TextField } from "@mui/material";
import { RecommendationComment } from "../../types/RecommendationComment";

interface CommentComponentProps {
  recommendationComment: RecommendationComment;
}

function CommentComponent({ recommendationComment }: CommentComponentProps) {
  return (
    <div className="my-3">
      <h2 className="text-purple">{recommendationComment.profile?.username}</h2>
      <TextField
        className="bg-gray-light"
        value={recommendationComment.commentContent}
        fullWidth={true}
        multiline={true}
        color="secondary"
        disabled={true}
      ></TextField>
    </div>
  );
}

export default CommentComponent;
