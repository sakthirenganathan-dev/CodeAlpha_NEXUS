import React from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, Lock } from 'lucide-react';

const MAX_FAILURES = 6;

export default function SecurityStatus({ incorrectGuesses }) {
  const failures = incorrectGuesses;
  const remaining = Math.max(0, MAX_FAILURES - failures);
  const integrityPct = Math.round(((MAX_FAILURES - failures) / MAX_FAILURES) * 100);

  // Status Level evaluation
  let threatLevel = "SYSTEM SECURE";
  let statusColorClass = "status-green";
  let StatusIcon = ShieldCheck;

  if (failures >= 6) {
    threatLevel = "SYSTEM LOCKED";
    statusColorClass = "status-red";
    StatusIcon = Lock;
  } else if (failures >= 5) {
    threatLevel = "CRITICAL SECURITY LEVEL";
    statusColorClass = "status-red";
    StatusIcon = ShieldAlert;
  } else if (failures >= 3) {
    threatLevel = "SECURITY WARNING";
    statusColorClass = "status-yellow";
    StatusIcon = AlertTriangle;
  } else if (failures > 0) {
    threatLevel = "SECURITY ALERT";
    statusColorClass = "status-cyan";
    StatusIcon = ShieldAlert;
  }

  // Segment blocks: 6 blocks total
  const blocks = Array.from({ length: MAX_FAILURES }, (_, i) => i < failures);

  return (
    <div className={`security-status-card ${statusColorClass}`}>
      <div className="card-sub-header">
        <div className="header-tag">
          <StatusIcon size={14} className="tag-icon" />
          <span>SECURITY STATUS</span>
        </div>
        <div className="threat-badge">{threatLevel}</div>
      </div>

      <div className="status-metrics-grid">
        <div className="metric-box">
          <span className="metric-label">FAILURES</span>
          <div className="metric-value-row">
            <span className="metric-num failure-num">{failures}</span>
            <span className="metric-denom">/ {MAX_FAILURES}</span>
          </div>
        </div>

        <div className="metric-box">
          <span className="metric-label">REMAINING</span>
          <div className="metric-value-row">
            <span className="metric-num remaining-num">{remaining}</span>
            <span className="metric-denom">TRIES</span>
          </div>
        </div>

        <div className="metric-box wide">
          <div className="integrity-header">
            <span className="metric-label">SECURITY INTEGRITY</span>
            <span className="integrity-pct">{integrityPct}%</span>
          </div>
          
          {/* Continuous Progress Bar */}
          <div className="progress-bar-track">
            <div
              className={`progress-bar-fill ${statusColorClass}`}
              style={{ width: `${integrityPct}%` }}
            ></div>
          </div>

          {/* Cyber Segment Blocks */}
          <div className="cyber-segments-row">
            {blocks.map((isFailed, idx) => (
              <div
                key={idx}
                className={`segment-cell ${isFailed ? 'failed' : 'intact'}`}
                title={`Attempt ${idx + 1}: ${isFailed ? 'Compromised' : 'Intact'}`}
              >
                <span className="segment-core"></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
