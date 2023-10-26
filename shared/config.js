const rules = [
    { number: 1, title: 'No Random Deathmatch (RDM)', description: "Killing others without an roleplay scene or story to it, is not accepted and will lead to a ban." },
    { number: 2, title: "No Vehicle Deathmatch (VDM)", description: "Using vehicles as if you are playing GTA:O is not accepted, and will lead to a ban." }
];
// NO TOUCHY BELOW THIS LINE
const formattedRules = rules.map(rule => `${rule.number}: ${rule.title} - ${rule.description}`).join('\n');
