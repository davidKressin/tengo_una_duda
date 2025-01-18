import React, { useEffect, useRef, useState } from 'react';

export const Modal = ({ action, content, isOpen, type }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            $(modalRef.current).modal('show');
        } else {
            $(modalRef.current).modal('hide');
        }
    }, [isOpen]);

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const step = getCookie('step');
    const stepDescription = getCookie('stepDescription');
    const viewData = getCookie('viewData');

    console.log({ step, stepDescription, viewData });


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
                        {type == "success"

                            ? (<div className="modal-body p-5 text-center">
                                <div className="p-4">
                                    <i className="fa-solid text-success fs-1 fa-paper-plane"></i>
                                </div>
                                <h4>Tu duda ha sido enviada!</h4>
                                <p>En unos minutos recibirás la respuesta por correo.</p>
                            </div>)
                            : (<div className="modal-body p-5 text-center">
                                <div className="p-4">
                                    {/* <i className="fa-solid text-success fs-1 fa-paper-plane"></i> */}
                                    <i className="fa-solid text-danger fs-1 fa-triangle-exclamation"></i>
                                </div>
                                <h4>Tu duda no ha sido enviada.</h4>
                                {
                                    !!step 
                                    ? (<p>{step}</p>)
                                    : <p>Hubo un problema con el pago. <br />El banco ha rechazado la transacción.</p>
                                }
                            </div>)

                        }

                    </div>
                </div>
            </div>
        </div>
    );
};