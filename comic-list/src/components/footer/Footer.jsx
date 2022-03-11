import './Footer.css'
import facebook from '../../asset/Socials/facebook.png'
import github from '../../asset/Socials/github.png'
import instagram  from '../../asset/Socials/instagram.png'
import twitter from '../../asset/Socials/twitter.png'
import youtube from '../../asset/Socials/youtube.png'


export default function Footer() {
    return (
        <footer>
            <div className="socials-section">
                <a href="http://www.facebook.com" rel="noreferrer" target="_blank"><img src={ facebook } alt="" /></a>
                <a href="http://www.github.com" rel="noreferrer" target="_blank"><img src={ github } alt="" /></a>
                <a href="http://www.instagram.com" rel="noreferrer" target="_blank"><img src={ instagram } alt="" /></a>
                <a href="http://www.twitter.com" rel="noreferrer" target="_blank"><img src={ twitter } alt="" /></a>
                <a href="http://www.youtube.com" rel="noreferrer" target="_blank"><img src={ youtube } alt="" /></a>
            </div>
            <p className='copyright'>Comic List © All Rights Reserved</p>
        </footer>
    )
}