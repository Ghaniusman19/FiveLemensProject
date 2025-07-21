import { useState, useEffect } from "react";

const Teams = () => {
  const [description, setDescription] = useState("");
  const [firstLevelInput, setFirstLevelInput] = useState("");
  const [firstLevelTags, setFirstLevelTags] = useState([]);
  console.log(firstLevelInput, "first level input");
  const [enableSecondLevel, setEnableSecondLevel] = useState(false);
  const [secondLevelTags, setSecondLevelTags] = useState([]);
  const [secondLevelInputs, setSecondLevelInputs] = useState([]);
  const [thirdLevelCheckboxes, setThirdLevelCheckboxes] = useState([]);
  const [thirdLevelTags, setThirdLevelTags] = useState([]);
  const [thirdLevelInputs, setThirdLevelInputs] = useState([]);

  // Sync second level arrays when first level tags change
  useEffect(() => {
    setSecondLevelTags(firstLevelTags.map(() => []));
    setSecondLevelInputs(firstLevelTags.map(() => ""));
    setThirdLevelCheckboxes(firstLevelTags.map(() => false));
    setThirdLevelTags(firstLevelTags.map(() => []));
    setThirdLevelInputs(firstLevelTags.map(() => []));
  }, [firstLevelTags]);

  const handleFirstLevelKeyDown = (e) => {
    if (e.key === "Enter" && firstLevelInput.trim()) {
      e.preventDefault();
      setFirstLevelTags([...firstLevelTags, firstLevelInput.trim()]);
      setFirstLevelInput("");
    }
  };

  const handleSecondLevelKeyDown = (e, index) => {
    if (e.key === "Enter" && secondLevelInputs[index].trim()) {
      e.preventDefault();
      const newTags = [...secondLevelTags];
      newTags[index].push(secondLevelInputs[index].trim());
      setSecondLevelTags(newTags);

      const newInputs = [...secondLevelInputs];
      newInputs[index] = "";
      setSecondLevelInputs(newInputs);

      // Reset third level inputs for this second-level tag group
      const newThirdLevelInputs = [...thirdLevelInputs];
      newThirdLevelInputs[index].push("");
      setThirdLevelInputs(newThirdLevelInputs);

      const newThirdLevelTags = [...thirdLevelTags];
      newThirdLevelTags[index].push([]);
      setThirdLevelTags(newThirdLevelTags);
    }
  };

  const handleThirdLevelKeyDown = (e, firstIndex, secondIndex) => {
    if (e.key === "Enter" && thirdLevelInputs[firstIndex][secondIndex].trim()) {
      e.preventDefault();
      const tagsCopy = [...thirdLevelTags];
      tagsCopy[firstIndex][secondIndex].push(
        thirdLevelInputs[firstIndex][secondIndex].trim()
      );
      setThirdLevelTags(tagsCopy);

      const inputsCopy = [...thirdLevelInputs];
      inputsCopy[firstIndex][secondIndex] = "";
      setThirdLevelInputs(inputsCopy);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <label className="block font-semibold">Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block font-semibold">First-Level Tags:</label>
        <div className="flex flex-wrap gap-2">
          {firstLevelTags.map((tag, i) => (
            <>
              <span key={i} className="bg-blue-200 px-3 py-1 rounded-full">
                {tag}
                <span> &times;</span>
              </span>
            </>
          ))}
          <input
            type="text"
            value={firstLevelInput}
            onChange={(e) => setFirstLevelInput(e.target.value)}
            onKeyDown={handleFirstLevelKeyDown}
            placeholder="Type & press Enter"
            className="border px-2 py-1 rounded"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <label>Add Second Level</label>
        <input
          type="checkbox"
          checked={enableSecondLevel}
          onChange={(e) => setEnableSecondLevel(e.target.checked)}
        />
      </div>

      {enableSecondLevel && (
        <div className="space-y-4">
          {firstLevelTags.map((tag, i) => (
            <div key={i} className="border p-3 rounded-md">
              <p className="font-medium mb-2">{tag} - Second Level</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {secondLevelTags[i]?.map((stag, j) => (
                  <span key={j} className="bg-green-200 px-3 py-1 rounded-full">
                    {stag}
                  </span>
                ))}
                <input
                  type="text"
                  value={secondLevelInputs[i] || ""}
                  onChange={(e) => {
                    const newInputs = [...secondLevelInputs];
                    newInputs[i] = e.target.value;
                    setSecondLevelInputs(newInputs);
                  }}
                  onKeyDown={(e) => handleSecondLevelKeyDown(e, i)}
                  placeholder="Add second-level tag"
                  className="border px-2 py-1 rounded"
                />
              </div>

              <div className="flex items-center gap-2">
                <label>Add Third Level</label>
                <input
                  type="checkbox"
                  checked={thirdLevelCheckboxes[i] || false}
                  onChange={(e) => {
                    const updated = [...thirdLevelCheckboxes];
                    updated[i] = e.target.checked;
                    setThirdLevelCheckboxes(updated);
                  }}
                />
              </div>

              {thirdLevelCheckboxes[i] && (
                <div className="mt-3 space-y-4">
                  {secondLevelTags[i]?.map((stag, j) => (
                    <div key={j}>
                      <p className="text-sm font-semibold">
                        {stag} - Third Level
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {thirdLevelTags[i]?.[j]?.map((ttag, k) => (
                          <span
                            key={k}
                            className="bg-yellow-200 px-3 py-1 rounded-full"
                          >
                            {ttag}
                          </span>
                        ))}
                        <input
                          type="text"
                          value={thirdLevelInputs[i]?.[j] || ""}
                          onChange={(e) => {
                            const inputsCopy = [...thirdLevelInputs];
                            if (!inputsCopy[i]) inputsCopy[i] = [];
                            inputsCopy[i][j] = e.target.value;
                            setThirdLevelInputs(inputsCopy);
                          }}
                          onKeyDown={(e) => handleThirdLevelKeyDown(e, i, j)}
                          placeholder="Add third-level tag"
                          className="border px-2 py-1 rounded"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Teams;
