let xhr = new XMLHttpRequest();
const mytable= document.querySelector('#mytable');
const tbody=document.querySelector('#tbody')

xhr.open("GET","https://jsonplaceholder.typicode.com/posts" ,true)
const addUsers=(user)=>{
    const tr = document.createElement("tr")
    const td1 = document.createElement("td")
    const td2 = document.createElement("td")
    const td3 = document.createElement("td")
    const td4 = document.createElement("td")
    
    tbody.appendChild(tr)
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    let {userId,id,title ,body} = user
    td1.innerText=userId
    td2.innerText=id
    td3.innerText=title
    td4.innerText=body
}

xhr.addEventListener('load',()=>{
    const response = JSON.parse(xhr.responseText);
    response.forEach(post => {
        addUsers(post);
    });

})
xhr.send();
///json-server  --watch bd.json