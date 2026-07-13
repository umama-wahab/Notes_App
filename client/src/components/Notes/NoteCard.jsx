import { RiEditLine, RiDeleteBinLine, RiPushpin2Line, RiPushpin2Fill, RiHeartLine, RiHeartFill } from 'react-icons/ri';

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const NoteCard = ({ note, onEdit, onDelete, onTogglePin, onToggleFavorite }) => {
  return (
    <div className="card p-5 flex flex-col gap-3 hover:-translate-y-1 hover:shadow-md transition-all duration-200 group animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-light-textPrimary dark:text-dark-textPrimary line-clamp-1 flex-1">
          {note.title}
        </h3>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
          <button
            onClick={() => onTogglePin?.(note)}
            className="p-1.5 rounded-md text-light-textSecondary hover:bg-light-bg hover:text-primary dark:text-dark-textSecondary dark:hover:bg-dark-bg dark:hover:text-primary-dark transition-all"
            title={note.isPinned ? 'Unpin' : 'Pin'}
          >
            {note.isPinned ? <RiPushpin2Fill className="text-primary dark:text-primary-dark" /> : <RiPushpin2Line />}
          </button>
          <button
            onClick={() => onToggleFavorite?.(note)}
            className="p-1.5 rounded-md text-light-textSecondary hover:bg-light-bg hover:text-red-500 dark:text-dark-textSecondary dark:hover:bg-dark-bg transition-all"
            title={note.isFavorite ? 'Unfavorite' : 'Favorite'}
          >
            {note.isFavorite ? <RiHeartFill className="text-red-500" /> : <RiHeartLine />}
          </button>
        </div>
      </div>

      {/* Badges */}
      {(note.isPinned || note.isFavorite) && (
        <div className="flex gap-1.5">
          {note.isPinned && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary dark:text-primary-dark text-xs font-medium">
              <RiPushpin2Fill className="text-xs" /> Pinned
            </span>
          )}
          {note.isFavorite && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-400 text-xs font-medium">
              <RiHeartFill className="text-xs" /> Favorite
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary line-clamp-3 flex-1 leading-relaxed">
        {note.content}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-light-border dark:border-dark-border">
        <div className="text-xs text-light-textSecondary dark:text-dark-textSecondary space-y-0.5">
          <p>Created {formatDate(note.createdAt)}</p>
          {note.updatedAt !== note.createdAt && (
            <p>Updated {formatDate(note.updatedAt)}</p>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(note)}
            className="p-1.5 rounded-md text-light-textSecondary hover:bg-light-bg hover:text-primary dark:text-dark-textSecondary dark:hover:bg-dark-bg dark:hover:text-primary-dark transition-all"
            title="Edit note"
          >
            <RiEditLine />
          </button>
          <button
            onClick={() => onDelete(note)}
            className="p-1.5 rounded-md text-light-textSecondary hover:bg-red-50 hover:text-danger dark:text-dark-textSecondary dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-all"
            title="Delete note"
          >
            <RiDeleteBinLine />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
