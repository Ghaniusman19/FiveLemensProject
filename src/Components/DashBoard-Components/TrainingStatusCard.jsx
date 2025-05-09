import React from "react";
import TrainingStatusCardComponents from "./TrainingStatusCardComponents";

const TrainingStatusCard = () => {
  const card = [
    {
      heading: "Evaluation",
      rating: "3",
      iconName: 'CircleCheck',
      backgroundColor: "yellow",
      color : "red"
    },
    {
        heading: "Evaluation",
        rating: "3",
        iconName: 'Star',
        backgroundColor: "blue",
        color : "blue"
      },
      {
        heading: "Evaluation",
        rating: "3",
        iconName: 'ThumbsUp',
        backgroundColor: "green",
        color : "green"
      },
      {
        heading: "Evaluation",
        rating: "3",
        iconName: 'ThumbsDown',
        backgroundColor: "red",
        color : "red"
      },
  ];

  return (
    <div className="  bg-white shadow-xl flex w-full px-32  border border-[#c7cfd6]  md:mb-2 ">
      {card.map((c ,index) => (
        <TrainingStatusCardComponents
          heading={c.heading}
          rating={c.rating}
          backgroundColor={c.backgroundColor}
          key={index}
          iconName={c.iconName} // dynamically passed
          color={c.color}

        />
      ))}
    </div>
  );
};

export default TrainingStatusCard;
