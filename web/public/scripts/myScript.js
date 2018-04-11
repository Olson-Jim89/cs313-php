var editMode = false;
var updateMode = false;


function enableEdit(){
    //alert('run function');
    
    var editBtn = document.getElementsByClassName("editTools");
   
    var i;

    if (editMode == false){
        
        for (i = 0; i < editBtn.length; i++) {
            editBtn[i].style.display="inline-block";
        }
        editMode = true;
        document.getElementById("editMode").innerHTML ="Edit mode: on  -";
        //alert('edit mode on');
    }else if (editMode == true){
        
        for (i = 0; i < editBtn.length; i++) {
            editBtn[i].style.display="none";
        }
        editMode = false;
        document.getElementById("editMode").innerHTML ="Edit mode: off -";
       // alert('edit mode off');
    }
}

function exitWin(){
    var EditWin = document.getElementsByClassName("EditWin");
    for (i = 0; i < EditWin.length; i++) {
        EditWin[i].style.display="none";
    }
    updateMode = false;
}

function catUpdateModeOn(catId){
    updateMode = true;
    document.getElementById('formCatId').setAttribute('value', catId);
    openCatEditWin();
}

function linkUpdateModeOn(linkId){
    updateMode = true;
    document.getElementById('formUpLinkId').setAttribute('value', linkId);
    openLinkEditWin();
}

function openCatEditWin(){
        
    if (updateMode == false){
        document.getElementById("catUpdateInputs").style.display="none";
        document.getElementById("catAddInputs").style.display="block";
    }else if (updateMode == true){
        document.getElementById("catAddInputs").style.display="none";
        document.getElementById("catUpdateInputs").style.display="block";
    }

    document.getElementById("catEdit").style.display="block";
        
}

function openLinkEditWin(InCatId){
     
    if (updateMode == false){
        document.getElementById('formLinkCatId').setAttribute("value", InCatId );
        document.getElementById("linkUpdateInputs").style.display="none";
        document.getElementById("linkAddInputs").style.display="block";
    }else if (updateMode == true){
        
        document.getElementById("linkAddInputs").style.display="none";
        document.getElementById("linkUpdateInputs").style.display="block";
    }

    document.getElementById("linkEdit").style.display="block";
    
}
