const SideBar = () => {
  return (
    <aside className='fixed bottom-0  min-[320px]:bottom-5 lg:bottom-0 max-lg:right-0 lg:left-0 z-50 px-5 '>
      <nav className='flex flex-col items-center'>
        <div className='flex lg:flex-col gap-3'>
          <a href='https://www.facebook.com/ehmmad.aejazz' target='_blank'>
            <i className='ri-facebook-circle-line text-gray-600 ' />
          </a>
          <a href='mailto:ehmmadaejazz33@gmail.com'>
            <i className='ri-mail-line text-gray-600 ' />
          </a>
          <a href='https://www.instagram.com/ehmmad_aejazz' target='_blank'>
            <i className='ri-instagram-line text-gray-600 ' />
          </a>

          <a
            href='https://www.linkedin.com/in/aijaz-ahmad-b23a39150'
            target='_blank'
          >
            <i className='ri-linkedin-box-line text-gray-600 ' />
          </a>
          <a
            href='https://github.com/EHMMADAEJAZZ'
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='ri-github-line text-gray-600 ' />
          </a>
        </div>

        <div className='w-[1px] h-32 bg-[#167e822f] hidden lg:block'></div>
      </nav>
    </aside>
  );
};

export default SideBar;
