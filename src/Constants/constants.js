 export  const forms = {
    form1: {
      title: "Add Single Select",
      fields: [
        { label: "Description", name: "description", type: "textarea" },
        {
          label: "Single Select Options",
          name: "singleSelect",
          type: "select",
          // options: ["Option 1", "Option 2"],
        },
      ],
    },
    form2: {
      title: "Add Multi Select",
      fields: [
        { label: "Description", name: "description", type: "textarea" },
        {
          label: "Multi Select Option",
          name: "multiSelect",
          type: "checkbox-group",
          options: ["Option 1", "Option 2"],
        },
      ],
    },
    form3: {
      title: "Add Small Text",
      fields: [{ label: "Description", name: "description", type: "input" }],
    },
    form4: {
      title: "Add Large Text",
      fields: [{ label: "Description", name: "description", type: "textarea" }],
    },
    form5: {
      title: "Add Date",
      fields: [
        { label: "Description", name: "description", type: "textarea" },
        { label: "Date", name: "date", type: "date" },
      ],
    },
  };

   export  const authToken = localStorage.getItem("token");
  