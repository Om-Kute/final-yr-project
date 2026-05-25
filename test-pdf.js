const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

    await page.goto('http://localhost:3000/dashboard/create-project', { waitUntil: 'networkidle2' });

    // Set fake result in local storage
    await page.evaluate(() => {
        localStorage.setItem('project-config-storage', JSON.stringify({
            state: {
                projectIdea: "Test Idea",
                difficultyLevel: "beginner",
                selectedFeatures: { authentication: true, aiFeatures: false, payment: false },
                generationStatus: "completed",
                generatedResult: {
                    title: "Test Project",
                    description: "Test Desc",
                    techStack: { frontend: ["React"], backend: ["Node"], database: ["Mongo"] },
                    architecture: ["Client", "Server"],
                    database: ["Users"],
                    features: ["Auth"]
                },
                savedProjects: []
            },
            version: 0
        }));
    });

    await page.goto('http://localhost:3000/dashboard/result', { waitUntil: 'networkidle0' });

    // click button and wait to see if error occurs
    console.log("clicking export button...");
    await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const exportBtn = buttons.find(b => b.textContent.includes('Export as PDF'));
        if (exportBtn) exportBtn.click();
    });

    await new Promise(r => setTimeout(r, 2000));
    await browser.close();
})();
