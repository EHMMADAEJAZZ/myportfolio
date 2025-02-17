const ImageInput = ({ label, name, onChange=()=>{}, disabled, id }) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label  className="block text-xs  font-semibold tracking-widest text-tertiary capitalize">{label}</label>}
      <div>
        <input
          type='file'
          id={id}
          name={name}
          onChange={onChange}
          disabled={disabled}
          className="hidden"
          accept="image/*"
        />
        <label htmlFor={id} className="flex flex-col items-center border p-5  border-tertiary rounded-md cursor-pointer gap-2 justify-center">

         <p className="text-tertiary text-xs tracking-wide">uploaded image</p>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          width='48'
          height='48'
          fill='rgba(188,181,181,1)'
          >
          <path d='M12 12.5858L16.2426 16.8284L14.8284 18.2426L13 16.415V22H11V16.413L9.17157 18.2426L7.75736 16.8284L12 12.5858ZM12 2C15.5934 2 18.5544 4.70761 18.9541 8.19395C21.2858 8.83154 23 10.9656 23 13.5C23 16.3688 20.8036 18.7246 18.0006 18.9776L18 17C18 13.6863 15.3137 11 12 11C8.7616 11 6.12243 13.5656 6.00414 16.7751L6 17L6.00039 18.9776C3.19696 18.7252 1 16.3692 1 13.5C1 10.9656 2.71424 8.83154 5.04648 8.19411C5.44561 4.70761 8.40661 2 12 2Z'></path>
        </svg>
            </label>
      </div>
    </div>
  );
};

export default ImageInput;
