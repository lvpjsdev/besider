import { FC, useState, type ReactNode } from 'react';
import { slide as MenuComponent, Styles } from 'react-burger-menu';
import hamburger from '../../../assets/hamburger.svg';
import cross from '../../../assets/cross.svg';
import { MenuItem } from './MenuItem';
import { useAppDispatch } from '../../../app/hooks';

const styles: Partial<Styles> = {
  bmBurgerButton: {
    position: 'fixed',
    width: '16px',
    height: '20px',
    left: '20px',
    top: '20px',
  },
  bmCrossButton: {
    height: '20px',
    width: '20px',
  },
  bmOverlay: {
    background: 'var(--bg-color)',
  },
  bmItemList: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'start',
    height: '100%',
  },
};

interface Props {
  labels: string[];
}

export const Menu: FC<Props> = ({ labels }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <MenuComponent
      width={'100%'}
      styles={styles}
      customBurgerIcon={<img height={20} width={16} src={hamburger} />}
      customCrossIcon={<img height={20} width={20} src={cross} />}
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
    >
      {labels.map((label) => (
        <MenuItem key={label} label={label} onClick={closeMenu} />
      ))}
    </MenuComponent>
  );
};
