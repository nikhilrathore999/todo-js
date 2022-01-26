var arr_of_obj = new Set();
var card_title;
var card_item;
var first_card;
var delete_div;
var cloned_list_item;
var value_id;
var done_button;
var title_for_list;
var temp;
function modal(){
    document.getElementById("modal-div").style.display = "block";
    document.getElementById("no_task_text").style.display="none";
};
function addCard(){
    card_title = document.getElementById("modal-input-box").value;
    createObj(card_title);
    closeModal();
}
function closeModal(){
    document.getElementById("modal-div").style.display = "none";
}
var subtask = new Map;
function createObj(title){
    var card_obj = {
        title: title,
        id: Date.now(),
        subtask
    };
    arr_of_obj.add(card_obj);
    createCard(card_obj.id);
};

function addList(){
    cloned_list_item = document.querySelector(".this-list-element").cloneNode(true);
    card_item = document.getElementById('modal-input-box-card').value;
    
    console.log(cloned_list_item);
    cloned_list_item.innerText =  card_item; //card_item +
    cloned_list_item.style.display = "block";
    cloned_list_item.setAttribute('id',`${Date.now()}`);
    cloned_list_item.setAttribute('value',`${Date.now()}`);
    cloned_list_item.setAttribute('style',"margin-left: 10px;");
    done_button = document.createElement('button');
    done_button.setAttribute('id',`check-done-${Date.now()}`);
    done_button.setAttribute('class','mark-as-done-class');
    done_button.setAttribute('value',`${Date.now()}`);
    done_button.setAttribute('onclick','completedTask(this.value)');
   
    done_button.innerText = 'Task complete';
    done_button.setAttribute('style','font-size:15 px;cursor:pointer; height:15px; border-radius:5px;')
    console.log(done_button);
    cloned_list_item.appendChild(done_button);
    console.log(cloned_list_item);
    cloned_list_item.setAttribute('onClick',"completedTask(this.value)");
    console.log(document.getElementById(`${value_id}`));
    
    for(obj of arr_of_obj){
        for(prop in obj){
            if(obj.id == value_id){
                obj.subtask.set(`${card_item}`,`${Date.now()}`);
               //title_for_list = obj.title;
                card_item = '';
                break;
            }
        }
    }
    
    console.log(document.getElementById('check-done'));
    console.log(done_button);
    console.log(cloned_list_item);
    console.log(arr_of_obj);
    document.getElementById(`${value_id}`).getElementsByClassName('add-list-after-this')[0].appendChild(cloned_list_item).appendChild(done_button);
    
    cloned_list_item = '';
    closeCardModal();
}

function closeCardModal(){
    document.getElementById('modal-div-card').style.display = "none";
}

function addSubtask(val) {
    document.getElementById("modal-div-card").style.display = "block";
    // console.log(val);
    value_id = val;
};

function deleteCard(val){
    delete_div = document.getElementById(`${val}`);
    console.log(val);
    for(obj of arr_of_obj){
        for(prop in obj){
        if (obj.id==val)
        arr_of_obj.delete(obj);
        break;
        }
    }
    delete_div.parentNode.removeChild(delete_div);
    first_card = 0;
    console.log(arr_of_obj);
    if(arr_of_obj.size==0){
        document.getElementById("no_task_text").style.display="block";
    }
};

function createCard(){
    if(arr_of_obj.size==0){
    document.getElementById('outer-container').innerHTML = "EMPTY";
    first_card = 0;
    }
    else {
    first_card = document.querySelector('.card').cloneNode(true);
    display(first_card);
}};
function completedTask(value){
    
    document.getElementById(`${value}`).style.textDecoration = 'line-through';
    document.getElementById(`${value}`).style.color = 'rgb(16, 170, 241)';
    
    document.getElementById(`check-done-${value}`).remove();
    
    console.log(value);
}
function display(card){
    if(card==0){
        document.getElementById('outer-container').innerHTML = "EMPTY";
    }
    else {
    arr_of_obj.forEach(element => {
        card.id = element.id;
        card.querySelector(".card-head").innerHTML = element.title;
        card.querySelector(".card-head").setAttribute('value',`${element.id}`);
        card.setAttribute("value",`${element.id}`);
        card.setAttribute("display","block");
        card.setAttribute("min-height","300px");
        card.querySelector(".delete-button-in-card").setAttribute("value",`${element.id}`);
        card.querySelector(".delete-button-in-card").setAttribute("onClick","deleteCard(this.value)");
        card.querySelector(".add-button-in-card").setAttribute("value",`${element.id}`);
        card.querySelector(".add-button-in-card").setAttribute("onClick","addSubtask(this.value)");
        
    });
    card.style.display = "block";
    document.getElementById("outer-container").appendChild(card);
    displayAll();
}}

function headerFunc(val){
    var card_header;
    console.log(val);
    console.log(document.getElementById(`${val}`));
    console.log(arr_of_obj);
    for(let ele of arr_of_obj){
        for(let id in ele){
            if(ele[id]==val){
                card_header = ele.title;
                break;
            };
        };
    };
    console.log(card_header);
    document.querySelector("#app-name").style.display = 'none';
    document.querySelector("#add-button-text").style.display = 'none';
    for(let ele of arr_of_obj){
        console.log(ele.id);
            if(ele.id==val){
                document.getElementById(`${ele.id}`).style.display = 'block';
            }
            else {
                document.getElementById(`${ele.id}`).style.display = 'none';
            }
    };
    document.getElementById('card-dynamic-head').innerText = `${card_header}`;
    document.getElementById('card-dynamic-head').style.display = 'flex'
    document.getElementById('back-button').style.display = 'block'
};


function displayAll(){
    document.querySelector("#app-name").style.display = 'block';
    document.querySelector("#add-button-text").style.display = 'inline-block';
    document.getElementById('back-button').style.display = 'none';
    for(let ele of arr_of_obj){
            document.getElementById(`${ele.id}`).style.display = 'block';
    };
    document.getElementById('card-dynamic-head').innerText = ``;
    document.getElementById('card-dynamic-head').style.display = 'none';
}