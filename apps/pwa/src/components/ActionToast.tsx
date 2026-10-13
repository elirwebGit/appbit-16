import { useEffect } from "react";
import type { ActionNotice } from "../contexts/DashboardContext";

const COLORS: Record<ActionNotice["type"], string> = {
  success: "var(--nexo-success)",
  error: "var(--nexo-danger)",
  info: "var(--nexo-yellow-strong)",
};

export function ActionToast({
  notice,
  onClose,
}: {
  notice: ActionNotice | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [notice, onClose]);

  if (!notice) return null;

  return (
    <div
      role="status"
      className="nexo-glass"
      onClick={onClose}
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        padding: "12px 18px",
        borderRadius: 12,
        borderLeft: `4px solid ${COLORS[notice.type]}`,
        zIndex: 3000,
        color: "var(--nexo-ink)",
        fontSize: 14,
        maxWidth: "90vw",
        cursor: "pointer",
        animation: "action-toast-in var(--nexo-dur) var(--nexo-ease)",
      }}
    >
      {notice.message}
      <style>{`@keyframes action-toast-in { from { opacity: 0; transform: translate(-50%, 12px) } to { opacity: 1; transform: translate(-50%, 0) } }`}</style>
    </div>
  );
}
