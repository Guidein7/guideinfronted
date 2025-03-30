import GuideinLogo from '../../assets/GuideinLogo.png'
export default function ProductNav() {

    return(
        <nav className="bg-[#C8C9EA] w-100 flex items-center px-2 h-[60px] w-full fixed z-10  ">
            <div className=''>
                <img src={GuideinLogo} alt='logo'  className='h-8' />
            </div>

        </nav>
    )

}