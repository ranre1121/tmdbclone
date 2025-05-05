import logo from '../assets/logos/logo.svg'

const Footer = ({}) => {
  const buttons = {
    "The Basics": ['About TMDB', 'Contact Us', 'Support Forums', 'API Documentation','System Status'],
    "Get Involved": ['Contribution Bible', 'Add New Movie', 'Add New TV Show'],
    "Community": ['Guidelines', 'Discussions','Leaderboard'],
    "Legal": ['Terms of Use', 'API Terms of Use', 'Privacy Policy', 'DMCA Policy'],
  }

  return (
    <div className={`bg-primary h-85 flex justify-center gap-10 items-center`}>
      <div className='flex flex-col gap-12'>
        <img src={logo} className='h-25 self-end'/>
        <div className='rounded-md bg-white px-5 py-3 text-sky-500 font-bold text-lg'>JOIN THE COMMUNITY</div>
      </div>
      <div>
      <ul className='flex max-lg:hidden text-white gap-10'>
            {Object.keys(buttons).map(
              button=><div key={button}>
                <li key={button} className="cursor-pointer">
                <p className='font-bold text-2xl'>{button.toUpperCase()}</p>
                <ul>
                  {buttons[button].map((insideButton) => (
                    <li key={insideButton} className='font-semibold font-lg'>
                      {insideButton}
                    </li>
                  ))}</ul></li></div>)}
          </ul>
      </div>
    </div>
  )
}

export default Footer