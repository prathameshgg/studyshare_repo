import React, { useState, useEffect } from 'react';
import { Search, Filter, BookOpen, Upload, Download } from 'lucide-react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Note } from '../types/note';
import { useAuth } from '../contexts/AuthContext';
import UploadNoteModal from '../components/notes/UploadNoteModal';

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const notesQuery = query(collection(db, 'notes'), orderBy('uploadedAt', 'desc'));
      const querySnapshot = await getDocs(notesQuery);
      const notesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Note[];
      setNotes(notesData);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Study Notes</h1>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search notes..."
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
            {isAuthenticated && (
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Upload className="h-5 w-5 mr-2" />
                Upload Notes
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div key={note.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{note.title}</h3>
                <p className="text-gray-600 mb-2">{note.subject}</p>
                <p className="text-gray-500 text-sm mb-4">{note.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Download className="h-4 w-4 text-indigo-600 mr-1" />
                    <span className="text-sm text-gray-500">{note.downloads} downloads</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-indigo-600">★ {note.rating.toFixed(1)}</span>
                  </div>
                </div>
                <a
                  href={note.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors inline-flex items-center justify-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Notes
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {isUploadModalOpen && (
        <UploadNoteModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onUploadComplete={fetchNotes}
        />
      )}
    </div>
  );
}