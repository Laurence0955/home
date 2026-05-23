// 1. Your Google Apps Script Connection Bridge URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzKoXoa7eYTeiTou_J1BlgzIDFlrxEEURoRsoHQo4njTMKNakywr8zIesKx16iSC8tj9Q/exec";

// 2. Automatically fetch data when the script is linked and loaded
async function fetchWebsiteData() {
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL);
        const data = await response.json();
        
        const container = document.getElementById('directory-list');
        container.innerHTML = ''; // Clear loading message

        // 3. Loop through your spreadsheet rows
        data.forEach(site => {
            // Convert comma-separated strings into bullet points
            const prosList = site.pros.split(',').map(item => `<li>${item.trim()}</li>`).join('');
            const consList = site.cons.split(',').map(item => `<li>${item.trim()}</li>`).join('');

            // 4. Structural layout template for one website card
            const cardHTML = `
                <section class="website-card">
                    <h3>${site.icon} <a href="${site.link}" target="_blank">${site.name}</a></h3>
                    <p><b>Category:</b> ${site.mainCategory} (${site.subCategory})</p>
                    <p><b>Description:</b> ${site.description}</p>
                    <p><b>What makes it stand out:</b> ${site.difference}</p>
                    
                    <h4>✅ Pros:</h4>
                    <ul>${prosList}</ul>
                    
                    <h4>❌ Cons:</h4>
                    <ul>${consList}</ul>
                </section>
            `;
            
            container.innerHTML += cardHTML;
        });

    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById('directory-list').innerHTML = 
            `<p style="color: red;">⚠️ Error connecting to Family Hub Database.</p>`;
    }
}

// Trigger the pipeline
fetchWebsiteData();
