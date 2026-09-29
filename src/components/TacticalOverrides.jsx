import React from 'react';
import { ShieldCheck, Eye, Zap, Sparkles } from 'lucide-react';

export default function TacticalOverrides({
  traceBypassCharges,
  scanPulseCharges,
  onUseTraceBypass,
  onUseScanPulse,
  wrongGuesses,
  disabled
}) {
  const canUseTrace = !disabled && traceBypassCharges > 0 && wrongGuesses > 0;
  const canUseScan = !disabled && scanPulseCharges > 0;

  return (
    <div className="tactical-overrides-deck" role="region" aria-label="Tactical Cyber Overrides">
      <div className="overrides-header">
        <div className="overrides-title-group">
          <Zap size={13} className="overrides-icon" />
          <span className="overrides-title">TACTICAL CYBER OVERRIDES</span>
        </div>
        <span className="overrides-status-tag">FIELD OPS</span>
      </div>

      <div className="overrides-buttons-grid">
        {/* Ability 1: Trace Bypass (Restore 1 Life) */}
        <button
          type="button"
          className="btn-override btn-trace-bypass"
          disabled={!canUseTrace}
          onClick={onUseTraceBypass}
          title={
            wrongGuesses === 0
              ? 'No security failures to erase'
              : traceBypassCharges === 0
              ? 'Trace Bypass charges depleted'
              : 'Erase 1 Security Failure (-1 Failure & Restore Life)'
          }
        >
          <div className="override-icon-box">
            <ShieldCheck size={16} />
          </div>
          <div className="override-info">
            <div className="override-name-row">
              <span className="override-name">TRACE BYPASS</span>
              <span className={`charge-pill ${traceBypassCharges > 0 ? 'charge-ready' : 'charge-empty'}`}>
                {traceBypassCharges}/1
              </span>
            </div>
            <span className="override-desc">Erase 1 Security Failure</span>
          </div>
        </button>

        {/* Ability 2: Scan Pulse (Reveal 1 Letter) */}
        <button
          type="button"
          className="btn-override btn-scan-pulse"
          disabled={!canUseScan}
          onClick={onUseScanPulse}
          title={
            scanPulseCharges === 0
              ? 'Scan Pulse charges depleted'
              : 'Auto-decode 1 random unrevealed cipher byte'
          }
        >
          <div className="override-icon-box">
            <Eye size={16} />
          </div>
          <div className="override-info">
            <div className="override-name-row">
              <span className="override-name">SCAN PULSE</span>
              <span className={`charge-pill ${scanPulseCharges > 0 ? 'charge-ready' : 'charge-empty'}`}>
                {scanPulseCharges}/1
              </span>
            </div>
            <span className="override-desc">Auto-decode 1 Hidden Letter</span>
          </div>
        </button>
      </div>
    </div>
  );
}
