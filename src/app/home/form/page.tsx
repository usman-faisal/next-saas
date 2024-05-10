'use client';

import { useEffect, useRef, useState } from 'react';

// COMPONENTS
import Card from 'components/card';

// ICONS
import FormModal from 'components/modal/FormModal';
import FormCard from 'components/card/FormCard';
import { createForm, updateForm } from 'supabase/dbFunctions';
import { UserForm } from 'types/interfaces';
import useAuthStore from 'store/authStore';
import useFormStore from 'store/formStore';

const Clients = () => {
  const authStore = useAuthStore();
  const formStore = useFormStore();
  const [form, setForm] = useState<UserForm | null>(null);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const onFormSubmit = async (formData: UserForm) => {
    const user = authStore.user;
    if (form) {
      const { error, data } = await updateForm(
        { ...formData, id: formStore.userForm.id },
        user.id,
      );
      if (error) {
        alert('Failed to update form');
        return;
      }
      formStore.setForm(data[0]);
      setForm(data[0]);
      setOpen(false);
      return;
    }
    const { error, data } = await createForm(formData, user.id);
    if (error) {
      console.log(error);
      alert('Failed to submit form');
      return;
    }
    formStore.setForm(data[0]);
    setForm(data[0]);
    setOpen(false);
  };
  useEffect(() => {
    (async () => {
      const user = authStore.user;
      const data = await formStore.getForm(user.id);
      if (!data) {
        console.error("Couldn't fetch forms");
        return;
      }
      setForm(data);
    })();
  }, []);
  useEffect(() => {
    if (form) {
      formStore.setForm(form);
    }
  }, [formStore.userForm]);

  return (
    <div>
      <Card extra="mt-3 h-fit p-8 gap-6">
        <div className=" flex items-center justify-between ">
          <h3 className=" text-2xl font-semibold">Your Form</h3>

          <button
            className="linear w-fit rounded-xl bg-bluePrimary px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            onClick={() => setOpen(true)}
          >
            {form ? 'Edit Form' : 'Create Form'}
          </button>
        </div>
        {form && <FormCard data={form} />}
      </Card>
      <FormModal
        open={open}
        form={form}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
        onFormSubmit={onFormSubmit}
      />
    </div>
  );
};

export default Clients;
