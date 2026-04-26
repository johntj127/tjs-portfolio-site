import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import styles from './CapabilityDetailModal.module.css'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

export default function CapabilityDetailModal({ capability, onClose, restoreFocusTo }) {
  const closeButtonRef = useRef(null)
  const dialogRef = useRef(null)

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) {
        return
      }

      const focusable = Array.from(dialogRef.current.querySelectorAll(FOCUSABLE_SELECTOR))
        .filter((element) => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true')

      if (focusable.length === 0) {
        event.preventDefault()
        closeButtonRef.current?.focus()
        return
      }

      const firstElement = focusable[0]
      const lastElement = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    const previousOverflow = document.body.style.overflow
    const appRoot = document.getElementById('root')
    const previousAriaHidden = appRoot?.getAttribute('aria-hidden')
    const previousInert = appRoot?.inert

    document.body.style.overflow = 'hidden'
    if (appRoot) {
      appRoot.setAttribute('aria-hidden', 'true')
      appRoot.inert = true
    }
    window.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      if (appRoot) {
        if (previousAriaHidden === null) {
          appRoot.removeAttribute('aria-hidden')
        } else {
          appRoot.setAttribute('aria-hidden', previousAriaHidden)
        }
        appRoot.inert = previousInert ?? false
      }
      if (restoreFocusTo && typeof restoreFocusTo.focus === 'function') {
        window.requestAnimationFrame(() => restoreFocusTo.focus())
      }
    }
  }, [onClose, restoreFocusTo])

  if (!capability) return null

  const modal = (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="presentation"
    >
      <div
        id={`capability-detail-${capability.id}`}
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`capability-title-${capability.id}`}
        aria-describedby={`capability-translation-${capability.id}`}
        onClick={event => event.stopPropagation()}
      >
        <div className={styles.header}>
          <div className={styles.titleWrap}>
            <p className={styles.kicker}>Game Production Translation</p>
            <h2 id={`capability-title-${capability.id}`} className={styles.title}>
              {capability.label}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label={`Close details for ${capability.label}`}
          >
            ✕
          </button>
        </div>

        <div className={styles.body}>
          <p id={`capability-translation-${capability.id}`} className={styles.translation}>
            {capability.translation}
          </p>

          <div className={styles.grid}>
            <section>
              <h3 className={styles.sectionTitle}>What this means in practice</h3>
              <ul className={styles.list}>
                {capability.practice.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className={styles.sectionTitle}>Relevant proof points / projects</h3>
              <ul className={styles.list}>
                {capability.proofPoints.map((item) => (
                  <li key={item.label}>
                    {item.to ? (
                      <Link to={item.to} className={styles.projectLink} onClick={onClose}>
                        {item.label}
                      </Link>
                    ) : item.label}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {capability.cta && (
            <div className={styles.footer}>
              <Link to={capability.cta.to} className={styles.cta} onClick={onClose}>
                {capability.cta.label}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}
