import React from "react";
import "../styles/NetworkList.css";

function NetworkList() {
  return (
    <div className="networkContainer">
      <ul className="networkUl">
        <li>
          <a
            href="https://vk.com/feed"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-vk"></i>
          </a>
        </li>
        <li>
          <a
            href="https://t.me/IslaNailbot"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-telegram"></i>
          </a>
        </li>
        <li>
          <a
            href="https://img1.eadaily.com/r650x400/o/881/4699b6f2ad06ed4211b47ec0ae5b3.jpeg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
        </li>
        <li>
          <a
            href="https://akket.com/wp-content/uploads/2023/06/WhatsApp-massovo-vyvodit-smartfony-iz-stroya.-Oni-perestayut-rabotat-1.jpg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-whatsapp"></i>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default NetworkList;
