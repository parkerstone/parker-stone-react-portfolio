import React, { useState, useEffect } from 'react'

import profilePicture from "../../../static/assets/images/about/IMG_1531.jpg"

const About = () => {
  return (
    <div className='content-page-wrapper'>
      <div className='content-image'
        alt="portfolio-about-picture"
        style={{
          background: `url(${profilePicture}) no-repeat`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      <div className='content-text'>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit corporis porro modi pariatur reiciendis distinctio beatae itaque earum eos accusamus unde, id laudantium tempore eius in at inventore, ut placeat.
Odit aliquid officiis, distinctio quia nihil et accusamus repudiandae quam in quidem quisquam. Modi ea rem libero doloremque at! Modi laboriosam perspiciatis, rerum sapiente animi perferendis tempora quod! Veritatis, nesciunt!
Nemo vitae explicabo saepe ad voluptate cupiditate. Sed, cum blanditiis sapiente neque in velit at. Delectus nihil optio quia soluta vel explicabo, ipsum nam dolorem, sit excepturi consequatur fugit! Nemo?
Nulla blanditiis temporibus quos magnam a harum error quae fuga, autem et fugiat architecto id consequatur, laudantium, omnis facere assumenda ab eaque atque porro. Vero, totam. Suscipit unde ullam possimus!
Perspiciatis esse ad velit tenetur consectetur mollitia laudantium temporibus ducimus? Architecto exercitationem blanditiis atque natus magnam, quibusdam, voluptas labore illum eligendi deserunt iure impedit veniam itaque esse in dolorum commodi!
Quasi accusantium corrupti excepturi corporis cum? Suscipit nulla beatae debitis expedita eligendi, consectetur aperiam quas doloremque perspiciatis sed, velit dolores iste nesciunt cumque illo delectus voluptatem tenetur enim eveniet libero.
A labore modi eveniet dignissimos eius voluptates nulla corporis reiciendis atque quisquam optio, ducimus vel rerum impedit doloribus repellendus saepe asperiores corrupti, officiis sapiente? Voluptas alias beatae quod eveniet. Neque.
Accusamus quae id officiis quas cupiditate eius. Tenetur in et sint! Omnis, laborum ipsa minus porro blanditiis libero quam exercitationem tempore pariatur laudantium. Sapiente dolores quisquam quis sint esse odit?
Voluptas neque perferendis dolorem quod, sit, aliquid, quos asperiores repudiandae qui ex distinctio. Repudiandae expedita, impedit dignissimos eveniet ea velit? Eos ad assumenda dolorem voluptate, odit ab officia commodi et.
Minus neque minima aliquam quidem voluptatum doloremque officia doloribus fuga veritatis assumenda, quod possimus. Hic consequuntur ut aut delectus velit maxime veritatis, tempore ipsum distinctio animi magni laudantium dolore in.</p>
      </div>
    </div>
  )
}

export default About