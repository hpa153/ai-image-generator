import React from 'react'

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}: {
  labelName: string,
  type: string,
  name: string,
  placeholder: string,
  value: string,
  handleChange: React.ChangeEventHandler<HTMLInputElement>,
  isSurpriseMe?: boolean,
  handleSurpriseMe?: React.MouseEventHandler<HTMLButtonElement>,
}) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label htmlFor={name} className='block text-sm font-medium text-gray-900'>{labelName}</label>
        {isSurpriseMe && (
          <button 
            type='button' 
            className='font-semibold text-xs bg-[#ececf1] py-1 px-2 rounded-[5px] text-black'
            onClick={handleSurpriseMe}
          >
            Surprise Me
          </button>
        )}
      </div>
      <input 
        type={type} 
        className='bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none w-full p-3'
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
    </div>
  )
};

export default FormField;
