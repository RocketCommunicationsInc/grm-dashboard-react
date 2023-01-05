import { useState } from 'react';

const randomId = () => Math.random().toString(36).substring(2, 10);

export const useDisclosure = (options) => {
  const [id] = useState(`disclosure-${randomId()}`);
  const [isOpen, setIsOpen] = useState(options?.defaultIsOpen || false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen((prev) => !prev);

  const getButtonProps = () => ({
    'aria-expanded': isOpen ? 'true' : 'false',
    'aria-controls': id,
    onClick: onToggle,
  });

  const getDisclosureProps = () => ({ hidden: !isOpen, id });

  return {
    getButtonProps,
    getDisclosureProps,
    isOpen,
    onClose,
    onOpen,
    onToggle,
  };
};
