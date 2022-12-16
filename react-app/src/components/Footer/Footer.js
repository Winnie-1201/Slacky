import React from "react";
import "./Footer.css";
import githubLogo from "../../pictures/github_logo.png";
import linkedInLogo from "../../pictures/linkedIn_logo.png";

export default function Footer() {
  return (
    <div className="footer-div grid-footer">
      <span id="developer_ls">Developers: </span>

      <div className="footer-individual-div">

        <div className='left_box'>
          <span>Nan Guo</span>
        </div>
        <div className='right_box'>
        <a id="linkedin_icon"
          style={{ height: "25px" }}
          href="https://www.linkedin.com/in/nan-guo-a7762325a/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={linkedInLogo}
            alt="linkedin"
            style={{ height: "20px" }}
          ></img>
          </a>
        <a
          style={{ height: "24px" }}
          href="https://github.com/Alicenanguo"
          target="_blank"
          rel="noopener noreferrer"
          >
          <i
            className="fa-brands fa-github"
            style={{
              fontSize: "20px",
              background: "white",
              borderRadius: "2px",

            }}
            ></i>
          </a>
          </div>

      </div>

      <div className="footer-individual-div">
      <div className='left_box'>
          <span>Wanting Lu</span>
        </div>
        <div className='right_box'>
        <a
          style={{ height: "25px" }}
          href="https://www.linkedin.com/in/wantinglu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={linkedInLogo}
            alt="linkedin"
            style={{ height: "20px" }}
          ></img>
        </a>
        <a
          style={{ height: "24px" }}
          href="https://github.com/Winnie-1201"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i
            className="fa-brands fa-github"
            style={{
              fontSize: "20px",
              background: "white",
              borderRadius: "2px",
            }}
          ></i>
        </a>
        </div>
        </div>

      <div className="footer-individual-div">
      <div className='left_box'>
          <span>Xuelan Wu</span>
        </div>
        <div className='right_box'>
        <a
          style={{ height: "25px" }}
          href="https://www.linkedin.com/in/xuelan-wu-ba354a1b0/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={linkedInLogo}
            alt="linkedin"
            style={{ height: "20px" }}
          ></img>
        </a>
        <a
          style={{ height: "24px" }}
          href="https://github.com/xuelanwu"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i
            className="fa-brands fa-github"
            style={{
              fontSize: "20px",
              background: "white",
              borderRadius: "2px",
            }}
          ></i>
        </a>
        </div>
        </div>

      <div className="footer-individual-div">
      <div className='left_box'>
          <span>Yizhou Zhang</span>
          </div>
        <div className='right_box'>
        <a
          style={{ height: "25px" }}
          href="https://www.linkedin.com/in/yizhoucatherinezhang/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={linkedInLogo}
            alt="linkedin"
            style={{ height: "20px" }}
          ></img>
        </a>
        <a
          style={{ height: "24px" }}
          href="https://github.com/OneBoatFly"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i
            className="fa-brands fa-github"
            style={{
              fontSize: "20px",
              background: "white",
              borderRadius: "2px",
            }}
          ></i>
        </a>
        </div>
        </div>
    </div>
  );
}
