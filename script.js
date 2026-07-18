const API_URL = "https://script.google.com/macros/s/AKfycbxU4eAP4vpmtl7bkO_7t-LcUexB4j-lWL_owh_Q3nGASolq76BsMPW1Tfts8-ASK7EB/exec";

const searchBox = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");
const resultsBody = document.getElementById("resultsBody");
const totalItems = document.getElementById("totalItems");
const resultCount = document.getElementById("resultCount");

let inventory = [];

async function loadInventory() {
    try {
        const response = await fetch(API_URL + "?t=" + new Date().getTime());
        const data = await response.json();

        // Header row remove
        inventory = data.slice(1);


function searchInventory() {

    const keyword = searchBox.value.trim().toLowerCase();

    resultsBody.innerHTML = "";

    if (keyword === "") {
        resultCount.textContent = 0;
        return;
    }

    const results = inventory.filter(row =>
        row.join(" ").toLowerCase().includes(keyword)
    );

    resultCount.textContent = results.length;

    if(results.length===0){
        resultsBody.innerHTML =
        "<tr><td colspan='6'>No Item Found</td></tr>";
        return;
    }

    results.forEach(row=>{

        resultsBody.innerHTML += `
        <tr>
            <td>${row[0] || ""}</td>
            <td>${row[1] || ""}</td>
            <td>${row[2] || ""}</td>
            <td>${row[3] || ""}</td>
            <td>${row[4] || ""}</td>
            <td>${row[5] || ""}</td>
        </tr>
        `;

    });

}

function searchCupboard(cupboard){

    searchBox.value = cupboard;

    searchInventory();

}

function createCupboardButtons(){

    const container=document.getElementById("cupboardContainer");

    container.innerHTML="";

    for(let i=1;i<=25;i++){

        const btn=document.createElement("button");

        btn.className="cupboard-btn";

        btn.textContent="Cupboard "+i;

        btn.onclick=function(){

            searchCupboard("CUPBOARD NO "+i);

        };

        container.appendChild(btn);

    }

}

searchBtn.addEventListener("click",searchInventory);

searchBox.addEventListener("keyup",function(e){

    if(e.key==="Enter"){

        searchInventory();

    }

});

loadInventory();

createCupboardButtons();