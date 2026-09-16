import { useState, useEffect } from 'react';
import { COMPLAINT_CATEGORIES, CATEGORY_I18N_KEYS, ADAMA_KEBELES, ADAMA_LANDMARKS } from '../constants';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import VoiceButton from './ai/VoiceButton';
import AiCitizenAssist from './ai/AiCitizenAssist';
import './SubmissionTable.css';

export default function EditComplaintModal({ complaint, onClose, onSuccess }) {
  const { updateComplaint } = useApp();
  const { t } = useLanguage();
  const { showToast } = useToast();
  
  // Parse existing location string (format: "Kebele - Landmark - Specific")
  const parseLocation = (locationString) => {
    if (!locationString) return { kebele: '', landmark: '', specificLocation: '' };
    const parts = locationString.split(' - ');
    return {
      kebele: parts[0] || '',
      landmark: parts[1] || '',
      specificLocation: parts[2] || '',
    };
  };

  const [form, setForm] = useState({
    title: complaint.title || '',
    description: complaint.description || '',
    category: complaint.category || COMPLAINT_CATEGORIES[0],
    ...parseLocation(complaint.location),
    photoUrl: complaint.photoUrl || '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [highlight, setHighlight] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    
    setSubmitting(true);
    try {
      // Combine location fields into one string
      const locationParts = [form.kebele, form.landmark, form.specificLocation].filter(Boolean);
      const location = locationParts.join(' - ');
      
      await updateComplaint(complaint.id, { ...form, location });
      showToast(t('citizen.complaintUpdated'), 'success');
      onSuccess();
      onClose();
    } catch (err) {
      showToast(err.message || t('citizen.updateFailed'), 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const appendVoice = (field) => (transcript) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field] ? `${prev[field].trim()} ${transcript}` : transcript,
    }));
  };

  const applyAi = (s) => {
    const nextHighlight = {};
    setForm((prev) => {
      const next = { ...prev };
      if (s.title != null && s.title !== prev.title) {
        next.title = s.title;
        nextHighlight.title = true;
      }
      if (s.description != null && s.description !== prev.description) {
        next.description = s.description;
        nextHighlight.description = true;
      }
      if (s.category && COMPLAINT_CATEGORIES.includes(s.category)) {
        next.category = s.category;
        nextHighlight.category = true;
      }
      return next;
    });
    setHighlight(nextHighlight);
    showToast(t('commonApp.aiApplied'), 'success');
    window.setTimeout(() => setHighlight({}), 2200);
  };

  // Build full location string for AI
  const fullLocation = [form.kebele, form.landmark, form.specificLocation].filter(Boolean).join(' - ');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <code>{complaint.referenceId}</code>
            <h2>{t('citizen.editComplaintTitle')}</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="form-card" id="ai-form-anchor">
          <label className={highlight.title ? 'ai-field-flash' : undefined}>
            {t('form.title')}
            <div className="ai-field-row">
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                placeholder={t('form.titlePlaceholder')}
              />
              <VoiceButton onTranscript={appendVoice('title')} />
            </div>
          </label>

          <label className={highlight.category ? 'ai-field-flash' : undefined}>
            {t('form.category')}
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {COMPLAINT_CATEGORIES.map((value) => (
                <option key={value} value={value}>
                  {t(`categories.${CATEGORY_I18N_KEYS[value]}`)}
                </option>
              ))}
            </select>
          </label>

          <div className="location-group">
            <label className={highlight.kebele ? 'ai-field-flash' : undefined}>
              {t('form.kebele')}
              <select
                value={form.kebele}
                onChange={(e) => setForm({ ...form, kebele: e.target.value })}
                required
              >
                <option value="">{t('form.selectKebele')}</option>
                {ADAMA_KEBELES.map((kebele) => (
                  <option key={kebele} value={kebele}>{kebele}</option>
                ))}
              </select>
            </label>

            <label className={highlight.landmark ? 'ai-field-flash' : undefined}>
              {t('form.landmark')}
              <select
                value={form.landmark}
                onChange={(e) => setForm({ ...form, landmark: e.target.value })}
                required
              >
                <option value="">{t('form.selectLandmark')}</option>
                {ADAMA_LANDMARKS.map((landmark) => (
                  <option key={landmark} value={landmark}>{landmark}</option>
                ))}
              </select>
            </label>

            <label className={highlight.specificLocation ? 'ai-field-flash' : undefined}>
              {t('form.specificLocation')}
              <div className="ai-field-row">
                <input
                  value={form.specificLocation}
                  onChange={(e) => setForm({ ...form, specificLocation: e.target.value })}
                  placeholder={t('form.specificLocationPlaceholder')}
                />
                <VoiceButton onTranscript={appendVoice('specificLocation')} />
              </div>
            </label>
          </div>

          <label className={highlight.description ? 'ai-field-flash' : undefined}>
            {t('form.description')}
            <div className="ai-field-row">
              <textarea
                rows={5}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
                placeholder={t('form.descriptionPlaceholder')}
              />
              <VoiceButton onTranscript={appendVoice('description')} />
            </div>
          </label>

          <AiCitizenAssist
            type="complaint"
            title={form.title}
            description={form.description}
            location={fullLocation}
            onApply={applyAi}
          />

          <div className="form-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose} disabled={submitting}>
              {t('form.cancel')}
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? t('form.saving') : t('form.saveChanges')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
