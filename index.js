const { execSync } = require('child_process');
const core = require('@actions/core');

function getCurrentVersion() {
    try {
        const versionTag = execSync('git describe --tags --abbrev=0').toString().trim();
        console.log(`Current version tag: ${versionTag}`);
        return versionTag.replace(/^v/, ''); // Remove the 'v' prefix if present
    } catch (error) {
        console.log('No tags found, defaulting to 0.0.0');
        return '0.0.0'; // Default if no tags found
    }
}

function incrementVersion(currentVersion, versionFragment) {
    const [major, minor, patch, preRelease] = currentVersion.split(/[.-]/).map((v) => parseInt(v, 10) || 0);

    switch (versionFragment) {
        case 'major':
            return `${major + 1}.0.0`;
        case 'feature': // Equivalent to 'minor'
            return `${major}.${minor + 1}.0`;
        case 'bug': // Equivalent to 'patch'
            return `${major}.${minor}.${patch + 1}`;
        case 'alpha':
            return `${major}.${minor}.${patch}-${preRelease ? `alpha.${preRelease + 1}` : 'alpha.1'}`;
        case 'beta':
            return `${major}.${minor}.${patch}-${preRelease ? `beta.${preRelease + 1}` : 'beta.1'}`;
        case 'pre':
            return `${major}.${minor}.${patch}-${preRelease ? `pre.${preRelease + 1}` : 'pre.1'}`;
        default:
            throw new Error(`Unsupported version fragment: ${versionFragment}`);
    }
}

async function run() {
    try {
        const versionFragment = core.getInput('version-fragment');
        const currentVersion = getCurrentVersion();
        const nextVersion = incrementVersion(currentVersion, versionFragment);
        console.log(`Next version: ${nextVersion}`);

        core.setOutput('next-version', nextVersion);
    } catch (error) {
        core.setFailed(`Action failed with error: ${error.message}`);
    }
}

run();
