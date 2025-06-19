import Container from "../Components/Container";
import TotalTraining from "../Components/DashBoard-Components/TotalTraining";
import TrainingStatusCard from "../Components/DashBoard-Components/TrainingStatusCard";
import Reminder from "../Components/DashBoard-Components/Reminder";
const DashBoard = () => {
  return (
    <>
      <div className="dashboard mt-5 bg-[#f2f4f4]">
        <Container>
          <div className=" flex gap-2">
            <div>
              <TotalTraining />
            </div>
            <div>
              <TrainingStatusCard />
              <Reminder />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default DashBoard;
