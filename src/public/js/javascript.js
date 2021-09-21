console.log(`javascript.js file read-test`);

const submit = document.querySelector("#submit-comment");

const table = document.querySelector(".window");
const userName = document.querySelector("#userName");
const comment = document.querySelector("#comment-text");

const contact = document.querySelector("#contact-btn");

submit.addEventListener("click", function() {
  //TODO: add in function here
  commentString = comment.value;
  userNameString = userName.value;
  addCommentOnClick(commentString, userNameString);
});

contact.addEventListener("click", () => {
  document.location.href="http://localhost:8008/contact-form"
});

const addCommentOnClick = function(comm_str, userName) {
  try{
    if(userName !== "") {
      const row = table.insertRow();
      const insertion = row.insertCell();
      insertion.innerHTML =  `${userName} : ${comm_str}`;
      document.location.href="http://localhost:8008/"
    }else {
      console.log(`username cannot be empty when posting!`);
    }
  }
  catch(err) {
    console.log(err);
  } 
}

const fetchComments = function() {
  const request = new XMLHttpRequest();
  const requestURL = "/get_comments";
  request.open("GET", requestURL);
  request.responseType = "json";

  request.onload = function() {
    const res = request.response;    
    printAllComments(res);

  }

  request.send();
}

const printAllComments = function(fetchData) {
  
  const converted = Object.values(fetchData);
  //console.log(`${converted}`);
  converted.forEach((element, index, array) => {
    const row = table.insertRow();
    const cell = row.insertCell();
    // cell.innerHTML = `${element[index].user}: ${element[index].message}`;
    cell.innerHTML = `${array[index].user}: ${array[index].message}`;
  });
}

fetchComments();