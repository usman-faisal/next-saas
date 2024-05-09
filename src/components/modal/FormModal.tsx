import Image from 'next/image';
import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import InputField from 'components/fields/InputField';
import { UserForm } from 'types/interfaces';
import useFormStore from 'store/formStore';

interface FormModal {
  open: boolean;
  setOpen: any;
  cancelButtonRef: any;
  onFormSubmit: (formState: any) => {};
  form: UserForm;
}

const FormModal: React.FC<FormModal> = ({
  open,
  setOpen,
  cancelButtonRef,
  onFormSubmit,
}) => {
  const form = useFormStore().userForm;
  const [formData, setFormData] = useState({
    institution: '',
    location: '',
    specialty: '',
    year: '',
  });
  const [formErrors, setFormErrors] = useState({
    institution: '',
    location: '',
    specialty: '',
    year: '',
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const valid = await validateForm();
    if (valid) {
      onFormSubmit(formData);
    }
  };

  const validateForm = async () => {
    let tempErrors = { ...formErrors };
    let valid = true;
    Object.keys(formData).map((key) => {
      if (!formData[key]) {
        tempErrors = { ...formErrors, [key]: 'Field is required' };
        valid = false;
      }
    });

    setFormErrors(tempErrors);
    return valid;
  };
  useEffect(() => {
    if (form) {
      setFormData({
        institution: form.institution,
        location: form.location,
        specialty: form.specialty,
        year: form.year,
      });
    }
  }, [form]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[5000000]"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity dark:bg-navy-700 dark:bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`relative w-[500px] transform  overflow-hidden rounded-lg bg-white p-8 text-left shadow-xl transition-all dark:bg-navy-700`}
              >
                <form onSubmit={handleSubmit}>
                  <div className="mb-5">
                    <InputField
                      id="institution"
                      type="text"
                      name="institution"
                      placeholder="Enter your institution"
                      label="Institution"
                      value={formData.institution}
                      onChange={handleInputChange}
                      state={formErrors.institution ? 'error' : ''}
                    />
                  </div>
                  <div className="mb-5">
                    <InputField
                      id="location"
                      label="Location"
                      type="text"
                      name="location"
                      value={formData.location}
                      placeholder="Enter your location"
                      onChange={handleInputChange}
                      state={formErrors.location ? 'error' : ''}
                    />
                  </div>
                  <div className="mb-5">
                    <InputField
                      id="specialty"
                      label="Specialty"
                      type="text"
                      name="specialty"
                      value={formData.specialty}
                      placeholder="Enter your specialty"
                      onChange={handleInputChange}
                      state={formErrors.specialty ? 'error' : ''}
                    />
                  </div>
                  <div className="mb-5">
                    <InputField
                      id="year"
                      label="Year Of Education"
                      type="text"
                      name="year"
                      value={formData.year}
                      placeholder="Enter your year of education"
                      onChange={handleInputChange}
                      state={formErrors.year ? 'error' : ''}
                    />
                  </div>
                  <div className="mb-3">
                    <button
                      type="submit"
                      className="linear w-full rounded-xl bg-bluePrimary py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default FormModal;
