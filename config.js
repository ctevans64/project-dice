const env = process.env;

export default {
    port: env.PORT || 8080,
    host: env.HOST || '0.0.0.0',
    mongodbUri: 'mongodb://localhost:27017/project-dice',
    mongodb: 'project-dice',
    get serverUrl() {
        return `http://${this.host}:${this.port}`;
    },
    invention: {
        name: "",
        author: "",
        dice: [
            {
                name: "Power",
                sides: [
                    "Manual",
                    "Solar",
                    "Wind",
                    "Water",
                    "Electric",
                    "Clockwork"
                ]
            },
            {
                name: "Implementation",
                sides: [
                    "Underwater",
                    "Flying",
                    "Self-build",
                    "Stealth",
                    "Random",
                ]
            },
            {
                name: "Application",
                sides: [
                    "Personal",
                    "Office",
                    "Industrial",
                    "Public",
                    "Family",
                    "Home",
                ]
            },
            {
                name: "Scale",
                sides: [
                    "Miniature",
                    "Portable",
                    "Wearable",
                    "Inhabitable",
                    "Giant",
                    "Picket",
                ]
            },
            {
                name: "Material",
                sides: [
                    "Wood",
                    "Plastic",
                    "Paper",
                    "Organic",
                    "Metal",
                    "Edible",
                ]
            },
            {
                name: "Device",
                sides: [
                    "Vehicle",
                    "Art",
                    "Game",
                    "Robot",
                    "Computer",
                    "Tool",
                ]
            }
        ]
    }
};