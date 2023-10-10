type RecommendationComponentProps = {
  recommendationType: string;
  recommendationId: string;
};

function RecommendationComponent({
  recommendationType,
  recommendationId,
}: RecommendationComponentProps) {
  return (
    <div>
      <h1>Hi</h1>
      <p>Recommendation Type: {recommendationType}</p>
      <p>Recommendation ID: {recommendationId}</p>
    </div>
  );
}

export default RecommendationComponent;
