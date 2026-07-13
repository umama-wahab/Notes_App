import { RiAlertLine, RiCloseLine } from 'react-icons/ri';
import Button from '../UI/Button';

const DeleteModal = ({ isOpen, onClose, onConfirm, loading = false, noteTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="card w-full max-w-sm animate-scale-in shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-light-border dark:border-dark-border">
          <h2 className="font-semibold text-lg text-light-textPrimary dark:text-dark-textPrimary">Delete Note</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-light-textSecondary hover:bg-light-bg dark:text-dark-textSecondary dark:hover:bg-dark-bg transition-all"
          >
            <RiCloseLine className="text-xl" />
          </button>
        </div>

        <div className="px-6 py-5">
          <div className="flex items-start gap-4 mb-5">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
              <RiAlertLine className="text-danger text-xl" />
            </div>
            <div>
              <p className="text-sm text-light-textPrimary dark:text-dark-textPrimary font-medium mb-1">
                Are you sure you want to delete this note?
              </p>
              {noteTitle && (
                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                  "<span className="font-medium">{noteTitle}</span>" will be permanently deleted.
                </p>
              )}
              <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-1">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button variant="secondary" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button variant="danger" onClick={onConfirm} loading={loading}>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
