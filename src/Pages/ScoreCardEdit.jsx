import React from "react";
import Container from "../Components/Container";
import { Search, SlidersHorizontal, Plus } from "lucide-react";

const ScoreCardEdit = () => {
  return (
    <div>
      <Container>
        <div className="manage-scorecard bg-white rounded-xl p-3 transition-all duration-500">
          <div className="flex justify-between flex-row items-center">
            <div className="left basis-2/4 p-2">
              <div>
                <h3 className="text-[#101828] text-xl font-bold">Scorecards</h3>
                <p className="font-sans font-normal text-gray-600">
                  Manage your scorecards and its details here
                </p>
              </div>
            </div>
            <div className="right basis-2/4  flex gap-3 justify-end items-center">
              <div className="search">
                
              </div>
              <div className="filter-btn">
                <button className="p-2 border border-gray rounded-md text-gray-600">
                  <SlidersHorizontal className="w-5 h-5" />
                </button>
              </div>
              <div className="addsession-btn">
                <button
                  className="rounded-xl py-2 flex items-center gap-2 px-3 bg-blue-600 text-white"
                  //   onClick={handleAddSectionModal}
                >
                  <Plus className="w-4 h-4 text-white " /> Add ScoreCard
                </button>
              </div>
            </div>
          </div>
          {/* {JSON.stringify(formData, null, 2)} */}
          {/* <h2>Submitted Coaching Form Data:</h2> */}
          {/* <div>
        {allFormData.length > 0 && (
          <ul className="">
            <div className="flex justify-between p-2">
              <h3 className="font-bold">Name</h3>
              <h3 className="font-bold">Description</h3>
              <h3 className="font-bold">Group/s</h3>
              <h3></h3>
            </div>
            {allFormData.map((data, index) => (
              <div className=" flex mb-2 gap-4">
                <li
                  className="flex justify-between w-full bg-gray-50 border border-gray-300 px-2 "
                  key={data.index}
                >
                  <div>
                    <p> {data.name}</p>
                  </div>
                  <div>
                    <p> {data.description}</p>
                  </div>
                  <div>
                    <p> {data.groups}</p>
                  </div>
                  <Button
                    className="p-2 rounded-xl bg-blue-600 text-white "
                    label="Close"
                    onClick={() => removeData(index)}
                  />
                </li>
              </div>
            ))}
          </ul>
        )}
      </div> */}
        </div>
      </Container>
    </div>
  );
};

export default ScoreCardEdit;
