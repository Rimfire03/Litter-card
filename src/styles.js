export function getCardStyles({
  isOccupied,
  isBinFull,
  entranceX,
  entranceY,
  entranceW,
  entranceH,
  entranceBorderRadius,
  weightX,
  weightY,
  weightFontSize,
  binX,
  binY,
  binScale,
  configOpen,
}) {
  return `
        :host {
          display: block;
        }
        ha-card {
          overflow: hidden;
          background: var(--ha-card-background, var(--card-background-color, #ffffff));
          border-radius: var(--ha-card-border-radius, 16px);
          box-shadow: var(--ha-card-box-shadow, 0 4px 20px rgba(0,0,0,0.06));
          font-family: var(--paper-font-body1_-_font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif);
          color: var(--primary-text-color, #212121);
          padding: 16px;
          transition: all 0.3s ease;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          padding: 0 4px;
        }
        .header .title-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .header .title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--primary-text-color, #1f2937);
          letter-spacing: -0.01em;
        }
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          background: ${!isOccupied ? 'rgba(76, 175, 80, 0.12)' : 'rgba(239, 68, 68, 0.12)'};
          color: ${!isOccupied ? '#2e7d32' : '#d32f2f'};
        }
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: ${!isOccupied ? '#4caf50' : '#f44336'};
          ${isOccupied ? 'box-shadow: 0 0 8px #f44336; animation: pulse 2s infinite;' : ''}
        }
        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }

        /* Image Display & Overlays */
        .image-container {
          position: relative;
          width: 100%;
          max-width: 380px;
          margin: 0 auto 16px auto;
          aspect-ratio: 1225 / 1284;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .litter-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          filter: drop-shadow(0 6px 12px rgba(0,0,0,0.08));
        }

        /* Entrance Glow/Overlay based on occupancy */
        .entrance-glow {
          position: absolute;
          top: ${entranceY}%;
          left: ${entranceX}%;
          transform: translate(-50%, -50%);
          width: ${entranceW}%;
          height: ${entranceH}%;
          border-radius: ${entranceBorderRadius};
          pointer-events: none;
          background: ${!isOccupied 
            ? 'radial-gradient(ellipse at center, rgba(76, 175, 80, 0.45) 0%, rgba(76, 175, 80, 0.2) 60%, rgba(76, 175, 80, 0) 85%)'
            : 'radial-gradient(ellipse at center, rgba(239, 68, 68, 0.45) 0%, rgba(239, 68, 68, 0.2) 60%, rgba(239, 68, 68, 0) 85%)'
          };
          border: 2px solid ${!isOccupied ? 'rgba(76, 175, 80, 0.6)' : 'rgba(239, 68, 68, 0.6)'};
          box-shadow: inset 0 0 25px ${!isOccupied ? 'rgba(76, 175, 80, 0.5)' : 'rgba(239, 68, 68, 0.5)'};
          transition: all 0.5s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .entrance-badge {
          background: ${!isOccupied ? 'rgba(46, 125, 50, 0.85)' : 'rgba(185, 28, 28, 0.85)'};
          backdrop-filter: blur(4px);
          color: white;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          display: flex;
          align-items: center;
          gap: 4px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        }

        /* Cat Weight in bottom right black circular area */
        .weight-overlay {
          position: absolute;
          top: ${weightY}%;
          left: ${weightX}%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #00ffcc;
          text-shadow: 0 0 8px rgba(0, 255, 204, 0.8);
          pointer-events: auto;
          background: transparent;
          border-radius: 50%;
          width: 17%;
          aspect-ratio: 1 / 1;
          transition: transform 0.2s ease;
        }
        .weight-overlay:hover {
          transform: translate(-50%, -50%) scale(1.08);
        }
        .weight-value {
          font-size: ${weightFontSize}rem;
          font-weight: 700;
          line-height: 1;
          font-family: monospace, monospace;
        }
        .weight-unit {
          font-size: ${weightFontSize * 0.55}rem;
          font-weight: 600;
          opacity: 0.9;
          margin-top: 3px;
          text-transform: uppercase;
        }

        /* Bin Full Alert Overlay Badge */
        .bin-status-overlay {
          position: absolute;
          top: ${binY}%;
          left: ${binX}%;
          transform: translate(-50%, -50%) scale(${binScale});
          background: ${isBinFull ? 'rgba(239, 68, 68, 0.92)' : 'rgba(30, 41, 59, 0.7)'};
          backdrop-filter: blur(6px);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          box-shadow: 0 4px 12px ${isBinFull ? 'rgba(239, 68, 68, 0.4)' : 'rgba(0,0,0,0.15)'};
          border: 1px solid ${isBinFull ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)'};
          animation: ${isBinFull ? 'shake 0.8s ease-in-out infinite alternate' : 'none'};
        }
        @keyframes shake {
          0% { transform: translate(-50%, -50%) scale(${binScale}) translateY(0); }
          100% { transform: translate(-50%, -50%) scale(${binScale}) translateY(-3px); }
        }

        /* Quick Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(85px, 1fr));
          gap: 8px;
          margin-bottom: 16px;
        }
        .stat-item {
          background: var(--secondary-background-color, rgba(125, 125, 125, 0.06));
          padding: 10px 8px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          border: 1px solid var(--divider-color, rgba(125, 125, 125, 0.08));
        }
        .stat-icon {
          color: var(--primary-color, #0284c7);
          margin-bottom: 4px;
        }
        .stat-val {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--primary-text-color, #1e293b);
        }
        .stat-lbl {
          font-size: 0.68rem;
          color: var(--secondary-text-color, #64748b);
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        /* Action Buttons Grid */
        .actions-section {
          margin-bottom: 12px;
        }
        .section-title {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--secondary-text-color, #64748b);
          margin-bottom: 8px;
          padding-left: 2px;
        }
        .buttons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 8px;
        }
        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 12px;
          background: var(--primary-color, #0284c7);
          color: var(--text-primary-color, #ffffff);
          border: none;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        .action-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }
        .action-btn:active {
          transform: translateY(1px);
        }
        .action-btn.secondary {
          background: var(--secondary-background-color, rgba(125, 125, 125, 0.1));
          color: var(--primary-text-color, #1e293b);
          border: 1px solid var(--divider-color, rgba(125, 125, 125, 0.15));
          box-shadow: none;
        }
        .action-btn.secondary:hover {
          background: var(--secondary-background-color, rgba(125, 125, 125, 0.18));
        }
        .action-btn.warning {
          background: rgba(239, 68, 68, 0.12);
          color: #d32f2f;
          border: 1px solid rgba(239, 68, 68, 0.25);
          box-shadow: none;
        }
        .action-btn.warning:hover {
          background: rgba(239, 68, 68, 0.2);
        }
        .action-btn.blink {
          animation: btn-blink 1.2s ease-in-out infinite;
        }
        @keyframes btn-blink {
          0%, 100% { box-shadow: 0 0 0 0 transparent; }
          50% { box-shadow: 0 0 0 3px var(--primary-color, #0284c7), 0 0 14px var(--primary-color, #0284c7); }
        }

        /* Bag full: status badge turns orange and blinks */
        .status-badge.full {
          background: rgba(255, 152, 0, 0.15);
          color: #e65100;
          animation: badge-blink 1.2s ease-in-out infinite;
        }
        .status-badge.full .status-dot {
          background: #ff9800;
          box-shadow: 0 0 8px #ff9800;
        }
        @keyframes badge-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }

        /* Device unavailable: red status badge, grey entrance circle */
        .status-badge.offline {
          background: rgba(239, 68, 68, 0.12);
          color: #d32f2f;
        }
        .status-badge.offline .status-dot {
          background: #f44336;
          box-shadow: none;
          animation: none;
        }
        .entrance-glow.offline {
          background: radial-gradient(ellipse at center, rgba(120, 120, 120, 0.45) 0%, rgba(120, 120, 120, 0.2) 60%, rgba(120, 120, 120, 0) 85%);
          border-color: rgba(120, 120, 120, 0.6);
          box-shadow: inset 0 0 25px rgba(120, 120, 120, 0.5);
        }
        .entrance-badge.offline {
          background: rgba(90, 90, 90, 0.85);
        }

        /* Collapsible Configuration Section */
        .config-accordion {
          border-radius: 12px;
          background: var(--secondary-background-color, rgba(125, 125, 125, 0.05));
          border: 1px solid var(--divider-color, rgba(125, 125, 125, 0.1));
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .config-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          cursor: pointer;
          user-select: none;
        }
        .config-header:hover {
          background: rgba(125, 125, 125, 0.04);
        }
        .config-header-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--primary-text-color, #1e293b);
        }
        .chevron {
          transition: transform 0.3s ease;
        }
        .chevron.open {
          transform: rotate(180deg);
        }
        .config-body {
          display: ${configOpen ? 'block' : 'none'};
          padding: 6px 14px 14px 14px;
          border-top: 1px solid var(--divider-color, rgba(125, 125, 125, 0.08));
        }
        .config-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid var(--divider-color, rgba(125, 125, 125, 0.06));
          gap: 12px;
        }
        .config-row:last-child {
          border-bottom: none;
          padding-bottom: 2px;
        }
        .config-label-group {
          display: flex;
          flex-direction: column;
        }
        .config-label {
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--primary-text-color, #1e293b);
        }
        .config-desc {
          font-size: 0.7rem;
          color: var(--secondary-text-color, #64748b);
        }

        /* Form Controls styling */
        select.control-select {
          background: var(--card-background-color, #fff);
          color: var(--primary-text-color, #1e293b);
          border: 1px solid var(--divider-color, #cbd5e1);
          border-radius: 8px;
          padding: 6px 10px;
          font-size: 0.8rem;
          font-weight: 500;
          outline: none;
          cursor: pointer;
        }
        .slider-group {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 140px;
        }
        input[type=range] {
          flex: 1;
          accent-color: var(--primary-color, #0284c7);
          cursor: pointer;
        }
        .slider-val {
          font-size: 0.8rem;
          font-weight: 600;
          min-width: 32px;
          text-align: right;
          color: var(--primary-text-color, #1e293b);
        }

        /* Toggle switch */
        .switch {
          position: relative;
          display: inline-block;
          width: 40px;
          height: 22px;
        }
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider-switch {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .3s;
          border-radius: 22px;
        }
        .slider-switch:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .3s;
          border-radius: 50%;
        }
        input:checked + .slider-switch {
          background-color: var(--primary-color, #0284c7);
        }
        input:checked + .slider-switch:before {
          transform: translateX(18px);
        }
  `;
}

