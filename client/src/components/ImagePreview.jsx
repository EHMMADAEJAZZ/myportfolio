
const ImagePreview = ({imageUrl}) => {
  return (
    <div className="w-full rounded">
        <img src={imageUrl} alt="Preview" style={{maxWidth: '100%', height: '100%' }} className="rounded object-scale-down" />
      <br />
    </div>
  )
}

export default ImagePreview