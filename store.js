document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("appsGrid");
    const appModal = document.getElementById("appModal");
    const appIcon = document.getElementById("appIcon");
    const appName = document.getElementById("appName");
    const appDeveloper = document.getElementById("appDeveloper");
    const appVersion = document.getElementById("appVersion");
    const appDescription = document.getElementById("appDescription");
    const installBtn = document.getElementById("installBtn");
    const closeModal = document.getElementById("closeModal");

    const btnAll = document.getElementById("btnAll");
    const btnW10M = document.getElementById("btnW10M");
    const btnW10 = document.getElementById("btnW10");

    let appsW10M = [];
    let appsW10 = [];
    let currentApps = [];

    // Fetch mobile apps
    fetch("https://lumaprojects.github.io/store/mobile/apps.json")
        .then(r => r.json())
        .then(data => {
            appsW10M = data.map(app => ({ ...app, Platform: "W10M" }));
            if (currentApps.length === 0) loadAll(); // initial load
        })
        .catch(err => console.error("Failed to load mobile apps", err));

    // Fetch desktop apps
    fetch("https://lumaprojects.github.io/store/desktop/apps.json")
        .then(r => r.json())
        .then(data => {
            appsW10 = data.map(app => ({ ...app, Platform: "W10" }));
            if (currentApps.length === 0) loadAll(); // initial load
        })
        .catch(err => console.error("Failed to load desktop apps", err));

    function renderApps(apps) {
        grid.innerHTML = "";
        apps.forEach(app => {
            const div = document.createElement("div");
            div.className = "card";
            div.innerHTML = `
                <img src="${app.IconPath}" alt="${app.Name}">
                <div>${app.Name}</div>
                <small>${app.Platform}</small>
            `;
            div.onclick = () => openApp(app);
            grid.appendChild(div);
        });
    }

    function loadAll() {
        currentApps = [...appsW10M, ...appsW10];
        renderApps(currentApps);
    }

    function loadW10M() {
        currentApps = appsW10M;
        renderApps(currentApps);
    }

    function loadW10() {
        currentApps = appsW10;
        renderApps(currentApps);
    }

    function setTab(fn, btn) {
        document.querySelectorAll(".filters button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        fn();
    }

    // Tab buttons
    btnAll.onclick = () => setTab(loadAll, btnAll);
    btnW10M.onclick = () => setTab(loadW10M, btnW10M);
    btnW10.onclick = () => setTab(loadW10, btnW10);

    function openApp(app) {
        appIcon.src = app.IconPath;
        appName.textContent = app.Name;
        appDeveloper.textContent = app.Developer;
        appVersion.textContent = "Version " + app.Version;
        appDescription.textContent = app.Description;
        installBtn.href = app.DownloadUrl;
        appModal.classList.remove("hidden");
    }

    closeModal.onclick = () => appModal.classList.add("hidden");
});
