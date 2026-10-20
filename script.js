let currSlide=0;
let total_slides=0;
let leftBtn=document.getElementById("Left");
let rightBtn=document.getElementById("Right");
let fullScreenBtn=document.getElementById("Full-Screen");
let presentBtn=document.getElementById("Present-slides");
let createBtn=document.getElementById("Create-slides");
let saveBtn=document.getElementById("Save-slides");
let editBtn=document.getElementById("Edit-slides");
editBtn.disabled=true;
rightBtn.disabled=true;
leftBtn.disabled=true;
let text_arr=[""];
let text=document.getElementById("text-area")
let content="";
let display_presentation=document.getElementById("display-class");
text.addEventListener("input",
    function()
    {
        text_arr=text.value.split("---");
        if(currSlide>=text_arr.length)
        {
            currSlide=text_arr.length-1;
        }
        display(text_arr[currSlide]);
        if(currSlide===text_arr.length-1)
        {
            rightBtn.disabled=true;
        }
        else
        {
            rightBtn.disabled=false;
        }
        if(currSlide===0)
        {
            leftBtn.disabled=true;
        }
        else
        {
            leftBtn.disabled=false;
        }

    }
)
function display(text_at_index)
{
    text_at_index=text_at_index.split("\n");
    let html_output="";
    for(let i=0;i<text_at_index.length;i++)
    {
        if(text_at_index[i].startsWith("##"))
        {
            html_output+="<h2>" + text_at_index[i].replace("##","")+ "</h2>";
        }
         else if(text_at_index[i].startsWith("#"))
        {
           html_output+="<h1>" + text_at_index[i].replace("#","")+ "</h1>";
        }
        else
        {
            html_output+="<p>"+ text_at_index[i] +"</p>";
        }
        

    }
    document.getElementById("display-presentation").innerHTML=html_output;
    document.getElementById("counter").innerHTML="<p>"+ "Current slide: " + (currSlide+1) + "/" + text_arr.length;
}
function toogleFullScreen()
{
    if(!document.fullscreenElement)
    {
        display_presentation.requestFullscreen();
        fullScreenBtn.innerText="Exit";
        
    }
    else
    {
        document.exitFullscreen();
        fullScreenBtn.innerText="Full Screen";

    }
}
rightBtn.addEventListener("click",function()
{
    if(currSlide<text_arr.length-1)
    {
        currSlide++;
        if(currSlide==(text_arr.length-1))
        {
            rightBtn.disabled=true;
        }
        if(currSlide!=0)
            {
                leftBtn.disabled=false;
            }
        display(text_arr[currSlide]);
    }
});
leftBtn.addEventListener("click",function()
{
    if(currSlide>0)
    {
        currSlide--;
        if(currSlide==0)
        {
            leftBtn.disabled=true;
        }
        if(currSlide<text_arr.length-1)
        {
            rightBtn.disabled=false;
        }
        display(text_arr[currSlide]);
    }
});
fullScreenBtn.addEventListener("click",function()
{
    toogleFullScreen()
}
);
presentBtn.addEventListener("click",function()
{
    toogleFullScreen()

}
);
createBtn.addEventListener("click",function()
{
    text_arr=[""];
    currSlide=0;
    text.value="";
    display("");
    leftBtn.disabled=true;
    rightBtn.disabled=true;
});
saveBtn.addEventListener("click",function()
{
    localStorage.setItem("saved-slides",text.value);
    text.disabled=true;
    editBtn.disabled=false;
    saveBtn.disabled=true;
});
editBtn.addEventListener("click",function()
{
    text.disabled=false;
    editBtn.disabled=true;
    saveBtn.disabled=false;

});
document.addEventListener("keydown",function(event)
{
    if(event.ctrlKey && (event.key==="s" || event.key==="S"))
    {
        event.preventDefault();
        saveBtn.click();
    }
    else if(event.key==="F11")
    {
        event.preventDefault();
        fullScreenBtn.click();
    }
    else if(event.key==="ArrowRight")
    {
        event.preventDefault();
        rightBtn.click();
    }
    else if(event.key=="ArrowLeft")
    {
        event.preventDefault();
        leftBtn.click();
    }
     
});
let saved_slides=localStorage.getItem("saved-slides");
if(saved_slides!=null && saved_slides!="")
{
    text_arr=saved_slides.split("---");
    currSlide=0;
     if(currSlide===text_arr.length-1)
        {
            rightBtn.disabled=true;
        }
        else
        {
            rightBtn.disabled=false;
        }
        if(currSlide===0)
        {
            leftBtn.disabled=true;
        }
        else
        {
            leftBtn.disabled=false;
        }
    display(text_arr[0]);
    text.value=saved_slides;

}