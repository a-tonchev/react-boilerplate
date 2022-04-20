import { useState, useMemo } from 'react';
import { Modal, Paper } from '@mui/material';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import useClasses from '@/components/layout/hooks/useClasses';

const GalleryModal = ({ items }) => {
  const [open, setOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const styles = useMemo(() => ({
    button: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
    },
    thumbnail: {
      height: 150,
    },
    modal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '80%',
      padding: '20px',

      '& .gallery .image-gallery-image': {
        maxHeight: isFullScreen ? '100vh' : 400,
      },
    },
  }), [isFullScreen]);

  const classes = useClasses(styles);

  const images = Object.values(items).map(item => ({
    original: item,
    thumbnail: item,
  }));

  return (
    <>
      <button className={classes.button} type="button" onClick={() => setOpen(true)}>
        <img src={items.thumbnail} className={classes.thumbnail} alt="thumbnail" />
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Paper className={classes.modal}>
          <ImageGallery
            items={images}
            showPlayButton={false}
            originalHeight="100px"
            additionalClass="gallery"
            onScreenChange={value => setIsFullScreen(value)}
          />
        </Paper>
      </Modal>
    </>
  );
};

export default GalleryModal;
