import Container from "../Components/Container";
import ScoreCardHeader from "../Components/ScoreCard/ScoreCardHeader";
const ScoreCard = () => {
  return (
    <div className="bg-gray-100 ">
      <Container>
        <div className="bg-white rounded-xl shadow-lg">
        <ScoreCardHeader />
        </div>
      </Container>
    </div>
  );
};

export default ScoreCard;
