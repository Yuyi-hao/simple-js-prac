// get elements     
// buttons 
const messages = [
    "Hi captain, 😊 I just wanted to drop a quick note to say goodbye. It seems like I'm at a loss for words, so I'll keep it short. Bye for now!",

    "Wait, don't go just yet! I actually have something to share with you. Here you go: 🎁",

    "Now that I've shared it, feel free to head off. Okay, you're going. Got it.",

    "Oh, I seem to have dropped some more flowers. 🌸 Could you do me a favor and pick them up? Thanks a bunch!",

    "Oops, I dropped even more flowers. Are you secretly a magnet? You just attracted more of them. 😄",

    "Uh-oh, looks like I've lost all my flowers now. 🥀 I guess I have one left. 🌼",

    "But you know what? I think all these flowers belong to you. 🌺 Keep them as a little gift from me.",
]
const submit_btn = document.querySelector("#submit-btn");
const reset_btn = document.querySelector("#reset-btn");

// divs 
const main_container = document.querySelector(".container")
// text
const name_entry = document.querySelector("#name-entry");

// global variable 
let intervalId = 0;
let typing_p = document.querySelector('.txt-msg');

function display_message(message, callback){
    return new Promise(resolve => {
        typing_p.innerHTML = "";
        let ele = message.split('').map((char) => {
            const span = document.createElement('span');
            span.textContent = char;
            return span;
        });

        ele.forEach((element, i) => {
            element.style.display = 'none';
            typing_p.appendChild(element);

            setTimeout(() => {
                element.style.display = 'inline';
                element.style.opacity = 0;

                const fadeInInterval = setInterval(() => {
                    element.style.opacity = parseFloat(element.style.opacity) + 0.1;
                    if (parseFloat(element.style.opacity) >= 1) {
                        clearInterval(fadeInInterval);
                    }
                }, 100);
            }, 100 * i);
        });

        // Resolve the promise when the animation is complete
        setTimeout(() => {
            resolve();
        }, 100 * ele.length + 1200);
    });
}


function getName(){
    let name = name_entry.value;
    if (name === ""){
        alert("Enter your name");
    }
    return name;
}

function presentPics(){
    while(main_container.lastElementChild){
        main_container.removeChild(main_container.lastElementChild);
    }
    const img_tag = document.createElement('img');
    main_container.appendChild(img_tag);

    return img_tag;
}

let msg_cnt = 0;
function change_img(img_tag, image_set){
    if(image_set.size < 16) {
        let num = 1;
        while(image_set.has(num)){
            num = Math.floor(Math.random()*(16-1+1)) + 1;
        }
        image_set.add(num);
        img_tag.src = `images/${num}.jpg`;
    }
    else{
        window.clearInterval(intervalId);
    }
}

let image_set = new Set();

submit_btn.addEventListener("click", async () => {
    let  userName = getName();
    if(userName){
        let img_tag = presentPics();
        display_messages_in_sequence(img_tag, image_set);
    }
});

async function display_messages_in_sequence(img_tag, image_set) {
    for (let i = 0; i < 7; i++) {
        await display_message(messages[i]);
        change_img(img_tag, image_set);
    }
    img_tag.src = "images/budding_pop.gif";
}

reset_btn.addEventListener("click", () =>{
    while(main_container.lastElementChild){
        main_container.removeChild(main_container.lastElementChild);
    }
    typing_p.innerHTML = "";
    main_container.appendChild(name_entry);
    main_container.appendChild(submit_btn);
});