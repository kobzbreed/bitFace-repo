/* COMPONENTS SCRIPTS */

//E Operator
const E = (id) => {return document.getElementById(id)}
//remove elements
const remove = (id) => {E(id).parentElement.removeChild(E(id))}
//Progess operator
const setProgressOptions = (params = {}) => {
    if(params.id) {
        const id = params.id
        switch(params.type || "progress") {
            case 'progress':
                //setting th progress
                if(E(id).firstElementChild) {
                    if(E(id).firstElementChild.firstElementChild) {
                        E(id).firstElementChild.firstElementChild.style.width = params.value || "100%"
                    }
                }
            break;
            case 'text':
                //setting th progress
                if(E(id).children[1]) {
                    E(id).children[1].innerText = params.value || ""
                }
            break;
        }
    }
}
 /** This functions show a modal message
     * @params {msg} String
     * @params {type} String [good|fail|warn|norm]
     * @return {int} ModalId
    **/
 const talk = (msg = "", type = "norm", id = "", pgress=0) => {
    //config stylings
    let params = {color:"rgba(68, 174, 194, .8)", 'class':""}
    if(type == "good") {params.color = "rgba(50, 205, 50, .8)"; params.class='fas fa-check-circle'}
    else if(type == "fail") {params.color = "rgba(255,0,0,.8)"; params.class='fas fa-times'}
    else if(type == "warn") {params.color = "rgba(255, 161, 1, .8)"; params.class='fas fa-info'}
    if(id != "") {
        //performing modifications
        E(id).style.background = params.color
        E('talk_msg' + id).innerHTML = msg
        E('talk_icon' + id).classList = params.class
        E('talk_loader' + id).style.width = pgress + '%'
    }
    else {
        //generate id
        id = 'talk_' + Math.floor(Math.random() * 10000000 * Math.random())
        let div = document.createElement('div')
        div.innerHTML =  `<di><style>
        .talk_spin{animation:talk_spin 700ms infinite;}
                    @keyframes talk_spin{
                        0%{
                            transform:rotate(0deg);
                        }
                        100%{
                            transform:rotate(720deg);
                        }
                    }
            </style>
            <div style='position:fixed;top:0px;left:0px;width:100vw;height:0px;display:flex;align-items:flex-start;z-index:1500'>
                <div id='${id}' style='margin-left:auto;margin-right:auto;margin-top:40px;background:${params.color};display:flex;overflow:hidden;
                border-radius:5px;font-size:17px;box-shadow:0 0 3px 1px rgba(0,0,0,.05);transition:all 400ms'>
                <div style='padding:8px 10px;text-align:center;z-index:2'><span id='talk_icon${id}' class='${params.class}' style='margin-right:5px'></span>
                <span id='talk_msg${id}' style='margin-right:5px;color:#fff;'>${msg}</span></div>
                <div name='loader' style='margin-left:-100%;width:100%'><div id='talk_loader${id}' style='transition:all 200ms;background:linear-gradient(to right, #FFA500, #FF4500, #FF0000); width:${pgress}%;height:100%'></div></div>
                </div></div></div>
        `
        document.body.appendChild(div.firstElementChild)
    }
    return id
}
//Remove
const stopTalking = (_timeout, id) => {
    if(_timeout > 0) {
        //using timeout
        setTimeout(() => {document.body.removeChild(E(id).parentElement.parentElement)}, _timeout * 1000)
    }
    else {
        //not using timeout
        document.body.removeChild(E(id).parentElement.parentElement)
    }
}
