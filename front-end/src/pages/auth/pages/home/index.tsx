import GuestCard from '../../components/GuestCard';
import NavBar from '../../components/Navbar';
import './styles.scss';

export default function HomeAdmin() {
  return (
    <div className='home-container'>
      <NavBar/>
      <div className='home-guests'>
        <GuestCard/>
        <GuestCard/>
        <GuestCard/>
        <GuestCard/>
        <GuestCard/>
      </div>
    </div>
  )
}