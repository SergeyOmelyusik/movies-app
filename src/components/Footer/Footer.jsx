import style from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={style.footer}>
            <div className={style.footerLogo}>MoviesApp</div>
            <div className={style.copy}>Copyright by SO</div>
        </footer>
    )
}

export default Footer