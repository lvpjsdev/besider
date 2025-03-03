import { FC, type ReactNode } from 'react';
import { slide as MenuComponent, Styles } from 'react-burger-menu';
import hamburger from '../../../assets/hamburger.svg';
import cross from '../../../assets/cross.svg';

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

export const Menu: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <MenuComponent
      width={'100%'}
      styles={styles}
      customBurgerIcon={<img height={20} width={16} src={hamburger} />}
      customCrossIcon={<img height={20} width={20} src={cross} />}
    >
      {children}
    </MenuComponent>
  );
};
