const PriorityStatus = ({ priorityID }) => {
    var prioityColor, priorityText ;
    switch (priorityID) {
      case 1:
        prioityColor = "bg-red-500 text-white";
        priorityText = "High";
        break;
      case 2:
        prioityColor = "bg-yellow-500 text-white";
        priorityText = "Medium";
        break;
      default:
        prioityColor = "bg-green-500 text-white";
        priorityText = "Low";
    }
    return (
      <span
        className={`px-3 py-2 rounded-full font-semibold text-xs ${prioityColor}`}
      >
        {priorityText}
      </span>
    );
  };
  export default PriorityStatus;