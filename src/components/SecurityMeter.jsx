import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, Lock, Activity } from 'lucide-react';

export default function SecurityMeter({ wrongGuesses, maxFailures = 6 }) {
  const failures = wrongGuesses;
  const remaining = Math.max(0, maxFailures - failures);
  const integrityPct = Math.round(((maxFailures - failures) / maxFailures) * 100);

  // Status Level evaluation
  let threatLevel = "SYSTEM SECURE";
  let statusClass = "status-tier-0";
  let Icon = ShieldCheck;

  if (failures >= maxFailures) {
    threatLevel = "SYSTEM LOCKED";
    statusClass = "status-tier-5";
    Icon = Lock;
  } else if (failures === maxFailures - 1) {
    threatLevel = "CRITICAL";
    statusClass = "status-tier-4";
    Icon = ShieldAlert;
  } else if (failures >= Math.floor(maxFailures / 2)) {
    threatLevel = "SECURITY WARNING";
    statusClass = "status-tier-3";
    Icon = AlertTriangle;
  } else if (failures >= 1) {
    threatLevel = "MONITORING";
    statusClass = "status-tier-1";
    Icon = Activity;
  }

  const blocks = Array.from({ length: maxFailures }, (_, i) => i < failures);

  return (
    <div className={`security-meter-card ${statusClass}`}>
      <div className="meter-card-header">
        <div className="meter-header-tag">
          <Icon size={14} className="meter-icon" />
          <span>SECURITY INTEGRITY</span>
        </div>
        <div className="meter-threat-badge">{threatLevel}</div>
      </div>

      <div className="meter-metrics-row">
        <div className="meter-stat-box">
          <span className="stat-sub-label">FAILURES</span>
          <div className="stat-digits-group">
            <span className="stat-digit-fail">{failures}</span>
            <span className="stat-denom">/ {maxFailures}</span>
          </div>
        </div>

        <div className="meter-stat-box">
          <span className="stat-sub-label">REMAINING</span>
          <div className="stat-digits-group">
            <span className="stat-digit-remain">{remaining}</span>
            <span className="stat-denom">TRIES</span>
          </div>
        </div>
      </div>

      {/* Visual Integrity Progress Bar */}
      <div className="meter-progress-section">
        <div className="integrity-header-row">
          <span className="integrity-label">COUNTERMEASURE RESISTANCE</span>
          <span className="integrity-percent-num">{integrityPct}%</span>
        </div>

        <div className="integrity-bar-track">
          <div
            className={`integrity-bar-fill ${statusClass}`}
            style={{ width: `${integrityPct}%` }}
          ></div>
        </div>

        {/* Dynamic Segment Blocks */}
        <div className="cyber-segments-flex">
          {blocks.map((isFailed, idx) => (
            <div
              key={idx}
              className={`cyber-segment-block ${isFailed ? 'segment-failed' : 'segment-secure'}`}
              title={`Attempt ${idx + 1}: ${isFailed ? 'Breached / Failed' : 'Secure'}`}
            >
              <div className="segment-indicator-dot"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
