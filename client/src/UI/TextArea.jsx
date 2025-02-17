
const TextArea = ({label,placeholder='message',name,id,value,disabled,cols,rows,required,onChange=()=>{},className}) => {
  return (
    <div className={`w-full flex flex-col gap-1 ${className}`}>
        <label  className="block text-xs  font-semibold text-tertiary tracking-widest capitalize" htmlFor={id}>{label}</label>
        <textarea
          id={id}
          name={name}
          value={value}
          disabled={disabled}
          cols={cols}
          rows={rows}
          required={required}
          placeholder={placeholder}
          onChange={onChange}
          className={`mt-1 outline-none block w-full border border-tertiary rounded-md shadow-gray-300/40 shadow-md  px-3 py-3 max-lg:text-xs text-sm text-white font-medium bg-transparent resize-none focus-within:shadow-secondary transition-all ease-in-out duration-200 focus-within:border-secondary`}
        />
  
    </div>
  )
}

export default TextArea