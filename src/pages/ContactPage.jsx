import React, { useRef } from 'react'
import "../styles/Page__ContactStyles.css"

const ContactPage = () => {
  const refColor_name = useRef(null);
  const refColor_address = useRef(null);
  const refColor_oppen = useRef(null);
  const refColor_phone = useRef(null);
  const refColor_name2 = useRef(null);
  const refColor_address2 = useRef(null);
  const refColor_oppen2 = useRef(null);
  const refColor_phone2 = useRef(null);
  const refBackgroundColor_address = useRef(null);
  const refBackgroundColor_address2 = useRef(null);
  const refMap = useRef("https://yandex.ru/map-widget/v1/?um=constructor%3A8547baaeda89106d2a116e43fdc7404c77e33be24502570a0c537f4fece01986&amp;source=constructor")
  const refMap2 = useRef("https://yandex.ru/map-widget/v1/?um=constructor%3Ad601fd557468c5c328ff3616484f50c05eb9bb7248d255194845ff47ccbcfb14&amp;source=constructor")
  // const refMap_one = useRef("")
  const handlerAddress = () => {
    refColor_name.current.style.color = "#66fcf1";
    refColor_address.current.style.color = "#66fcf1";
    refColor_oppen.current.style.color = "#66fcf1";
    refColor_phone.current.style.color = "#66fcf1";
    refColor_name2.current.style.color = "#e1e3e6";
    refColor_address2.current.style.color = "#e1e3e6";
    refColor_oppen2.current.style.color = "#e1e3e6";
    refColor_phone2.current.style.color = "#e1e3e6";
    refMap.current.style.display = "block"
    refMap2.current.style.display = "none"
    refBackgroundColor_address.current.style.backgroundColor = "#bebebe99"
    refBackgroundColor_address2.current.style.backgroundColor = "#363738"
    

  }
  const handlerAddress2 = () => {
    refColor_name2.current.style.color = "#66fcf1";
    refColor_address2.current.style.color = "#66fcf1";
    refColor_oppen2.current.style.color = "#66fcf1";
    refColor_phone2.current.style.color = "#66fcf1";
    refColor_name.current.style.color = "#e1e3e6";
    refColor_address.current.style.color = "#e1e3e6";
    refColor_oppen.current.style.color = "#e1e3e6";
    refColor_phone.current.style.color = "#e1e3e6";
    refMap2.current.style.display = "block"
    refMap.current.style.display = "none"
    refBackgroundColor_address.current.style.backgroundColor = "#363738"
    refBackgroundColor_address2.current.style.backgroundColor = "#bebebe99"
  }
  return (
    <>
      <div className='contact-сontent'>
        <div className= "contact__item map-div" >
            <iframe className = "map mapAddress" ref={refMap} title="iframeMapTitle" src="https://yandex.ru/map-widget/v1/?um=constructor%3A8547baaeda89106d2a116e43fdc7404c77e33be24502570a0c537f4fece01986&amp;source=constructor" width="100%" height="100%" ></iframe>      
            <iframe className = "map mapAddress2" ref={refMap2} title="iframeMapTitle2" src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad601fd557468c5c328ff3616484f50c05eb9bb7248d255194845ff47ccbcfb14&amp;source=constructor" width="100%" height="100%" ></iframe>
        
        </div>
        <button ref={refBackgroundColor_address} className='contact__item address' onClick={handlerAddress} >г. Новосибирск, <br/> ул.Гурьевская 51.</button>
        <div className='contact__item address-information'>
          <ul className='contact-information__list'>
            <li><div className='name__studio'><i ref={refColor_name} className="fa-solid fa-house"></i>Студия маникюра iSla</div></li>
            <li><div className='address__studio'><i ref={refColor_address} className="fa-solid fa-location-dot"></i>Адрес: г. Новосибирск, ул. Гурьевская 51, этаж 1, офис 1.</div></li>
            <li><div className='oppening__hours'><i  ref={refColor_oppen} className="fa-solid fa-clock"></i>Часы работы: ежедневно 09:00 - 20:00</div></li>
            <li><div className='phone__number'><i  ref={refColor_phone} className="fa-solid fa-phone"></i>Номер телефона: +7(999)-451-22-07</div></li>
          </ul>
        </div>

        <button ref={refBackgroundColor_address2} className='contact__item address2' onClick={handlerAddress2}>г. Новосибирск, <br/> ул. Бориса -<br/> Богаткова 219.</button>
        <div className='contact__item address-information2'>
          <ul className='contact-information__list'>
            <li><div  className='name__studio'><i ref={refColor_name2} className="fa-solid fa-house"></i>Студия маникюра iSla</div></li>
            <li><div className='address__studio'><i ref={refColor_address2} className="fa-solid fa-location-dot"></i>Адрес: г. Новосибирск, ул. Бориса Богаткова 219, этаж 1, офис 1.</div></li>
            <li><div className='oppening__hours'><i ref={refColor_oppen2} className="fa-solid fa-clock"></i>Часы работы: ежедневно 09:00 - 20:00</div></li>
            <li><div className='phone__number'><i ref={refColor_phone2} className="fa-solid fa-phone"></i>Номер телефона: +7(999)-451-22-07</div></li>
          </ul>
        </div>

      
      </div>
</>
    
  )
}

export default ContactPage
