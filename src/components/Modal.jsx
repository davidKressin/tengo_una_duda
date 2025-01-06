import React, { useEffect, useRef, useState } from 'react';

export const Modal = ({action,content, isOpen }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            $(modalRef.current).modal('show');
        } else {
            $(modalRef.current).modal('hide');
        }                                                                                                                                               
    }, [isOpen]);



    return (
        <div className="container mt-5">
            <div
                className="modal fade"
                id={"id"}
                tabIndex="-1"                       
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                ref={modalRef}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h2 className="modal-title" id="exampleModalLabel">{"title"}</h2>
                            <button
                                type="button"
                                className="close"
                                aria-label="Close"
                                onClick={()=>{}}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Holaa</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn m-1 btn-secondary" onClick={()=>{}}>Cerrar</button>
                            <button 
                              type="button" 
                              className={`btn m-1 custom-button`} 
                              onClick={() => {
                              }}>
                              {action}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};