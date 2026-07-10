import { useState } from "react";
import { Download, ChevronLeft } from "lucide-react";
import "./ExportPopover.css";

interface ExportPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onExport?: (name: string, format: string) => void;
}

export function ExportPopover({ isOpen, onClose, onExport }: ExportPopoverProps) {
  const [exportName, setExportName] = useState("");
  const [format, setFormat] = useState("PNG");

  if (!isOpen) return null;

  const handleExport = () => {
    if (onExport) {
      onExport(exportName || "Export", format);
    }
    // Simulate close after export
    onClose();
  };

  return (
    <div className="export-popover-container">
      <div className="export-popover-header">
        Exportar
      </div>
      <div className="export-popover-content">
        <button className="export-back-btn" onClick={onClose}>
          <ChevronLeft size={20} />
        </button>
        <input 
          type="text" 
          value={exportName}
          onChange={(e) => setExportName(e.target.value)}
          placeholder="Nomear" 
          className="export-input-name"
        />
        <div className="export-select-wrapper">
          <select 
            className="export-select-format"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="PNG">PNG</option>
            <option value="PDF">PDF</option>
            <option value="CSV">CSV</option>
          </select>
        </div>
        <button className="export-action-btn" onClick={handleExport}>
          <Download size={18} />
        </button>
      </div>
    </div>
  );
}
