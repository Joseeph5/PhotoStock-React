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
      <div className='photo-info'>
        <div>
          <h4>{name}</h4>
          <p>{likes} likes</p>
        </div>
        <a href={portfolio_url} target='_blank' rel='noreferrer'>
          <img src={medium} alt='profile_image' className='user-img' />
        </a>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'>
        <Modal.Header closeButton className='modal-container'>
          <a href={full} target='_blank' rel='noreferrer'>
            <Button variant='success'>Download</Button>
          </a>
        </Modal.Header>
        <Modal.Body className='modal-container'>
          <div className='modal-img'>
            <img src={regular} alt={alt_description} />
          </div>
        </Modal.Body>
        <Modal.Footer className='modal-container modal-info'>
          <div>
            <a href={portfolio_url} target='_blank' rel='noreferrer'>
              <img src={medium} alt='profile_image' />
            </a>
            <h4>{name}</h4>
            <p>{likes} likes</p>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
