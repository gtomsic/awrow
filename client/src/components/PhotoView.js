import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const PhotoView = ({ isOpen, onCloseModal, photos, index }) => {
  let [currentIndex, setCurrentIndex] = useState(0);
  const baseURL = useSelector((state) => state.baseURL);
  const imageUrl = `${baseURL}/${
    photos?.length > 0 && photos[currentIndex].images
  }`;
  const imageAlt = `${photos?.length > 0 && photos[currentIndex].createdAt}`;

  useEffect(() => {
    setCurrentIndex(Number(index));
  }, [index]);

  const previousButtonHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentIndex === 0) {
      setCurrentIndex(Number(photos.length - 1));
      return;
    } else {
      setCurrentIndex((currentIndex = currentIndex - 1));
    }
  };

  const nextButtonHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentIndex === Number(photos.length - 1)) {
      setCurrentIndex(0);
      return;
    } else {
      setCurrentIndex((currentIndex = currentIndex + 1));
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto bg-white bg-opacity-80"
          onClose={onCloseModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block h-[60vh] w-[90vw] md:h-[90vh] md:w-[90vw] p-2 md:p-6 overflow-hidden text-left align-middle transition-all transform bg-light shadow-md rounded-lg ">
                <div className="relative h-full w-full flex justify-center items-center">
                  <img src={imageUrl} alt={imageAlt} className="max-h-full" />
                </div>
                <button
                  onClick={previousButtonHandler}
                  className="text-3xl text-gray-light drop-shadow-lg absolute p-6 cursor-pointer top-[46%] outline-none left-3"
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button
                  onClick={nextButtonHandler}
                  className="text-3xl text-gray-light drop-shadow-lg absolute p-6 cursor-pointer top-[46%] outline-none right-3"
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
                <button
                  onClick={() => onCloseModal()}
                  className="absolute top-3 right-3 text-3xl text-gray text-opacity-50 p-3"
                >
                  <i className="fa-solid fa-rectangle-xmark"></i>
                </button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PhotoView;
