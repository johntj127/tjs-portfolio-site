import React from 'react'
import styles from './CapabilityCards.module.css'

export default function CapabilityCards({ items, onSelect }) {
  return (
    <section className={styles.section} aria-label="Core capabilities">
      {items.map((item, index) => (
        <button
          key={item.id}
          type="button"
          className={styles.card}
          style={{ animationDelay: `${200 + index * 55}ms` }}
          onClick={(event) => onSelect(item.id, event.currentTarget)}
          aria-label={`Open details for ${item.label}`}
          aria-haspopup="dialog"
          aria-controls={`capability-detail-${item.id}`}
        >
          <div className={styles.icon} aria-hidden="true">{item.icon}</div>
          <p className={styles.label}>{item.label}</p>
          <p className={styles.body}>{item.body}</p>
          <span className={styles.hint}>Open detail view</span>
        </button>
      ))}
    </section>
  )
}
