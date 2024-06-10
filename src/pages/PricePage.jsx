import React from 'react'
import "../styles/Page__PriceStyles.css"
import image1 from "C:\\alldesktop\\Diplom2copy\\fundamental-react\\src\\image\\price13.jpeg"
import image2 from "C:\\alldesktop\\Diplom2copy\\fundamental-react\\src\\image\\price2.jpg"
import image3 from "C:\\alldesktop\\Diplom2copy\\fundamental-react\\src\\image\\price3.jpg"
import image4 from "C:\\alldesktop\\Diplom2copy\\fundamental-react\\src\\image\\price4.jpeg"
import image5 from "C:\\alldesktop\\Diplom2copy\\fundamental-react\\src\\image\\price5.jpeg"
import image6 from "C:\\alldesktop\\Diplom2copy\\fundamental-react\\src\\image\\price6.jpeg"
import image7 from "C:\\alldesktop\\Diplom2copy\\fundamental-react\\src\\image\\price7.jpeg"
import image8 from "C:\\alldesktop\\Diplom2copy\\fundamental-react\\src\\image\\price8.jpeg"
import image9 from "C:\\alldesktop\\Diplom2copy\\fundamental-react\\src\\image\\price9.jpeg"
import image10 from "C:\\alldesktop\\Diplom2copy\\fundamental-react\\src\\image\\price10.jpeg"
import image11 from "C:\\alldesktop\\Diplom2copy\\fundamental-react\\src\\image\\price11.jpeg"
import image12 from "C:\\alldesktop\\Diplom2copy\\fundamental-react\\src\\image\\price12.jpeg"
const PricePage = () => {
  return (
    <div className='price-content'>
      <h1 className='price-title'>Наши услуги</h1>
      <div className='price-container'>
        <div className='price_item price-item__1'>
          <img src={image1} alt='image1' />
          
        </div>
        <div className='price_item price-item__2'>
          <img src={image2} alt='image2' />
          <div className='item-title'>Базовый комплекс</div>
          <span className='info'>
              Снятие + маникюр + укрепление + покрытие <br/>
              (входит легкий дизайн 2-х ногтей)<br/> <br/>
              Элитный мастер - 3400 р. <br/>
              Топ мастер - 2900 р. <br/>
              Мастер дизайнер - 2500р.
          </span>
        </div>
        <div className='price_item price-item__3'>
          <img src={image3} alt='image3' />
          <div className='item-title'>Наращивание</div>
          <div className='info'> 
          Снятие + маникюр + наращивание + покрытие <br/>
          (входит легкий дизайн 2-х ногтей)<br/> <br/>
              Элитный мастер - 4200 р. <br/>
              Топ мастер - 3300 р. <br/>
              Мастер дизайнер - 2900р. <br/>
              &ensp;+ <br/>
              &ensp; до 5-ки + 1000р<br/>
              &ensp; от 5-ки + 200р за деление 
          </div>
        </div>
        <div className='price_item price-item__4'>
          <img src={image4} alt='image4' />
          <div className='item-title'>Японский маникюр</div>
          <div className='info'> 
          Придание ногтям и коже рук естественного, эстетически безупречного внешнего вида через восстановление и оздоровление, без искусственного укрепления или покрытия, при помощи эффективных компонентов и отточенной техники. <br/><br/>
          Элитный мастер - 4000р.<br/>
          Топ мастер - 3600 р. 
          </div>
        </div>
        <div className='price_item price-item__5'>
          <img src={image5} alt='image5' />
          <div className='item-title'>Дизайн</div>
          <div className='info'>
            Расчитывается индивидуально <br/>
            (в зависимости от количества, совместимости, сложности работы) <br/><br/>
            наклейка, втирка, стразы, рисунок от руки, стемпинг, цепи, фигурки, пирсинг, объемные элементы
          </div>
        </div>
        <div className='price_item price-item__6'>
          <img src={image6} alt='image6' />
          <div className='item-title'>Коррекция наращивания</div>
          <div className='info'>
            Снятие + маникюр + коррекция + покрытие
            (входит легкий дизайн 2-х ногтей)<br/> <br/>
            Элитный мастер - 4000 р. <br/>
              Топ мастер - 3000 р. <br/>
              Мастер дизайнер - 2500р. 
          </div>
        </div>
        <div className='price_item price-item__7'>
          <img src={image7} alt='image7' />
          <div className='item-title'>SPA-уход</div>
          <div className='info'>Профессиональная косметика + пилинг + парафиновая маска с витаминами А и Е для восстановления ваших рук</div>
        </div>
        <div className='price_item price-item__8'>
          <img src={image8} alt='image8' />
          <div className='item-title'>Дополнительно</div>
          <div className='info'>
            Восстановление архитектуры - 500 р.<br/>
            Ремонт, поднятие - 200 р.<br/>
            Снятие без покрытия - 600р
          </div>
        </div>
        <div className='price_item price-item__9'>
          <img src={image9} alt='image9' />
          <div className='item-title'>Title9</div>
          <div className='info'>Информация об услуге 9</div>
        </div>
        <div className='price_item price-item__10'>
          <img src={image10} alt='image10' />
          <div className='item-title'>Title10</div>
          <div className='info'>Информация об услуге 10</div>
        </div>
        <div className='price_item price-item__11'>
          <img src={image11} alt='image11' />
          <div className='item-title'>Title11</div>
          <div className='info'>Информация об услуге 11</div>
        </div>
        <div className='price_item price-item__12'>
          <img src={image12} alt='image12' />
          <div className='item-title'>Title12</div>
          <div className='info'>Информация об услуге 12</div>
        </div>
      </div>
    </div>
  )
}


export default PricePage