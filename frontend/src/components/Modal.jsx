import React, { useEffect } from 'react';

/**
 * Premium Modal Component
 *
 * Props:
 *  - isOpen      : boolean – controls visibility
 *  - type        : 'success' | 'error' | 'confirm' | 'info'
 *  - title       : string  – modal heading
 *  - message     : string  – body text
 *  - onConfirm   : fn      – called when primary button is clicked
 *  - onCancel    : fn      – called when cancel/close button is clicked (confirm dialogs)
 *  - confirmText : string  – label for primary button (default: 'OK')
 *  - cancelText  : string  – label for cancel button (default: 'Cancel')
 */
const Modal = ({
  isOpen,
  type = 'info',
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'OK',
  cancelText = 'Cancel',
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        if (onCancel) onCancel();
        else if (onConfirm) onConfirm();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onCancel, onConfirm]);

  if (!isOpen) return null;

  const icons = {
    success: (
      <div className="modal-icon-wrap modal-icon-success">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
    ),
    error: (
      <div className="modal-icon-wrap modal-icon-error">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
    ),
    confirm: (
      <div className="modal-icon-wrap modal-icon-confirm">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>
    ),
    info: (
      <div className="modal-icon-wrap modal-icon-info">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
    ),
  };

  const isConfirm = type === 'confirm';

  return (
    <>
      <style>{`
        @keyframes backdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.88) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .modal-backdrop {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          animation: backdropIn 0.25s ease;
        }
        .modal-card {
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.22);
          padding: 2rem 2.2rem 1.8rem;
          min-width: 320px; max-width: 420px; width: 90%;
          animation: modalIn 0.3s cubic-bezier(0.34,1.56,0.64,1);
          text-align: center;
        }
        .modal-icon-wrap {
          width: 64px; height: 64px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1.1rem;
        }
        .modal-icon-wrap svg { width: 30px; height: 30px; }
        .modal-icon-success { background: #ecfdf5; color: #16a34a; }
        .modal-icon-error   { background: #fef2f2; color: #dc2626; }
        .modal-icon-confirm { background: #fffbeb; color: #d97706; }
        .modal-icon-info    { background: #eff6ff; color: #2563eb; }
        .modal-title {
          font-size: 1.25rem; font-weight: 700; color: #1e293b;
          margin-bottom: 0.6rem; line-height: 1.3;
        }
        .modal-message {
          font-size: 0.94rem; color: #64748b;
          margin-bottom: 1.6rem; line-height: 1.6;
        }
        .modal-actions { display: flex; gap: 0.75rem; justify-content: center; }
        .modal-btn {
          flex: 1; padding: 0.65rem 1rem;
          border-radius: 10px; font-size: 0.93rem; font-weight: 600;
          border: none; cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s, filter 0.15s;
        }
        .modal-btn:hover  { filter: brightness(1.08); transform: translateY(-1px); box-shadow: 0 4px 14px rgba(0,0,0,0.14); }
        .modal-btn:active { transform: translateY(0); }
        .modal-btn-primary-success { background: linear-gradient(135deg,#16a34a,#22c55e); color: #fff; }
        .modal-btn-primary-error   { background: linear-gradient(135deg,#dc2626,#f87171); color: #fff; }
        .modal-btn-primary-confirm { background: linear-gradient(135deg,#d97706,#fbbf24); color: #fff; }
        .modal-btn-primary-info    { background: linear-gradient(135deg,#2563eb,#60a5fa); color: #fff; }
        .modal-btn-secondary {
          background: #f1f5f9; color: #475569;
        }
      `}</style>

      <div className="modal-backdrop" onClick={onCancel || onConfirm}>
        <div className="modal-card" onClick={(e) => e.stopPropagation()}>
          {icons[type]}
          <div className="modal-title">{title}</div>
          <div className="modal-message">{message}</div>
          <div className="modal-actions">
            {isConfirm && (
              <button className="modal-btn modal-btn-secondary" onClick={onCancel}>
                {cancelText}
              </button>
            )}
            <button
              className={`modal-btn modal-btn-primary-${type === 'confirm' ? 'error' : type}`}
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
