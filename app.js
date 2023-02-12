

/**
 * 
 * @param {HTMLElement} button 
 */
function switcher(button){
    if(button.getAttribute("selected")==="false"){
        let siblings=button.parentElement.children
        for(let i=0;i<siblings.length;i++){
            if(siblings.item(i).tagName==="BUTTON")
            siblings.item(i).setAttribute("selected","false")
            siblings.item(i).style.backgroundColor="unset"
        }
        button.style.backgroundColor="red"
        button.setAttribute("selected","true")
    }
    else{
        button.style.backgroundColor="unset"
        button.setAttribute("selected","false")
    }
    
  }


function checkprefix(button){
    
}
function getAnswers(){
    // retrieve Answers
let allButtons=document.getElementsByTagName("button")
let selectedButtons=[]
console.log(allButtons)
for(button of allButtons){
    if(button.getAttribute("selected")==="true") selectedButtons.push(button)
  }
  // if errors show errors and ask to retry
  // check no line checked twice
  let errors=[false,false,false,false,false,false,false,false]
  let doublesA=[]
  let doublesB=[]
for(button of selectedButtons){
    let prefix=button.getAttribute("id").substring(0,2)
    let attribute=button.getAttribute("id").substring(3)
    let lineSelection=selectedButtons.filter(b => b.getAttribute("id").substring(0,2)===prefix)
    let attributeSelection=selectedButtons.filter(b => b.getAttribute("id").substring(3)===attribute)
    console.log("loop")
    console.log(attributeSelection)
    if(lineSelection.length>1) errors[prefix.substring(1,2)-1]=true

        let columnASelection= attributeSelection.filter(b => b.getAttribute("id").substring(1,2)<5)
        let columnBSelection= attributeSelection.filter(b => b.getAttribute("id").substring(1,2)>4)
        if(columnASelection.length>1) doublesA.push(attribute+" ")
        if(columnBSelection.length>1) doublesB.push(attribute+" ")
}
let empty=[false,false,false,false,false,false,false,false]
for(let i=0;i<8;i++){
if (!selectedButtons.find((b)=> b.getAttribute("id").substring(0,2)==="A"+(i+1))) empty[i]=true
}

if(errors.includes(true) || empty.includes(true) || doublesA.length>0 || doublesB.length>0){
    if (errors.includes(true)){
        for(let i=0;i<8;i++){
            if (errors[i]===true) document.getElementById("errorBar"+(i+1)).innerHTML="il y a trop de réponse dans cette zone"
            else document.getElementById("errorBar"+(i+1)).innerHTML=""
        }
    }

    // check no line not checked

    if (empty.includes(true)){
        for(let i=0;i<8;i++){
            if (empty[i]===true) document.getElementById("errorBar"+(i+1)).innerHTML="il manque une réponse ici "
        }
    }

    // check no doubles
    if(doublesA.length>0 || doublesB.length>0){
        doublesA=[...new Set(doublesA)]
        doublesB=[...new Set(doublesB)]
        let inner="vous ne pouvez séléctionné qu'une fois chaque mot par colonne<br>"
        if(doublesA.length>0) inner+= "le(s) mot(s) "+doublesA+" apparait(ssent) plus d'une fois dans la colonne A<br>"
        if(doublesB.length>0) inner+= "le(s) mot(s) "+doublesB+" apparait(ssent) plus d'une fois dans la colonne B<br>"
        document.getElementById("errorBarFinal").innerHTML=inner;
    }  
}

else{
    for(errorElement of document.getElementsByClassName("error")) errorElement.innerHTML=""
      // disable buttons
    for(button of allButtons) button.disabled = true;

    // show the right Answers
    let Answers=[]
    for(let i=0;i<8;i++){
        Answers[i]=" "+selectedButtons[i].getAttribute("id").substring(3)
    }
    document.getElementById("participantAnswers").innerHTML='<br>Vos réponses:<br><table><tr><td>Audio 1: Femme</td><td>Audio 5: Fille</td></tr><tr><td>Audio 2: Garcon</td><td>Audio 6: Femme</td></tr><tr><td>Audio 3: Homme</td><td>Audio 7: Homme</td></tr><tr><td>Audio 4: Fille</td><td>Audio 8: Garcon</td></tr></table>'
    // show the participant answers and ask to copy paste it to me.
    document.getElementById("rightAnswers").innerHTML='<br>Les bonnes réponses:<br><table><tr><td>Audio 1: '+Answers[0]+'</td><td>Audio 5: '+Answers[4]+'</td></tr><tr><td>Audio 2: '+Answers[1]+'</td><td>Audio 6: '+Answers[5]+'</td></tr><tr><td>Audio 3: '+Answers[2]+'</td><td>Audio 7: '+Answers[6]+'</td></tr><tr><td>Audio 4: '+Answers[3]+'</td><td>Audio 8: '+Answers[7]+'</td></tr></table>'

    document.getElementById("endText").innerHTML="<h4><br>Merci d'avoir participé, merci de m'envoyer un copier coller de la ligne suivante à cette <a href='https://docs.google.com/forms/d/e/1FAIpQLSf9vUc6WyG0lp9Ji05cIoT8Ad9suF0ukBWNvi90ZgBNQk9O3Q/viewform?usp=sf_link'>adresse</a>:</h4><br>"+ parseInt(Math.random()*1000)+" - "+Answers
    window.scrollTo(0, document.body.scrollHeight);
}
// else 

 


}