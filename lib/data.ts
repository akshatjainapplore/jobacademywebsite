import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

// --- Helpers ---
function getFilePath(filename: string) {
    return path.join(dataDir, filename);
}

function readJsonFile(filename: string, defaultData: any = []) {
    const filePath = getFilePath(filename);
    if (!fs.existsSync(filePath)) {
        // If it doesn't exist, create it with default data
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
        return defaultData;
    }
    const content = fs.readFileSync(filePath, 'utf8');
    try {
        return JSON.parse(content);
    } catch {
        return defaultData;
    }
}

function writeJsonFile(filename: string, data: any) {
    const filePath = getFilePath(filename);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// --- Jobs ---
export function getJobs() {
    // Due to previous architecture, jobs might be in an object { jobs: [] } or an array. Handle both.
    const data = readJsonFile('jobs.json', { jobs: [] });
    return Array.isArray(data) ? data : (data.jobs || []);
}

export function saveJobs(jobsArray: any[]) {
    writeJsonFile('jobs.json', { jobs: jobsArray });
}

export function getActiveJobs() {
    const jobs = getJobs();
    return jobs.filter((job: any) => job.status === 'active');
}

export function getJobById(id: string) {
    const jobs = getJobs();
    return jobs.find((job: any) => job.id === id);
}

// --- Applications ---
export function getApplications() {
    // Migrate old applications from jobs.json if needed
    const oldData = readJsonFile('jobs.json', { jobs: [], applications: [] });
    const oldApps = Array.isArray(oldData) ? [] : (oldData.applications || []);

    const apps = readJsonFile('applications.json', oldApps);

    // If we just migrated, save to new file
    if (oldApps.length > 0 && apps.length === oldApps.length && !fs.existsSync(getFilePath('applications.json'))) {
        writeJsonFile('applications.json', apps);
    }
    return apps;
}

export function saveApplications(appsArray: any[]) {
    writeJsonFile('applications.json', appsArray);
}

export function addApplication(application: any) {
    const applications = getApplications();
    const newApp = {
        id: Date.now().toString(),
        submittedAt: new Date().toISOString(),
        status: 'Pending', // Default status for new applications
        ...application
    };
    applications.push(newApp);
    saveApplications(applications);
    return newApp;
}

// --- Leads ---
export function getLeads() {
    return readJsonFile('leads.json', []);
}

export function saveLeads(leadsArray: any[]) {
    writeJsonFile('leads.json', leadsArray);
}

export function addLead(lead: any) {
    const leads = getLeads();
    const newLead = {
        id: Date.now().toString(),
        submittedAt: new Date().toISOString(),
        status: 'New',
        ...lead
    };
    leads.push(newLead);
    saveLeads(leads);
    return newLead;
}

// --- Ads ---
export function getAds() {
    return readJsonFile('ads.json', []);
}

export function saveAds(adsArray: any[]) {
    writeJsonFile('ads.json', adsArray);
}

export function addAd(ad: any) {
    const ads = getAds();
    const newAd = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        isActive: true,
        ...ad
    };
    ads.push(newAd);
    saveAds(ads);
    return newAd;
}
