import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import BrandLogo from '../components/BrandLogo';
import LanguageSwitcher from '../components/LanguageSwitcher';
import '../components/BrandLogo.css';
import '../components/LanguageSwitcher.css';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { EyeIcon, LockIcon } from '../components/auth/AuthIcons';
import { api } from '../services/api';
import './Auth.css';

const SIDEBAR_FEATURES = [
  { icon: '📝', key: 'auth.featureComplaints' },
  { icon: '📋', key: 'auth.featureServices' },
  { icon: '🔔', key: 'auth.featureNotifications' },
];

export default function ResetPasswordPage() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setError(t('auth.invalidToken'));
    }
  }, [token, t]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError(t('auth.invalidToken'));
      return;
    }

    if (password !== confirmPassword) {
      setError(t('auth.passwordsDoNotMatch'));
      showToast(t('auth.passwordsDoNotMatch'), 'error');
      return;
    }

    if (password.length < 6) {
      setError(t('auth.passwordPlaceholder')); // Min 6 chars
      showToast('Password must be at least 6 characters.', 'error');
      return;
    }

    setLoading(true);

    try {
      const res = await api.post('/auth/reset-password', { token, password });
      if (res.success) {
        setSuccess(true);
        showToast(t('auth.passwordResetSuccess'), 'success');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(res.message || t('common.error'));
        showToast(res.message || t('common.error'), 'error');
      }
    } catch (err) {
      setError(err.message || t('common.error'));
      showToast(err.message || t('common.error'), 'error');
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
            <h2>{t('auth.resetPasswordTitle')}</h2>
            <p>{t('auth.resetPasswordSubtitle')}</p>
          </div>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{t('auth.passwordResetSuccess')}</div>}

          {!success && (
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-field">
                <span>{t('auth.newPasswordLabel')}</span>
                <span className="auth-input-wrap">
                  <LockIcon />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder={t('auth.passwordPlaceholder')}
                    disabled={loading || !token}
                  />
                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
                    disabled={!token}
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                </span>
              </div>

              <div className="auth-field" style={{ marginTop: '1.5rem' }}>
                <span>{t('auth.confirmNewPasswordLabel')}</span>
                <span className="auth-input-wrap">
                  <LockIcon />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder={t('auth.passwordPlaceholder')}
                    disabled={loading || !token}
                  />
                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    aria-label={showConfirmPassword ? t('auth.hidePassword') : t('auth.showPassword')}
                    disabled={!token}
                  >
                    <EyeIcon open={showConfirmPassword} />
                  </button>
                </span>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block auth-submit-btn"
                style={{ marginTop: '2rem' }}
                disabled={loading || !token}
              >
                {loading ? t('common.loading') : t('auth.saveNewPassword')}
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