export const EDITOR_STYLES = `
        .editor-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 8px 0;
          font-family: var(--paper-font-body1_-_font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
        }
        .header-title {
          font-weight: 700;
          font-size: 0.95rem;
          margin-top: 10px;
          padding-bottom: 4px;
          border-bottom: 2px solid var(--primary-color, #0284c7);
          color: var(--primary-color, #0284c7);
        }
        .row {
          display: flex;
          flex-direction: column;
          gap: 4px;
          position: relative;
        }
        .label {
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--primary-text-color, #334155);
        }
        input.text-input, select.native-select {
          padding: 8px 10px;
          border-radius: 8px;
          border: 1px solid var(--divider-color, #cbd5e1);
          background: var(--card-background-color, #ffffff);
          color: var(--primary-text-color, #1e293b);
          font-size: 0.85rem;
          outline: none;
          transition: border-color 0.2s ease;
          width: 100%;
          box-sizing: border-box;
        }
        input.text-input:focus, select.native-select:focus {
          border-color: var(--primary-color, #0284c7);
          box-shadow: 0 0 0 1px var(--primary-color, #0284c7);
        }

        /* Custom Searchable Select Box matching Home Assistant style */
        .picker-box {
          position: relative;
          width: 100%;
        }
        .picker-trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 12px;
          border-radius: 8px;
          border: 1px solid var(--divider-color, #cbd5e1);
          background: var(--card-background-color, #ffffff);
          color: var(--primary-text-color, #1e293b);
          font-size: 0.85rem;
          cursor: pointer;
          user-select: none;
          box-sizing: border-box;
          transition: border-color 0.2s ease;
        }
        .picker-trigger:hover {
          border-color: var(--primary-color, #0284c7);
        }
        .picker-trigger .selected-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 500;
        }
        .picker-trigger .selected-entity-id {
          font-size: 0.72rem;
          color: var(--secondary-text-color, #64748b);
          margin-left: 6px;
        }
        .picker-dropdown {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          right: 0;
          z-index: 999;
          background: var(--card-background-color, #ffffff);
          border-radius: 8px;
          border: 1px solid var(--divider-color, #cbd5e1);
          box-shadow: 0 6px 16px rgba(0,0,0,0.18);
          max-height: 240px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .picker-search {
          padding: 8px;
          border-bottom: 1px solid var(--divider-color, #e2e8f0);
          background: var(--secondary-background-color, #f8fafc);
        }
        .picker-search input {
          width: 100%;
          padding: 7px 10px;
          border-radius: 6px;
          border: 1px solid var(--divider-color, #cbd5e1);
          background: var(--card-background-color, #ffffff);
          color: var(--primary-text-color, #1e293b);
          font-size: 0.82rem;
          box-sizing: border-box;
          outline: none;
        }
        .picker-search input:focus {
          border-color: var(--primary-color, #0284c7);
        }
        .picker-options {
          overflow-y: auto;
          max-height: 190px;
        }
        .picker-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          cursor: pointer;
          border-bottom: 1px solid rgba(125, 125, 125, 0.06);
          transition: background 0.15s ease;
        }
        .picker-item:hover {
          background: rgba(2, 132, 199, 0.08);
        }
        .picker-item.active {
          background: rgba(2, 132, 199, 0.15);
          font-weight: 600;
        }
        .item-main {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .item-name {
          font-size: 0.82rem;
          color: var(--primary-text-color, #1e293b);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .item-id {
          font-size: 0.7rem;
          color: var(--secondary-text-color, #64748b);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .item-domain {
          font-size: 0.65rem;
          padding: 2px 6px;
          border-radius: 4px;
          background: var(--secondary-background-color, #f1f5f9);
          color: var(--secondary-text-color, #475569);
          text-transform: uppercase;
        }
`;
