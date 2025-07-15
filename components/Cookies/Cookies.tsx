"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
import Link from "next/link";

export default function Cookies() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasConsented = localStorage.getItem("cookieConsent");
    if (!hasConsented) {
      setIsOpen(true);
    } else {
      setCookiePreferences(JSON.parse(hasConsented));
    }
  }, []);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      modalRef.current.addEventListener("keydown", handleKeyDown);
      firstElement?.focus();

      return () =>
        modalRef.current?.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setShowSettings(false);
    }, 300);
  };

  const handleAcceptAll = () => {
    const preferences = { essential: true, analytics: true, marketing: true };
    localStorage.setItem("cookieConsent", JSON.stringify(preferences));
    setCookiePreferences(preferences);
    handleClose();
  };

  const handleRejectNonEssential = () => {
    const preferences = { essential: true, analytics: false, marketing: false };
    localStorage.setItem("cookieConsent", JSON.stringify(preferences));
    setCookiePreferences(preferences);
    handleClose();
  };

  const handleSaveSettings = () => {
    localStorage.setItem("cookieConsent", JSON.stringify(cookiePreferences));
    handleClose();
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  if (!isOpen) {
    return (
      <button
        onClick={handleOpen}
        className="blogbtnblue text20"
        style={{ borderRadius: 0 }}
      >
        Открыть настройки куки
      </button>
    );
  }

  return (
    <div
      className={`${styles.cookiesModalWrapper} ${
        isClosing ? styles.closing : ""
      }`}
      aria-hidden={isClosing}
    >
      <div
        className={`${styles.cookiesModal} ${
          isClosing ? styles.closingModal : ""
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-modal-title"
        ref={modalRef}
      >
        <div className={styles.cookiesModal_header}>
          <h2 id="cookie-modal-title">Настройки куки</h2>
          <button
            className="close-btn"
            onClick={handleClose}
            aria-label="Закрыть"
          >
            x
          </button>
        </div>
        <div className="content">
          {showSettings ? (
            <div className={styles.settingsPanel}>
              <h3>Настройте ваши предпочтения</h3>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={cookiePreferences.essential}
                    disabled
                  />
                  Технические, всегда активны
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={cookiePreferences.analytics}
                    onChange={(e) =>
                      setCookiePreferences({
                        ...cookiePreferences,
                        analytics: e.target.checked,
                      })
                    }
                  />
                  Аналитические куки
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={cookiePreferences.marketing}
                    onChange={(e) =>
                      setCookiePreferences({
                        ...cookiePreferences,
                        marketing: e.target.checked,
                      })
                    }
                  />
                  Маркетинговые куки
                </label>
              </div>
              <button
                className={`${styles.accept_all} blogbtnblue text20`}
                onClick={handleSaveSettings}
              >
                Сохранить настройки
              </button>
            </div>
          ) : (
            <>
              <p className="text">
                Мы используем файлы cookie, чтобы улучшить пользовательский
                опыт.{" "}
                <Link href="/polytic" target="_blank" rel="noopener noreferrer">
                  Узнать больше
                </Link>
              </p>
              <div className={styles.cookiesModal_btn}>
                <button
                  className={`${styles.cancel_btn} text20`}
                  onClick={() => setShowSettings(true)}
                >
                  Настроить
                </button>
                <button
                  className={`${styles.accept_all} blogbtnblue text20`}
                  onClick={handleRejectNonEssential}
                >
                  Отклонить необязательные
                </button>
                <button
                  className={`${styles.accept_all} blogbtnblue text20`}
                  onClick={handleAcceptAll}
                >
                  Принять все
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
