import React from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'
import BackgroundImage from '../../assets/images/img.png'
import A1 from '../../assets/images/a1.png'
import A2 from '../../assets/images/a2.png'
import A3 from '../../assets/images/a3.png'
import A4 from '../../assets/images/a4.png'
import A5 from '../../assets/images/a5.png'

export default function LandingPage() {

    return (
        <header style={ HeaderStyle }>
            <h1 className="main-title text-center">Project Helper</h1>
            {/*<p className="main-para text-center">Project Helper</p>*/}
            <div className="buttons text-center">
                <Link to="/login">
                    <button className="primary-button">log in</button>
                </Link>
                <Link to="/register">
                    <button className="primary-button" id="reg_btn"><span>register </span></button>
                </Link>
            </div>
        <div className="icon-text-container">
            <div className="icon-text-container" style={iconContainerStyle}>
                <div className="icon-text" style={iconStyle}>
                    <img src={A1} alt="Icon 1" style={iconStyle} />
                    <p>Zhong Li</p>
                </div>
                <div className="icon-text" style={iconStyle}>
                    <img src={A2} alt="Icon 2" style={iconStyle} />
                    <p style={wordStyle}>Hu Tao</p>
                </div>
            </div>
        </div>
            <div className="icon-text-container">
                <div className="icon-text-container" style={iconContainerStyle}>
                    <div className="icon-text" style={iconStyle}>
                        <img src={A5} alt="Icon 1" style={iconStyle} />
                        <p>Sending</p>
                    </div>
                </div>
            </div>
            <div className="icon-text-container">
                <div className="icon-text-container" style={iconContainerStyle}>
                    <div className="icon-text" style={iconStyle}>
                        <img src={A3} alt="Icon 1" style={iconStyle} />
                        <p>Venti</p>
                    </div>
                    <div className="icon-text" style={iconStyle}>
                        <img src={A4} alt="Icon 2" style={iconStyle} />
                        <p style={wordStyle}>Paimon</p>
                    </div>
                </div>
            </div>
        </header>
    )
}

const HeaderStyle = {
    width: "100%",
    height: "100vh",
    background: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    textAlign: "center"
}
const wordStyle = {
}
const iconStyle = {
    width: '220px', // 调整图像宽度
    height: '220px', // 调整图像高度
    margin: '60px 60px 0', // 设置图像之间的间距
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // 让描述文本居中
    textAlign: 'center', // 也可让文本水平居中
    fontSize: '24px', // 增加字体大小
    color: 'lightblue', // 更改颜色为浅蓝色
};

const iconContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
};