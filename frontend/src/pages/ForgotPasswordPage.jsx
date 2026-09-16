import { useState } from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '../components/BrandLogo';
import LanguageSwitcher from '../components/LanguageSwitcher';
import '../components/BrandLogo.css';
import '../components/LanguageSwitcher.css';
import { useLanguage } from '../context/LanguageContext';
import { MailIcon } from '../components/auth/AuthIcons';
import { api } from '../services/api';
import './Auth.css';

const SIDEBAR_FEATURES = [
  { icon: '📝', key: 'auth.featureComplaints' },
  { icon: '📋', key: 'auth.featureServices' },
  { icon: '🔔', key: 'auth.featureNotifications' },
];

export default function ForgotPasswordPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await api.post('/auth/forgot-password', { email });
      if (res.success) {
        setSuccess(t('auth.resetEmailSent'));
        setEmail('');
      } else {
        setError(res.message || t('common.error'));
      }
    } catch (err) {
      setError(err.message || t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-split-page">
      <aside className="auth-sidebar" aria-label={t('auth.welcomeBack')}>
        <div className="auth-sidebar-top">
          <BrandLogo className="sidebar-brand" to="/" />
          <LanguageSwitcher className="language-switcher--sidebar" />
        </div>

        <div className="auth-sidebar-content">
          <h1>{t('auth.welcomeBack')}</h1>
          <p>{t('auth.sidebarDescription')}</p>
          <ul className="auth-feature-list">
            {SIDEBAR_FEATURES.map((item) => (
              <li key={item.key}>
                <span className="auth-feature-icon" aria-hidden="true">{item.icon}</span>
                {t(item.key)}
              </li>
            ))}
          </ul>
        </div>

        <p className="auth-sidebar-footer">{t('auth.copyright')}</p>
      </aside>

      <main className="auth-main">
        <div className="auth-card">
          <div className="auth-card-header">
            <h2>{t('auth.forgotPasswordTitle')}</h2>
            <p>{t('auth.forgotPasswordSubtitle')}</p>
          </div>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          {!success && (
            <form onSubmit={handleSubmit} className="auth-form">
              <label className="auth-field">
                <span>{t('auth.emailAddress')}</span>
                <span className="auth-input-wrap">
                  <MailIcon />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder={t('auth.emailPlaceholder')}
                    autoComplete="email"
                    disabled={loading}
                  />
                </span>
              </label>

              <button
                type="submit"
                className="btn btn-primary btn-block auth-submit-btn"
                disabled={loading}
              >
                {loading ? t('auth.emailSending') : t('auth.sendResetLink')}
              </button>
            </form>
          )}

          <p className="auth-footer" style={{ marginTop: '2rem' }}>
            <Link to="/login" className="auth-link-btn" style={{ fontWeight: '600' }}>
              &larr; {t('auth.backToLogin')}
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
