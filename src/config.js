const VonageVideo = require("opentok");

const SERVER_BASE_URL = "http://localhost:3000";

const API_KEY = "47334051";
const SESSION_ID =
  "2_MX40NzMzNDA1MX5-MTYzMTY3MzE0OTc2M35lN3AydTU2NHlBWlVvZlZoWmN4RjJ5Vk5-UH4";
// const TOKEN = fetch("/token").then((res) => res.json());
// "T1==cGFydG5lcl9pZD00NzMzNDA1MSZzaWc9NDE0ZGI3MDc3NWE0YWQ0NTU0NGFiMDE1NWI5NDVmYThmZWFjNDlkNjpzZXNzaW9uX2lkPTFfTVg0ME56TXpOREExTVg1LU1UWXpNVFl3TVRJd05EZzBNSDVhYUVVMWMweHpOWFZDWjBOek5IcHZlSFp3VGtWc0x6Qi1VSDQmY3JlYXRlX3RpbWU9MTYzMTYxMTg3MSZub25jZT0wLjg2OTM5NjkxMTQwMzAxOCZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjMyMjE2NjcxJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";
const SECRET = "d6fcda5a18db297683efeede09611be0e6e6e3e0";

const vonageVideo = new VonageVideo(API_KEY, SECRET);
const TOKEN = vonageVideo.generateToken(SESSION_ID);

export { SERVER_BASE_URL, API_KEY, SESSION_ID, TOKEN, SECRET };
