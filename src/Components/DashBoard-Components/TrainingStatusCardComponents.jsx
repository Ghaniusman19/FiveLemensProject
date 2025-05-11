import * as Icons from "lucide-react"; // import all icons

const TrainingStatusCardComponents = ({
  heading,
  rating,
  backgroundColor,
  iconName,
  color,
}) => {
  const Icon = Icons[iconName]; // get icon dynamically

  return (
    <div className="px-6 py-6 gap-2">
      <div className="heading">
        <h2 className="text-[#58536e] text-sm text-center text-[14px] font-bold">
          {" "}
          {heading}{" "}
        </h2>
      </div>
      <div className="score flex items-center justify-center gap-3">
        <div className="image">
          <Icon style={{ color: color }} className="w-6 h-6 text-blue-500" />
        </div>
        <div className="rating">
          <h3 className="text-[32px] text-[#2c405a] md:text-[50px]">
            {" "}
            {rating}{" "}
          </h3>
        </div>
      </div>
      <div
        className="line w-[110px] text-center h-1"
        style={{ backgroundColor: backgroundColor }}
      >
        {" "}
      </div>
    </div>
  );
};

export default TrainingStatusCardComponents;
