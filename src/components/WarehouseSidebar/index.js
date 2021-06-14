import React from 'react';
import '../../translations/language';
import './index.css';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Sidebar from './components/app';

const useStyles = makeStyles({
  list: {
    width: 320,
  },
  fullList: {
    width: 'auto',
  },
});

const WarehouseSidebar = () => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    left: false,
  });

  React.useEffect(() => {
    // Listen for changes on the event bus
    const subscriptionRef = window.wioEventBus.subscribe('openWarehouseSideBar', () => {
      setState((prevState) => ({
        ...prevState,
        left: true,
      }));
    });

    return () => {
      // Clean up code
      if (subscriptionRef && typeof subscriptionRef.unsubscribe === 'function') {
        subscriptionRef.unsubscribe();
      }
    };
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown'
      && (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    // window.wioEventBus.publish('openWarehouseSideBar');
    setState({ ...state, [anchor]: open });
  };

  const drawerContent = (anchor) => (
    <div
      style={{
        float: 'left',
      }}
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    >
      <Sidebar setState={setState} />
    </div>
  );

  return (
    <>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            style={{ zIndex: '20012' }}
          >
            {drawerContent(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
};

export default WarehouseSidebar;
