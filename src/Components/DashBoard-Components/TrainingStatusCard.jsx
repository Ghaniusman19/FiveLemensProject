import React from "react";
import TrainingStatusCardComponents from "./TrainingStatusCardComponents";

const TrainingStatusCard = () => {
  const card = [
    {
      heading: "Evaluation",
      rating: "3",
      iconName: 'CircleCheck',
      backgroundColor: "#faca00",
      color : "#faca00"
    },
    {
        heading: "CX SCORE %",
        rating: "40",
        iconName: 'Star',
        backgroundColor: "#03d0dd",
        color : "#03d0dd"
      },
      {
        heading: "PASS %",
        rating: "100",
        iconName: 'ThumbsUp',
        backgroundColor: "#3bda8b",
        color : "#3bda8b"
      },
      {
        heading: "AUTO FAIL %",
        rating: "0",
        iconName: 'ThumbsDown',
        backgroundColor: "#ee5e56",
        color : "#ee5e56"
      },
  ];

  return (
    <div className=" bg-white shadow-xl flex w-full px-32  border border-[#c7cfd6]  md:mb-2 ">
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
