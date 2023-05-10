'use client';

import { IconType } from 'react-icons';

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick
}) => {
  return <button
    className="
      inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 
      ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2
      focus-visible:outline-offset-2 focus-visible:outline-sky-600
    "
    type="button"
    onClick={onClick}
  >
    <Icon />
  </button>
}

export default AuthSocialButton;