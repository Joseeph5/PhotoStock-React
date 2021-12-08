import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function Photo({
  id,
  urls: { regular, full, raw, small, thumb },
  alt_description,
  likes,
  user: {
    name,
    portfolio_url,
    profile_image: { medium },
  },
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='photo'>
      <img
        src={regular}
        alt={alt_description}
        onClick={() => {
          handleShow();
          console.log('show modal', id);
        }}
      />

      <Modal
        show={show}
        onHide={handleClose}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'>
        <Modal.Header closeButton>
          <a href={full} target='_blank' rel='noreferrer'>
            <Button variant='success'>Download</Button>
          </a>
        </Modal.Header>
        <Modal.Body>
          <div className='modalImg'>
            <img src={regular} alt={alt_description} />
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <div className='photo-info'>
        <div>
          <h4>{name}</h4>
          <p>{likes} likes</p>
        </div>
        <a href={portfolio_url}>
          <img src={medium} alt='' className='user-img' />
        </a>
      </div>
    </div>
  );
}
