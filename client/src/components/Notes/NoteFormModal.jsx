import { useState, useEffect, useRef } from 'react';
import { RiCloseLine, RiSaveLine } from 'react-icons/ri';
import Button from '../UI/Button';

const NoteFormModal = ({ isOpen, onClose, onSave, note = null, loading = false }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});
  const titleRef = useRef(null);

  const isEdit = !!note;

  useEffect(() => {
    if (isOpen) {
      setTitle(note?.title || '');
      setContent(note?.content || '');
      setErrors({});
      setTimeout(() => titleRef.current?.focus(), 100);
    }
  }, [isOpen, note]);

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = 'Title is required';
    if (!content.trim()) e.content = 'Content is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({ title: title.trim(), content: content.trim() });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onKeyDown={handleKeyDown}
    >
      <div className="card w-full max-w-lg animate-scale-in shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-light-border dark:border-dark-border">
          <h2 className="font-semibold text-lg text-light-textPrimary dark:text-dark-textPrimary">
            {isEdit ? 'Edit Note' : 'Create Note'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-light-textSecondary hover:bg-light-bg hover:text-light-textPrimary dark:text-dark-textSecondary dark:hover:bg-dark-bg dark:hover:text-dark-textPrimary transition-all"
          >
            <RiCloseLine className="text-xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-light-textPrimary dark:text-dark-textPrimary mb-1.5">
              Title <span className="text-danger">*</span>
            </label>
            <input
              ref={titleRef}
              type="text"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setErrors(p => ({ ...p, title: '' })); }}
              placeholder="Note title..."
              className={`input-field ${errors.title ? 'border-danger focus:ring-danger' : ''}`}
            />
            {errors.title && <p className="mt-1 text-xs text-danger">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-light-textPrimary dark:text-dark-textPrimary mb-1.5">
              Content <span className="text-danger">*</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => { setContent(e.target.value); setErrors(p => ({ ...p, content: '' })); }}
              placeholder="Write your note here..."
              rows={6}
              className={`input-field resize-none ${errors.content ? 'border-danger focus:ring-danger' : ''}`}
            />
            {errors.content && <p className="mt-1 text-xs text-danger">{errors.content}</p>}
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={loading}>
              <RiSaveLine />
              {isEdit ? 'Update Note' : 'Save Note'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteFormModal;
