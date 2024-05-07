import React, { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

interface FilterProps {
  setOpen: any;
  open: boolean;
  options: any[];
  title: string;
}

const Filter: React.FC<FilterProps> = ({ open, setOpen, options, title }) => {
  const [selectedField, setSelectField] = useState<string>('');
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof HTMLElement &&
        !event.target.closest(`.${title.replace(' ', '')}`)
      ) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="  flex w-fit flex-col gap-2">
      <h3 className=" text-base font-medium uppercase">{title}</h3>
      <div className="relative">
        <div
          className={` ${title} flex w-[300px] min-w-[280px] items-center gap-2 rounded-md bg-bluePrimary px-3 py-2`}
          onClick={() => setOpen((prev) => !prev)}
        >
          <p className="  flex-1 text-xs font-semibold text-white md:text-[14px]">
            {selectedField || 'ALL'}
          </p>
          <IoIosArrowDown className=" text-xl text-white" />
        </div>
        {open && (
          <div
            className={` absolute right-0 top-10 z-50 h-fit max-h-[150px] w-[300px] min-w-[280px] overflow-y-scroll rounded-lg border bg-white py-1 ${title.replace(' ', '')}`}
          >
            {options.map((val, i) => (
              <p
                key={i}
                className=" relative flex cursor-pointer items-center px-2 py-1 text-xs hover:bg-gray-200 md:text-sm "
                onClick={() => {
                  setSelectField(val.name);
                  setOpen(false);
                }}
              >
                <span className=" ml-2">{val.name}</span>
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
