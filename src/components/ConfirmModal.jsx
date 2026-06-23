import { motion, AnimatePresence } from 'framer-motion'
import ComicButton from './ComicButton'

export default function ConfirmModal({ isOpen, title = 'KONFIRMASI', message, onConfirm, onCancel, confirmText = 'YA', cancelText = 'BATAL', confirmVariant = 'green' }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            onClick={onCancel}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="comic-panel bg-white p-6 md:p-8 max-w-sm w-full relative z-10 text-center"
          >
            <h3 className="font-display text-2xl tracking-wide text-ink mb-4">{title}</h3>
            <p className="font-mono text-sm text-ink/80 mb-8 leading-relaxed">
              {message}
            </p>
            <div className="flex items-center justify-center gap-4">
              <ComicButton onClick={onCancel} variant="red">
                {cancelText}
              </ComicButton>
              <ComicButton onClick={onConfirm} variant={confirmVariant}>
                {confirmText}
              </ComicButton>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
