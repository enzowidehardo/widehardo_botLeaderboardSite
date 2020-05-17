let oldjson = OldJSON;
let ogjson = OGJSON;

console.log(ogjson);


//old db logic
//get columns
let oldColumns = Object.keys(oldjson[0]);
const oldIgnore = [2,3,5,7];

//get different ordered oldrow 

const oldrow = oldjson.slice().sort((x,y) =>{return x.tricoins > y.tricoins ? -1:1});
const oldrowUsername = oldjson.slice().sort((x,y) =>{return x.username.toLowerCase() > y.username.toLowerCase() ? 1:-1});
const oldrowUID = oldjson.slice().sort((x,y) =>{return x["UID"] > y["UID"] ? 1:-1});
const oldrowRank = oldjson.slice().sort((x,y) =>{
    if(x.prestige == "pleb"){return 1}
    if(x.prestige == "TriHard" && y.prestige != "pleb"){return 1;}else if(x.prestige == "TriHard" && y.prestige == "pleb"){return -1}
    if(x.prestige == "WideHard" && y.prestige != "pleb" && y.prestige != "TriHard"){return 1;} else if (x.prestige == "WideHard" && (y.prestige == "pleb" || y.prestige == "TriHard")){return -1}
    if(x.prestige == "WideHardo" && y.prestige != "HYPERHARDW"){return -1;}else if (x.prestige == "WideHardo" && y.prestige == "HYPERHARDW"){return 1}
    if(x.prestige == "HYPERHARDW"){return -1}
});

//OG db logic
//get columns
let ogColumns = Object.keys(ogjson[0]);
const ogIgnore = [2,3,5,7];

//get different ordered OGrow 

const ogrow = ogjson.slice().sort((x,y) =>{return x.tricoins > y.tricoins ? -1:1});
const ogrowUsername = ogjson.slice().sort((x,y) =>{return x.username.toLowerCase() > y.username.toLowerCase() ? 1:-1});
const ogrowUID = ogjson.slice().sort((x,y) =>{return x["UID"] > y["UID"] ? 1:-1});
const ogrowRank = ogjson.slice().sort((x,y) =>{
    if(x.prestige == "pleb"){return 1}
    if(x.prestige == "TriHard" && y.prestige != "pleb"){return 1;}else if(x.prestige == "TriHard" && y.prestige == "pleb"){return -1}
    if(x.prestige == "WideHard" && y.prestige != "pleb" && y.prestige != "TriHard"){return 1;} else if (x.prestige == "WideHard" && (y.prestige == "pleb" || y.prestige == "TriHard")){return -1}
    if(x.prestige == "WideHardo" && y.prestige != "HYPERHARDW"){return -1;}else if (x.prestige == "WideHardo" && y.prestige == "HYPERHARDW"){return 1}
    if(x.prestige == "HYPERHARDW"){return -1}
});


$("#OLD").click(function(){

    //create columns
    let columnString = "<div class='column'> "
    for(let i=0;i<oldColumns.length;i++){
        if(oldIgnore.indexOf(i) != -1){continue;}
        columnString += '<p class="columnText">' + (oldColumns[i] == "prestige"?"rank":oldColumns[i]) + '</p>';
    }
    columnString += "</div>";
    document.getElementById("leaderboard").innerHTML = columnString;

    createTableOld(oldrow, function(){
        $(".columnText").click(function(e){
            let text = e.target.innerHTML
            if(text == "rank" || text == "prestige"){
                createTableOld(oldrowRank);
            }else if(text == "username"){
                createTableOld(oldrowUsername);
            }else if (text == "UID"){
                createTableOld(oldrowUID);
            }else{
                createTableOld(oldrow);
            }
            
        })
    })
    
})


$("#OG").click(function(){

    //create columns
    let columnString = "<div class='column'> "
    for(let i=0;i<ogColumns.length;i++){
        if(ogIgnore.indexOf(i) != -1){continue;}
        columnString += '<p class="columnText">' + (ogColumns[i] == "prestige"?"rank":ogColumns[i]) + '</p>';
    }
    columnString += "</div>";
    document.getElementById("leaderboard").innerHTML = columnString;

    createTableOld(ogrow, function(){
        $(".columnText").click(function(e){
            let text = e.target.innerHTML
            if(text == "rank" || text == "prestige"){
                createTableOld(ogrowRank);
            }else if(text == "username"){
                createTableOld(ogrowUsername);
            }else if (text == "UID"){
                createTableOld(ogrowUID);
            }else{
                createTableOld(ogrow);
            }
            
        })
    })
    
})

function createTableOld(oldrow, callback){
    $(".row").remove();


   //create row
   console.log("start")
   for(let i=0;i<oldrow.length;i++){
       let rowString = "<div class='row'> "
       for(let x=0;x<oldColumns.length;x++){
           if(oldIgnore.indexOf(x) != -1){continue;}
           let isName = oldColumns[x] == "username";
           let color = "white";
           if(oldrow[i]["prestige"] == "HYPERHARDW"){color="red"}
           else if(oldrow[i]["prestige"] == "WideHardo"){color="rgb(247, 207, 47)"}
           else if(oldrow[i]["prestige"] == "WideHard"){color="rgb(214, 89, 255)"}
           else if(oldrow[i]["prestige"] == "TriHard"){color="rgb(76, 230, 201)"}

           rowString += `<p class="rowText${isName == true?" name":""}" ${isName == true?`style='color:${color}'`:""}>` + oldrow[i][oldColumns[x]] +'</p> ';
       }

       rowString += "</div>";
       $("#leaderboard").append(rowString);

   }
   console.log("end")

   $(".name").click(function(e){
       window.open("https://twitch.tv/" + e.target.innerHTML, '_blank')
   })

   if(callback){callback()}
}



//help docs link redirect
$("#Docs").click(function(){
    window.open("https://docs.google.com/document/d/1lIcbOPMb-_GTNNajrTsjUFBIKc0SggP3gnpw-LD91EI/edit?usp=sharing", '_blank')
})
$("#title").click(function(){
    location.reload();
})
