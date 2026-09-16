import { useMemo, useState } from 'react';
import { PageHeader } from '../../components/UI';
import SubmissionDetail from '../../components/SubmissionDetail';
import SubmissionTable from '../../components/SubmissionTable';
import EditComplaintModal from '../../components/EditComplaintModal';
import { STATUSES } from '../../constants';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';

export default function MySubmissionsPage() {
  const { currentUser, complaints, departments, statusHistories } = useApp();
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [selectedType, setSelectedType] = useState('complaint');
  const [editingComplaint, setEditingComplaint] = useState(null);

  const myComplaints = complaints.filter((c) => c.citizenId === currentUser.id);

  const filteredComplaints = useMemo(() => {
    return myComplaints.filter((c) => {
      if (filter !== 'all' && c.status !== filter) return false;
      if (
        search &&
        !c.referenceId.toLowerCase().includes(search.toLowerCase()) &&
        !c.title.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [myComplaints, filter, search]);

  const openDetail = (item, type) => {
    setSelected(item);
    setSelectedType(type);
  };

  const history = selected
    ? statusHistories.filter(
        (h) =>
          h.entityId === selected.id &&
          h.entityType === 'complaint'
      )
    : [];

  const deptName = selected?.departmentId
    ? departments.find((d) => d.id === selected.departmentId)?.name
    : null;

  const canEditComplaint = (complaint) => {
    return complaint.status === STATUSES.PENDING;
  };

  const handleEditClick = (complaint) => {
    setEditingComplaint(complaint);
  };

  const handleEditSuccess = () => {
    // Refresh will happen via context
    setEditingComplaint(null);
    if (selected) {
      // Update the selected item to show new details
      const updatedComplaint = complaints.find(c => c.id === selected.id);
      if (updatedComplaint) {
        setSelected(updatedComplaint);
      }
    }
  };

  return (
    <div>
      <PageHeader
        title={t('citizen.submissionsTitle')}
        subtitle={t('citizen.submissionsSubtitle')}
      />

      <div className="filters-bar">
        <input
          className="search-input"
          placeholder={t('form.searchReference')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">{t('status.all')}</option>
          {Object.values(STATUSES).map((s) => (
            <option key={s} value={s}>{t(`status.${s}`)}</option>
          ))}
        </select>
      </div>

      <h2 className="section-title">
        {t('citizen.complaintsSection', { count: filteredComplaints.length })}
      </h2>
      <SubmissionTable
        items={filteredComplaints}
        type="complaint"
        onView={(item) => openDetail(item, 'complaint')}
        onEdit={handleEditClick}
        canEdit={canEditComplaint}
      />

      {selected && (
        <SubmissionDetail
          item={selected}
          type={selectedType}
          history={history}
          departmentName={deptName}
          onClose={() => setSelected(null)}
          actions={
            selectedType === 'complaint' && canEditComplaint(selected) && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setSelected(null);
                  handleEditClick(selected);
                }}
              >
                {t('citizen.editComplaint')}
              </button>
            )
          }
        />
      )}

      {editingComplaint && (
        <EditComplaintModal
          complaint={editingComplaint}
          onClose={() => setEditingComplaint(null)}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
}
