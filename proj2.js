function getAndUpdate(){
    console.log("listing")
    tit = document.getElementById('item').value;
    desc = document.getElementById('description').value;

    if (localStorage.getItem('itemJson') == null){
        itemJsonArray = [];
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemJson',JSON.stringify(itemJsonArray))
    }else{
        itemJsonArrayStr = localStorage.getItem('itemJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr)
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemJson',JSON.stringify(itemJsonArray))
    }
    update();
}
function update(){
    console.log("listing")

    if (localStorage.getItem('itemJson') == null){
        itemJsonArray = [];
        localStorage.setItem('itemJson',JSON.stringify(itemJsonArray))
    }else{
        itemJsonArrayStr = localStorage.getItem('itemJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr)
    }
    //Adding to table
    let tablebody = document.getElementById('tablebody');
    let str = ""
    itemJsonArray.forEach((element, index) => {
        str += `
        <tr>
        <th scope="row">${index+1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td><button onclick="deleted(${index})" class="btn btn-sm btn-primary">Delete</button></td>
        </tr>
        `;
    });
    tablebody.innerHTML = str;
}
add = document.getElementById("add")
add.addEventListener("click",getAndUpdate)
update();
function deleted(itemIndex){
    console.log("delete item",itemIndex);
    console.log(localStorage);
    itemJsonArrayStr = localStorage.getItem('itemJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    //delete item index element from array
    itemJsonArray.splice(itemIndex,1);
    // if(itemJsonArray.length > 1){
    //     itemJsonArray.length --;
    // }
    // if(itemJsonArray.length == 1){
    //     itemJsonArray.splice(itemIndex,1);
    // }
    localStorage.setItem('itemJson',JSON.stringify(itemJsonArray))
    update();
}

clear.addEventListener('click',()=>{
    if(confirm("You really want to clear??")){
        localStorage.clear();
        update();
    }
})