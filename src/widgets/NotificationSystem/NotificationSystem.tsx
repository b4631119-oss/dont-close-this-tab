import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventBus, AppEvent } from '@/shared/lib/EventBus';

export type NotificationType = 'info' | 'success' | 'warning';

export interface NotificationData {
  title: string;
  description: string;
  type?: NotificationType;
}

interface NotificationItem extends NotificationData {
  id: string;
  type: NotificationType;
  timestamp: number;
}

const MAX_VISIBLE = 3;
const NOTIFICATION_DURATION = 5000;

export const NotificationSystem = React.memo(() => {
  const [queue, setQueue] = useState<NotificationItem[]>([]);
  const [visible, setVisible] = useState<NotificationItem[]>([]);

  const addNotification = useCallback((data: NotificationData) => {
    const newItem: NotificationItem = {
      id: `notif-${Date.now()}-${Math.random()}`,
      type: data.type || 'info',
      title: data.title,
      description: data.description,
      timestamp: Date.now(),
    };

    setQueue((prevQueue) => [...prevQueue, newItem]);
  }, []);

  // Handle Event Bus
  useEffect(() => {
    const handleShowNotification = (data: NotificationData) => addNotification(data);

    eventBus.on(AppEvent.SHOW_NOTIFICATION, handleShowNotification);

    return () => {
      eventBus.off(AppEvent.SHOW_NOTIFICATION, handleShowNotification);
    };
  }, [addNotification]);

  // Process Queue
  useEffect(() => {
    if (queue.length > 0 && visible.length < MAX_VISIBLE) {
      const nextItem = queue[0];
      
      setQueue((prev) => prev.slice(1));
      setVisible((prev) => [...prev, nextItem]);
    }
  }, [queue, visible.length]);

  // Handle Expiration
  useEffect(() => {
    if (visible.length === 0) return;

    const timers = visible.map((item) => {
      const timeAlive = Date.now() - item.timestamp;
      const timeLeft = Math.max(0, NOTIFICATION_DURATION - timeAlive);
      
      return setTimeout(() => {
        setVisible((prev) => prev.filter((v) => v.id !== item.id));
      }, timeLeft);
    });

    return () => timers.forEach(clearTimeout);
  }, [visible]);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="sync">
        {visible.map((item) => (
          <NotificationCard key={item.id} item={item} />
        ))}
      </AnimatePresence>
    </div>
  );
});

NotificationSystem.displayName = 'NotificationSystem';

const NotificationCard = ({ item }: { item: NotificationItem }) => {
  const getStyles = () => {
    switch (item.type) {
      case 'success':
        return 'bg-emerald-900/40 border-emerald-500/30 text-emerald-50';
      case 'warning':
        return 'bg-amber-900/40 border-amber-500/30 text-amber-50';
      default:
        return 'bg-black/60 border-white/10 text-white';
    }
  };
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -20, scale: 0.9, transition: { duration: 0.2 } }}
      className={`w-72 p-4 rounded-xl backdrop-blur-xl border flex gap-4 shadow-2xl pointer-events-auto ${getStyles()}`}
    >
      <div className="flex-shrink-0 mt-1">
        {item.type === 'success' ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        ) : item.type === 'warning' ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        )}
      </div>
      <div className="flex flex-col">
        <span className={`text-xs font-semibold tracking-wider uppercase mb-1 ${item.type === 'success' ? 'text-emerald-400/80' : item.type === 'warning' ? 'text-amber-400/80' : 'text-white/50'}`}>
          {item.type === 'success' ? 'Успех' : item.type === 'warning' ? 'Внимание' : 'Уведомление'}
        </span>
        <span className="font-medium text-sm leading-tight mb-1">
          {item.title}
        </span>
        <span className="text-xs opacity-70 leading-relaxed">
          {item.description}
        </span>
      </div>
    </motion.div>
  );
};
