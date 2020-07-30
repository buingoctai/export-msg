const ROOT_EXPORT_PATH = "/Study/ExportMsg/Zalo Desktop"; // Edit here
const INITIAL_CSS = `.container { 
    margin: 0; 
    font: 12px/18px; 
    display:flex;
    flex-direction:column;
    align-items:center;
  }
  
  a {
    text-decoration: none;
  } 
  .page_header {
    position:fixed;
    border-bottom:1px solid #e3e6e8;
    width:100%;
    z-index:10;
    background-color: #ffff;
    display: flex;
    justify-content: center;
  }
  .page_body{
    padding-top: 64px;
    width: 480px;
    margin: 0 auto;
  }
  .history{
    padding: 16px 0;
  }
  .message {
    margin: 0 -10px;
    transition: background-color 2s ease;
  }
  .default {
    padding: 10px;
  }
  .default.joined {
    margin-top: -10px;
  }

  .pull_left {
    float: left;
  }
  .service .userpic_wrap {
    padding-top: 10px;
  }
  .initials {
    font-size: 30px;
  }
  .userpic4 {
    background-color: #4f9cd9;
  }
  .userpic {
    display: block;
    border-radius: 50%;
    overflow: hidden;
  }
  .userpic .initials {
    display: block;
    color: #fff;
    text-align: center;
    text-transform: uppercase;
    user-select: none;
  }

  .default .body {
    margin-left: 60px;
  }
  .pull_right {
    float: right;
  }
  .details {
      color: #70777b;
  }

  .default .from_name {
    color: #3892db;
    font-weight: 700;
    padding-bottom: 5px;
  }

  .clearfix:after {
    content: " ";
    visibility: hidden;
    display: block;
    height: 0;
    clear: both;
  }

  .default .media_wrap {
    padding-bottom: 5px;
  }
  
  img{
    max-width:150px;
    max-height:100px
  }
  .arrangedFlex{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 10px;
  }
  .arrangedFlex .infor{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .arrangedFlex .infor > * {
    padding: 10px 10px 
  }

  .arrangedFlex .infor .title{
    font-size: 15px
  }
  `;
const STICKER_URL =
  "https://zalo-api.zadn.vn/api/emoticon/sprite?eid=IdValue&size=130";
const EXTENSION_LIST = ["png", "jpeg", "pdf", "gif"];
const SIZE_UNIT_LIST = ["Bytes", "Kb", "Mb", "Gb"];
const MIN_SIZE = 1024;
const LOCATION_ICON =
  "https://image.freepik.com/free-vector/location_53876-25530.jpg";
const GOOGLE_MAP = "https://maps.google.com/?q=latValue,loValue";
const ICON_DOWNLOAD = "https://zalo-chat-static.zadn.vn/v1/icon-typeValue.svg";
const POPULAR_EXTENSION = ['pdf', 'word', 'txt', 'excel', 'mp3', 'mp4'];

module.exports = {
  ROOT_EXPORT_PATH,
  INITIAL_CSS,
  STICKER_URL,
  EXTENSION_LIST,
  SIZE_UNIT_LIST,
  MIN_SIZE,
  LOCATION_ICON,
  GOOGLE_MAP,
  ICON_DOWNLOAD,
  POPULAR_EXTENSION
};
