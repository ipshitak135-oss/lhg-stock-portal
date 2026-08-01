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
        createCupboardButtons();

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

    const results = inventory.filter(row => row[1] === cupboard);

    resultsBody.innerHTML = "";

    if(results.length===0){

        resultsBody.innerHTML="<tr><td colspan='3'>No Item Found</td></tr>";

        return;

    }

    const shelves=[...new Set(results.map(r=>r[2]))].sort();

    shelves.forEach(shelf=>{

        resultsBody.innerHTML+=`

        <tr>

            <td colspan="3"

            style="background:#003b7a;color:#fff;font-weight:bold;">

            📚 ${shelf}

            </td>

        </tr>

        `;

        results
        .filter(r=>r[2]===shelf)
        .forEach(item=>{

            resultsBody.innerHTML+=`

            <tr>

            <td>${item[0]}</td>

            <td>${item[1]}</td>

            <td>${item[2]}</td>

            </tr>

            `;

        });

    });

}

function createCupboardButtons(){

    const container = document.getElementById("cupboardContainer");

    container.innerHTML = "";

    // Unique cupboards nikaalo
    const cupboards = [...new Set(inventory.map(row => row[1]))]
        .filter(Boolean)
        .sort();

    cupboards.forEach(cupboard => {

        const count = inventory.filter(row => row[1] === cupboard).length;

        const card = document.createElement("div");

        card.className = "cupboard-card";

        card.innerHTML = `
            <h3>${cupboard}</h3>
            <p>${count} Items</p>
        `;

        card.onclick = () => searchCupboard(cupboard);

        container.appendChild(card);

    });

}
