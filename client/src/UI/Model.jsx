
const Model = ({children,onClose,title,className}) => {
  return (
    <div className="w-screen h-screen fixed z-50 top-0 sm:top-0 bottom-0 left-0 right-0 bg-neutral-500 bg-opacity-50 backdrop-blur flex items-center justify-center">
        <div className={`w-full max-w-lg  max-sm:py-10 px-5 sm:p-10 rounded ${className} bg-black/70`}>
        <div className="w-full flex justify-between items-center my-2">
            <h2 className="text-lg text-secondary font-semibold capitalize">{title}</h2>
            <button onClick={onClose} className="text-xl font-extraligh text-red-700 border-2 rounded-full h-8 w-8 border-red-700 "><i className="ri-close-large-line text-xl font-extralight hover:text-red-600  "></i></button>
        </div>
        <div className="max-h-[60vh] w-full overflow-hidden overflow-y-scroll scrollbar-none">
            {children}
        </div>
        </div>
    </div>
  )
}

export default Model