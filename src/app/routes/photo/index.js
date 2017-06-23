import React from 'react'
import RotatePhoto from "shared/components/RotatePhoto"
import Message from "shared/components/Message"
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css";
import "./styles.less"

const images = [
  {
    original: require('images/my_2.jpg'),
    thumbnail: require('images/my_2_s.jpg'),
    description: "成都带不走的只有你"
  },
  {
    original: require('images/photo6.jpg'),
    thumbnail: require('images/photo6_s.jpg'),
    description: "肌肉大狗狗"
  },
  {
    original: require('images/my_1.jpg'),
    thumbnail: require('images/my_1_s.jpg'),
    description: "音乐节玩累了"
  },
  {
    original: require('images/my_3.jpg'),
    thumbnail: require('images/my_3_s.jpg'),
    description: "网易云音乐玩玩"
  },

  {
    original: require('images/photo5.jpg'),
    thumbnail: require('images/photo5_s.jpg'),
    description: "傻逼儿子"
  },
  {
    original: require('images/photo1.jpg'),
    thumbnail: require('images/photo1_s.jpg'),
    description: "肌肉小狗"
  }, {
    original: require('images/photo3.jpg'),
    thumbnail: require('images/photo3_s.jpg'),
    description: "拉尿的狗狗"
  }, {
    original: require('images/photo4.jpg'),
    thumbnail: require('images/photo4_s.jpg'),
    description: "哈哈哈"
  }, {
    original: require('images/she_1.jpg'),
    thumbnail: require('images/she_1_s.jpg'),
    description: "小仙女"
  },
  {
    original: require('images/my_4.jpg'),
    thumbnail: require('images/my_4_s.jpg'),
    description: "手动滑稽"
  },
   {
    original: require('images/photo9.jpg'),
    thumbnail: require('images/photo9_s.jpg'),
    description: "激战中"
  },
  {
    original: require('images/head_img.jpg'),
    thumbnail: require('images/head_img_s.jpg'),
    description: "哈哈"
  },{
    original: require('images/github.png'),
    thumbnail: require('images/github_s.jpg'),
    description: "第一次到webpack提issue"
  }
]


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