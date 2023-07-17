'use client';

import Image from 'next/image';

import Modal from '@/app/components/Modal';

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
  if (!src) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='m2'>
        <div className='w-80 h-80'>
          <Image alt='Image' className='object-contain' fill src={src} />
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
