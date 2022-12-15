import React from "react";
import "./Footer.css";
import githubLogo from '../../pictures/github_logo.png';
import linkedInLogo from '../../pictures/linkedIn_logo.png';


export default function Footer() {
  return (
    <div className="footer-div grid-footer">
      <span>Developers: </span>

      <div className="footer-individual-div">
        <span>Nan Guo</span>
        <a style={{ 'height': '25px' }} href='/' target="_blank" rel="noopener noreferrer">
          <img src={linkedInLogo} alt='linkedin' style={{ 'height': '25px' }}></img>
        </a>
        <a style={{ 'height': '24px' }} href='https://github.com/Alicenanguo' target="_blank" rel="noopener noreferrer">
          <i class="fa-brands fa-github" style={{ 'fontSize': '24px', 'background': 'white', 'borderRadius': '2px' }}></i>
        </a>
      </div>

      <div className="footer-individual-div">
        <span>Wanting Lu</span>
        <a style={{ 'height': '25px' }} href='https://www.linkedin.com/in/wantinglu/' target="_blank" rel="noopener noreferrer">
          <img src={linkedInLogo} alt='linkedin' style={{ 'height': '25px' }}></img>
        </a>
        <a style={{ 'height': '24px' }} href='https://github.com/Winnie-1201' target="_blank" rel="noopener noreferrer">
          <i class="fa-brands fa-github" style={{ 'fontSize': '24px', 'background': 'white', 'borderRadius': '2px' }}></i>
        </a>
      </div>

      <div className="footer-individual-div">
        <span>Xuelan Wu</span>
        <a style={{ 'height': '25px' }} href='https://www.linkedin.com/in/xuelan-wu-ba354a1b0/' target="_blank" rel="noopener noreferrer">
          <img src={linkedInLogo} alt='linkedin' style={{ 'height': '25px' }}></img>
        </a>
        <a style={{ 'height': '24px' }} href='https://github.com/xuelanwu' target="_blank" rel="noopener noreferrer">
          <i class="fa-brands fa-github" style={{ 'fontSize': '24px', 'background': 'white', 'borderRadius': '2px' }}></i>
        </a>
      </div>

      <div className="footer-individual-div">
        <span>Yizhou Zhang</span>
        <a style={{ 'height': '25px' }} href='https://www.linkedin.com/in/yizhoucatherinezhang/' target="_blank" rel="noopener noreferrer">
          <img src={linkedInLogo} alt='linkedin' style={{'height':'25px'}}></img>
        </a>
        <a style={{ 'height': '24px' }} href='https://github.com/OneBoatFly' target="_blank" rel="noopener noreferrer">
          <i class="fa-brands fa-github" style={{ 'fontSize': '24px', 'background':'white', 'borderRadius':'2px' }}></i>
        </a>
      </div>
    </div>
  );
}
