
const InputText = ({label,type='text',placeholder='placeholder',name,id,value,disabled,required,onChange=()=>{},className}) => {
  return (
    <div className={`w-full flex flex-col gap-1 ${className}`}>
        <label htmlFor={id} className="block text-xs  font-semibold tracking-widest text-tertiary capitalize">
          {label ? label:''}
        </label>
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          onChange={onChange}
          className="mt-1 outline-none block w-full border border-tertiary rounded-md shadow-gray-300/40 shadow-md px-3 py-3 max-lg:text-xs text-sm text-white font-medium bg-transparent focus-within:shadow-secondary transition-all ease-in-out duration-200 focus-within:border-secondary"
        />
  
    </div>
  )
}

export default InputText