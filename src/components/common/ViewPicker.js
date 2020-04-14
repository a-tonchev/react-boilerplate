import React, { useContext } from 'react';
import {
  Icon, IconButton,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { viewTypes } from '../../config/ItemConfig';
import { ItemContext } from '../../contexts/ItemContext';

const ViewPicker = () => {
  const { itemsData, dispatchItemsData } = useContext(ItemContext);
  const { view } = itemsData;
  const { t } = useTranslation();

  return (
    <>
      {viewTypes.map(vt => (
        <IconButton
          key={vt.name}
          aria-label={t(vt.translation)}
          onClick={() => {
            if (vt.name !== view) {
              dispatchItemsData({
                view: vt.name,
                type: 'CHANGE_VIEW',
              });
            }
          }}
        >
          <Icon color={view === vt.name ? 'primary' : 'action'}>{vt.icon}</Icon>
        </IconButton>
      ))}
    </>
  );
};

export default ViewPicker;
