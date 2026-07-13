import { useState, useEffect, useCallback } from 'react';
import { RiAddLine, RiFileTextLine, RiCalendarLine, RiPushpin2Fill, RiHeartFill, RiSortAsc, RiSortDesc } from 'react-icons/ri';
import { notesAPI } from '../services/api';
import NoteCard from '../components/Notes/NoteCard';
import NoteFormModal from '../components/Notes/NoteFormModal';
import DeleteModal from '../components/Notes/DeleteModal';
import Button from '../components/UI/Button';
import { SkeletonGrid } from '../components/UI/Skeleton';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const EmptyState = ({ searchQuery, onCreate }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
      <RiFileTextLine className="text-primary dark:text-primary-dark text-3xl" />
    </div>
    {searchQuery ? (
      <>
        <h3 className="font-semibold text-light-textPrimary dark:text-dark-textPrimary mb-1">No results found</h3>
        <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
          No notes match "<span className="font-medium">{searchQuery}</span>"
        </p>
      </>
    ) : (
      <>
        <h3 className="font-semibold text-light-textPrimary dark:text-dark-textPrimary mb-1">No notes yet</h3>
        <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-4">
          Create your first note to get started
        </p>
        <Button variant="primary" onClick={onCreate}>
          <RiAddLine /> Create Note
        </Button>
      </>
    )}
  </div>
);

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="card p-4 flex items-center gap-4">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
      <Icon className="text-xl text-white" />
    </div>
    <div>
      <p className="text-2xl font-bold text-light-textPrimary dark:text-dark-textPrimary">{value}</p>
      <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">{label}</p>
    </div>
  </div>
);

const Dashboard = ({ searchQuery = '' }) => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formModal, setFormModal] = useState({ open: false, note: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, note: null });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [sort, setSort] = useState('-createdAt');

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await notesAPI.getAll(sort);
      setNotes(data);
    } catch {
      toast.error('Failed to load notes');
    } finally {
      setLoading(false);
    }
  }, [sort]);

  useEffect(() => { fetchNotes(); }, [fetchNotes]);

  // Filter notes based on search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredNotes(notes);
      return;
    }
    const q = searchQuery.toLowerCase();
    setFilteredNotes(notes.filter(n =>
      n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
    ));
  }, [searchQuery, notes]);

  const handleSave = async ({ title, content }) => {
    setSaving(true);
    try {
      if (formModal.note) {
        const { data } = await notesAPI.update(formModal.note._id, { title, content });
        setNotes(prev => prev.map(n => n._id === data._id ? data : n));
        toast.success('Note updated!');
      } else {
        const { data } = await notesAPI.create({ title, content });
        setNotes(prev => [data, ...prev]);
        toast.success('Note created!');
      }
      setFormModal({ open: false, note: null });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save note');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await notesAPI.delete(deleteModal.note._id);
      setNotes(prev => prev.filter(n => n._id !== deleteModal.note._id));
      toast.success('Note deleted');
      setDeleteModal({ open: false, note: null });
    } catch {
      toast.error('Failed to delete note');
    } finally {
      setDeleting(false);
    }
  };

  const handleTogglePin = async (note) => {
    try {
      const { data } = await notesAPI.update(note._id, { isPinned: !note.isPinned });
      setNotes(prev => prev.map(n => n._id === data._id ? data : n));
      toast.success(data.isPinned ? 'Note pinned' : 'Note unpinned');
    } catch {
      toast.error('Failed to update note');
    }
  };

  const handleToggleFavorite = async (note) => {
    try {
      const { data } = await notesAPI.update(note._id, { isFavorite: !note.isFavorite });
      setNotes(prev => prev.map(n => n._id === data._id ? data : n));
      toast.success(data.isFavorite ? 'Added to favorites' : 'Removed from favorites');
    } catch {
      toast.error('Failed to update note');
    }
  };

  const now = new Date();
  const thisMonth = notes.filter(n => {
    const d = new Date(n.createdAt);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
  const pinnedCount = notes.filter(n => n.isPinned).length;

  // Sort display: pinned first
  const displayNotes = [...filteredNotes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Welcome */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-light-textPrimary dark:text-dark-textPrimary">
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'},{' '}
          {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-light-textSecondary dark:text-dark-textSecondary mt-0.5">
          {searchQuery ? `Searching for "${searchQuery}"` : "Here's an overview of your notes"}
        </p>
      </div>

      {/* Stats */}
      {!searchQuery && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          <StatCard icon={RiFileTextLine} label="Total Notes" value={notes.length} color="bg-primary" />
          <StatCard icon={RiCalendarLine} label="This Month" value={thisMonth} color="bg-accent" />
          <StatCard icon={RiPushpin2Fill} label="Pinned Notes" value={pinnedCount} color="bg-violet-500" />
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="font-semibold text-light-textPrimary dark:text-dark-textPrimary">
          {searchQuery ? `Results (${filteredNotes.length})` : 'All Notes'}
        </h2>
        <div className="flex items-center gap-2">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-sm px-3 py-1.5 rounded-lg border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface text-light-textSecondary dark:text-dark-textSecondary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="-createdAt">Newest First</option>
            <option value="createdAt">Oldest First</option>
            <option value="title">Title A–Z</option>
            <option value="-title">Title Z–A</option>
            <option value="-updatedAt">Last Updated</option>
          </select>
          <Button variant="primary" onClick={() => setFormModal({ open: true, note: null })}>
            <RiAddLine /> <span className="hidden sm:inline">New Note</span>
          </Button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <SkeletonGrid count={6} />
      ) : displayNotes.length === 0 ? (
        <EmptyState searchQuery={searchQuery} onCreate={() => setFormModal({ open: true, note: null })} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayNotes.map(note => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={(n) => setFormModal({ open: true, note: n })}
              onDelete={(n) => setDeleteModal({ open: true, note: n })}
              onTogglePin={handleTogglePin}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <NoteFormModal
        isOpen={formModal.open}
        onClose={() => setFormModal({ open: false, note: null })}
        onSave={handleSave}
        note={formModal.note}
        loading={saving}
      />
      <DeleteModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, note: null })}
        onConfirm={handleDelete}
        loading={deleting}
        noteTitle={deleteModal.note?.title}
      />
    </div>
  );
};

export default Dashboard;
