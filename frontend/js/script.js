
const login = document.querySelector(".login");
const loginForm = login.querySelector(".login__form");
const loginInput = login.querySelector(".login__input");

// elementos do chat
const chat = document.querySelector(".chat");
const chatForm = chat.querySelector(".chat__form");
const chatInput = chat.querySelector(".chat__input");
const chatMassege = chat.querySelector(".chat__message");



const color = [
  "blue",
  "red",
  "yellow",
  "pink"
  ]
const user = {id: "", nome:"", color:""}

let websocket;
const creatMessageSelf = (content) =>{
  const div = document.createElement("div");
  div.classList.add("message__self");
  div.innerHTML = content;
  return div;
}

const creatMessageOther = (content, sender, senderColor) =>{
  const div = document.createElement("div");
  const span = document.createElement("span");
  div.classList.add("message__other");
  span.classList.add("message__sender");
  div.appendChild(span);
  span.innerHTML = sender;
  span.style.color = senderColor;
  div.innerHTML += content;
  return div;
}

const scrollScreen = () =>{
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  })
}

const getRandomColor = ()=>{
  const randomIndex = Math.floor(Math.random() * color.length);
  return color[randomIndex];
}

const processMessage = ({data}) =>{
  const {userId, name, cor, content} = JSON.parse(data);
  const message = userId == user.id ?creatMessageSelf(content) : creatMessageOther(content, name, cor);
  
  chatMassege.appendChild(message);
  scrollScreen();
}

const handleLogin = (event)=>{
  event.preventDefault();
  user.id = crypto.randomUUID();
  user.nome = loginInput.value;
  user.color = getRandomColor();
  login.style.display = "none";
  chat.style.display = "flex";
  
 websocket = new WebSocket("wss://chat-2-bacckend.onrender.com");
 websocket.onmessage = processMessage;
 
 /*
 websocket.onopen = () =>{
   websocket.send(`Usuario ${user.nome} esta online`);
 }
 */
  console.log(user);
}

const sendMassege = (event) =>{
  event.preventDefault();
  const message = {
    userId: user.id,
    name: user.nome,
    cor: user.color,
    content: chatInput.value
  }
  websocket.send(JSON.stringify(message));
  chatInput.value = "";
}

loginForm.addEventListener("submit", handleLogin)
chatForm.addEventListener("submit", sendMassege)




