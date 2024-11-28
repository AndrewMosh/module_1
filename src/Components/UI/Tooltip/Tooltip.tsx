import React, { useState } from "react";
import { TooltipProps } from "./tooltip.types";
import './Tooltips.scss'




const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = "bottom",
  delay = 0,
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    const id = setTimeout(() => setVisible(true), delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setVisible(false);
  };

  return (
    <div className="tooltip" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      {visible && (
        <div className={`tooltip__box tooltip__${position}`}>
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
