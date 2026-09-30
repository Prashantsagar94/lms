import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { CustomPage } from '../../types';
import {
  FileText,
  Plus,
  Trash2,
  Edit3,
  Eye,
  CheckCircle2,
  ExternalLink,
  Globe,
  Layers,
  Image as ImageIcon,
  AlertTriangle
} from 'lucide-react';

export const CustomPagesSection: React.FC = () => {
  const {
    customPages,
    adminAddCustomPage,
    adminUpdateCustomPage,
    adminDeleteCustomPage,
    setActiveCustomPageSlug,
    websiteSettings
  } = useLMS();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [hindiTitle, setHindiTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<CustomPage['category']>('General');
  const [content, setContent] = useState('');
  const [bannerImageUrl, setBannerImageUrl] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [showInHeader, setShowInHeader] = useState(true);
  const [showInFooter, setShowInFooter] = useState(true);
  const [isPublished, setIsPublished] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');
  const [pageToDelete, setPageToDelete] = useState<CustomPage | null>(null);

  const handleOpenAddModal = () => {
    setEditingPageId(null);
    setTitle('');
    setHindiTitle('');
    setSlug('');
    setCategory('General');
    setContent('## Overview\n\nDetailed content for this page.');
    setBannerImageUrl('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80');
    setMetaDescription('');
    setShowInHeader(true);
    setShowInFooter(true);
    setIsPublished(true);
    setShowAddModal(true);
  };

  const handleOpenEditModal = (page: CustomPage) => {
    setEditingPageId(page.id);
    setTitle(page.title);
    setHindiTitle(page.hindiTitle || '');
    setSlug(page.slug);
    setCategory(page.category);
    setContent(page.content);
    setBannerImageUrl(page.bannerImageUrl || '');
    setMetaDescription(page.metaDescription || '');
    setShowInHeader(page.showInHeader);
    setShowInFooter(page.showInFooter);
    setIsPublished(page.isPublished);
    setShowAddModal(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const formattedSlug = (slug || title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    if (editingPageId) {
      adminUpdateCustomPage(editingPageId, {
        title: title.trim(),
        hindiTitle: hindiTitle.trim(),
        slug: formattedSlug,
        category,
        content,
        bannerImageUrl,
        metaDescription,
        showInHeader,
        showInFooter,
        isPublished
      });
      setSuccessMsg(`Updated custom page: "${title}"`);
    } else {
      adminAddCustomPage({
        title: title.trim(),
        hindiTitle: hindiTitle.trim(),
        slug: formattedSlug,
        category,
        content,
        bannerImageUrl,
        metaDescription,
        showInHeader,
        showInFooter,
        isPublished,
        author: websiteSettings.directorName
      });
      setSuccessMsg(`Created new custom page: "${title}"`);
    }

    setShowAddModal(false);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleConfirmDelete = () => {
    if (!pageToDelete) return;
    adminDeleteCustomPage(pageToDelete.id);
    setSuccessMsg(`Page "${pageToDelete.title}" deleted.`);
    setPageToDelete(null);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
            <Globe className="w-4 h-4" />
            <span>DYNAMIC CONTENT MANAGEMENT SYSTEM (CMS)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
            Custom Website Pages & Content Manager
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Create, publish, edit, and delete any pages on the HunarSetu website (such as practical workshops, syllabus frameworks, success stories, announcements, and job guidelines).
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-md shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create New Page</span>
        </button>
      </div>

      {successMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-3 rounded-xl text-xs flex items-center gap-2 shadow-sm animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Pages Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg space-y-4 p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white font-display">
            Active Website Pages ({customPages.length})
          </h3>
          <span className="text-xs text-slate-400">
            Pages appear dynamically in Navigation Header & Footer
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-3">Page Title & Hindi Title</th>
                <th className="py-3 px-3">Slug (URL Path)</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Navigation Placements</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {customPages.map(page => (
                <tr key={page.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-bold text-white text-sm">{page.title}</div>
                    {page.hindiTitle && (
                      <div className="text-amber-400 text-xs">{page.hindiTitle}</div>
                    )}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-400">
                    /{page.slug}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      {page.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-400 space-x-1">
                    {page.showInHeader && (
                      <span className="px-1.5 py-0.5 bg-slate-800 rounded text-[10px] text-slate-300">
                        Header
                      </span>
                    )}
                    {page.showInFooter && (
                      <span className="px-1.5 py-0.5 bg-slate-800 rounded text-[10px] text-slate-300">
                        Footer
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        page.isPublished
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {page.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right space-x-1.5 whitespace-nowrap">
                    <button
                      onClick={() => setActiveCustomPageSlug(page.slug)}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg transition-colors"
                      title="View Page"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleOpenEditModal(page)}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                      title="Edit Page"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setPageToDelete(page)}
                      className="p-1.5 bg-slate-800 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                      title="Delete Page"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <span>{editingPageId ? 'Edit Custom Page' : 'Create New Custom Page'}</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Page Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. State-wide Workshops 2026"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Hindi Title (Optional)</label>
                  <input
                    type="text"
                    value={hindiTitle}
                    onChange={e => setHindiTitle(e.target.value)}
                    placeholder="e.g. राज्य स्तरीय कार्यशालाएं 2026"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={e => setSlug(e.target.value)}
                    placeholder="e.g. statewide-workshops-2026"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-amber-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as CustomPage['category'])}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-amber-400"
                  >
                    <option value="General">General Information</option>
                    <option value="Workshops">Practical Workshops</option>
                    <option value="Syllabus">Curriculum & Syllabus</option>
                    <option value="Notice">Official Notice & Announcement</option>
                    <option value="Success Stories">Success Stories</option>
                    <option value="Career">Career & Placement</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Banner Image URL</label>
                <input
                  type="url"
                  value={bannerImageUrl}
                  onChange={e => setBannerImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-amber-400 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Page Content (Markdown / Formatted Text) *</label>
                <textarea
                  rows={8}
                  required
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="## Section Title&#10;&#10;Write comprehensive article text here.&#10;&#10;### Key Highlights&#10;- Point 1&#10;- Point 2"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-white outline-none focus:border-amber-400 font-mono text-xs leading-relaxed"
                />
              </div>

              <div className="flex flex-wrap items-center gap-6 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={e => setIsPublished(e.target.checked)}
                    className="rounded text-amber-500 focus:ring-0"
                  />
                  <span className="text-slate-200">Publish Immediately</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showInHeader}
                    onChange={e => setShowInHeader(e.target.checked)}
                    className="rounded text-amber-500 focus:ring-0"
                  />
                  <span className="text-slate-200">Show in Header Navbar</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showInFooter}
                    onChange={e => setShowInFooter(e.target.checked)}
                    className="rounded text-amber-500 focus:ring-0"
                  />
                  <span className="text-slate-200">Show in Website Footer</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl shadow cursor-pointer"
                >
                  {editingPageId ? 'Save Changes' : 'Publish Page'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {pageToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-red-500/40 rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-bold text-white text-base">Delete Page</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to delete <strong>"{pageToDelete.title}"</strong> (/{pageToDelete.slug})? This cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setPageToDelete(null)}
                className="px-3.5 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg text-xs"
              >
                Delete Page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
