import React from "react";
import { useSelector } from "react-redux";

// Component that displays connection status
const ConnectionStatus = () => {
  const { status } = useSelector((state) => state.connection);

  return (
    <div className="conn-status">
      <span className={`status-circle ${status}`}>&nbsp;</span>
      <span className="status-message">{status}</span>
    </div>
  );
};

export default ConnectionStatus;
