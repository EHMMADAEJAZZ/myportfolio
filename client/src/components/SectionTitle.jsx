
const SectionTitle = ({title}) => {
  return (
    <div className="flex items-center gap-10">
        <h1 className="text-xl sm:text-2xl text-secondary text-nowrap font-semibold">{title}</h1>
        <div className="w-60 h-[1px] bg-tertiary"></div>
    </div>
  )
}

export default SectionTitle