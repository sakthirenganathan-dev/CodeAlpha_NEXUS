import React from 'react';
import { CheckCircle2, XCircle, AlertCircle, Info, Sparkles, Lightbulb } from 'lucide-react';

export default function Notification({ notification }) {
  if (!notification) return null;

  const { type, message, delta } = notification;

  let Icon = Info;
  let toneClass = 'notif-tone-info';

  if (type === 'CORRECT') {
    Icon = CheckCircle2;
    toneClass = 'notif-tone-correct';
  } else if (type === 'WRONG') {
    Icon = XCircle;
    toneClass = 'notif-tone-wrong';
  } else if (type === 'DUPLICATE' || type === 'INVALID') {
    Icon = AlertCircle;
    toneClass = 'notif-tone-warning';
  } else if (type === 'HINT') {
    Icon = Lightbulb;
    toneClass = 'notif-tone-hint';
  } else if (type === 'BONUS') {
    Icon = Sparkles;
    toneClass = 'notif-tone-bonus';
  }

  return (
    <div className={`cyber-notification-toast ${toneClass}`} role="status" aria-live="polite">
      <div className="toast-inner">
        <Icon size={16} className="toast-icon" />
        <span className="toast-message">{message}</span>
        {delta !== undefined && (
          <span className={`toast-delta-tag ${delta >= 0 ? 'delta-pos' : 'delta-neg'}`}>
            {delta >= 0 ? `+${delta}` : delta}
          </span>
        )}
      </div>
      <div className="toast-scan-bar"></div>
    </div>
  );
}
