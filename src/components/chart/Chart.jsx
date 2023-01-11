import { Pie } from "@ant-design/plots";

const PieChart = ({ completed, total }) => {
  const data = [
    {
      type: "Completed Tasks",
      value: completed,
    },
    {
      type: "Incompleted Tasks",
      value: total - completed,
    },
  ];

  const config = {
    data,
    height: 400,
    width:400,
    appendPadding: 10,
    angleField: "value",
    colorField: "type",
    color: ["#5285EC", "#E8ECEC"],
    radius: 0.8,
    legend: false,
    label: {
      type: "outer",
      content: "{name}",
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return <div style={{height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}><Pie {...config} /></div>;
};

export default PieChart;
