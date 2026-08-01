const API_URL = "https://script.google.com/macros/s/AKfycbxU4eAP4vpmtl7bkO_7t-LcUexB4j-lWL_owh_Q3nGASolq76BsMPW1Tfts8-ASK7EB/exec";

const searchBox = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");
const resultsBody = document.getElementById("resultsBody");
const totalItems = document.getElementById("totalItems");
const resultCount = document.getElementById("resultCount");

let inventory = [];

async function loadInventory() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        inventory = data.filter(row => row && row.length > 0);

        totalItems.textContent = inventory.length;

    } catch (err) {
        console.error(err);
    }
}

function showResults(results){

    resultsBody.innerHTML="";

    resultCount.textContent=results.length;

    if(results.length===0){

        resultsBody.innerHTML="<tr><td colspan='3'>No Item Found</td></tr>";

        return;

    }

    results.forEach(row=>{

        resultsBody.innerHTML+=`
        <tr>
            <td>${row[0]||""}</td>
            <td>${row[1]||""}</td>
            <td>${row[2]||""}</td>
        </tr>
        `;

    });

}

function searchInventory(){

    const keyword=searchBox.value.trim().toLowerCase();

    if(keyword===""){

        showResults([]);

        return;

    }

    const results=inventory.filter(row=>
        (row[0]||"").toLowerCase().includes(keyword)
    );

    showResults(results);

}

function searchCupboard(cupboard){

    const results=inventory.filter(row=>row[1]===cupboard);

    showResults(results);

}

function createCupboardButtons(){

    const container=document.getElementById("cupboardContainer");

    container.innerHTML="";

    for(let i=1;i<=25;i++){

        const no="C-"+String(i).padStart(2,"0");

        const btn=document.createElement("button");

        btn.className="cupboard-btn";

        btn.textContent=no;

        btn.onclick=()=>searchCupboard(no);

        container.appendChild(btn);

    }

}

searchBtn.addEventListener("click",searchInventory);

searchBox.addEventListener("keyup",e=>{
    if(e.key==="Enter") searchInventory();
});

loadInventory();

createCupboardButtons();
