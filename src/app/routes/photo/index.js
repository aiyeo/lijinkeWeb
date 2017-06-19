import React from 'react'
import RotatePhoto from "shared/components/RotatePhoto"
import Message from "shared/components/Message"
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css";
import "./styles.less"

const images = [
  {
    original: require('images/my_2.jpg'),
    thumbnail: require('images/my_2.jpg'),
    description: "成都带不走的只有你"
  },
  {
    original: require('images/photo6.jpg'),
    thumbnail: require('images/photo6.jpg'),
    description: "肌肉大狗狗"
  },
  {
    original: require('images/my_1.jpg'),
    thumbnail: require('images/my_1.jpg'),
    description: "音乐节玩累了"
  },
  {
    original: require('images/my_3.jpg'),
    thumbnail: require('images/my_3.jpg'),
    description: "网易云音乐玩玩"
  },

  {
    original: require('images/photo5.jpg'),
    thumbnail: require('images/photo5.jpg'),
    description: "傻逼儿子"
  },
  {
    original: require('images/photo1.jpg'),
    thumbnail: require('images/photo1.jpg'),
    description: "肌肉小狗"
  }, {
    original: require('images/photo3.jpg'),
    thumbnail: require('images/photo3.jpg'),
    description: "拉尿的狗狗"
  }, {
    original: require('images/photo4.jpg'),
    thumbnail: require('images/photo4.jpg'),
    description: "哈哈哈"
  }, {
    original: require('images/she_1.jpg'),
    thumbnail: require('images/she_1.jpg'),
    description: "小仙女"
  },
  {
    original: require('images/my_4.jpg'),
    thumbnail: require('images/my_4.jpg'),
    description: "手动滑稽"
  },
   {
    original: require('images/photo9.jpg'),
    thumbnail: require('images/photo9.jpg'),
    description: "激战中"
  },
  {
    original: require('images/head-img.jpg'),
    thumbnail: require('images/head-img.jpg'),
    description: "哈哈"
  },
]

// photoCovers.map((v, i) => {
//   i += 1;
//   let my = photoCovers.find((v) => v.id == i)
//   v.name = `photo${i}`,
//     v.src = `images/photo${i}`
//   if (my) {
//     v.title = my.title
//     v.content = my.content
//   } else {
//     v.title = `title${i}`
//     v.content = `content${i}`
//   }
// })
export default class Photo extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div key="photo" className="photo-controller">
        <ImageGallery
          items={images}
          slideInterval={2000}
          lazyLoad={true}
          showPlayButton={false}
          onImageError={() => Message.error('帅照加载失败')}
          showIndex={true}
          showBullets={true}
        />
      </div>
    )
  }
}