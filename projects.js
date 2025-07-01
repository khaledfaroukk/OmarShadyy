// Portfolio Projects Data
// Add your projects here or modify existing ones

const projects = [
    {
        id: 1,
        title: "Zawya FIlm",
        brief: "Cairo’s premier independent cinema and festival hub, celebrating global and local filmmaking through screenings, dialogue, and community.",
        thumbnail: "assests/zawya.jpeg",
        media: [
            {
                type: "image",
                url: "assests/MORA.jpg",
            },
            {
                type: "image",
                url: "assests/mora2.jpg",
            },
            {
                type: "video",
                url: "assests/video1.mp4",
            },
            {
                type: "video",
                url: "assests/video2.mp4",
            },
        ],
        story: {
            description: "Established in March 2014 as one of Egypt’s pioneering art-house cinemas, located at Cinema Odeon before moving to the larger Cinema Karim in downtown's Emad El Deen Street Established in March 2014 as one of Egypt’s pioneering art-house cinemas, located at Cinema Odeon before moving to the larger Cinema Karim in downtown's Emad El Deen Street Established in March 2014 as one of Egypt’s pioneering art-house cinemas, located at Cinema Odeon before moving to the larger Cinema Karim in downtown's Emad El Deen Street ",
        }
    },
    {
        id: 2,
        title: "Zawya FIlm",
        brief: "Cairo’s premier independent cinema and festival hub, celebrating global and local filmmaking through screenings, dialogue, and community.",
        thumbnail: "assests/zawya.jpeg",
        media: [
            {
                type: "image",
                url: "assests/MORA.jpg",
            },
            {
                type: "image",
                url: "assests/mora2.jpg",
            },
            {
                type: "video",
                url: "assests/video1.mp4",
            },
            {
                type: "video",
                url: "assests/video2.mp4",
            },
        ],
        story: {
            description: "Established in March 2014 as one of Egypt’s pioneering art-house cinemas, located at Cinema Odeon before moving to the larger Cinema Karim in downtown's Emad El Deen Street",
        }
    },
    {
        id: 3,
        title: "Zawya FIlm",
        brief: "Cairo’s premier independent cinema and festival hub, celebrating global and local filmmaking through screenings, dialogue, and community.",
        thumbnail: "assests/zawya.jpeg",
        media: [
            {
                type: "image",
                url: "assests/MORA.jpg",
            },
            {
                type: "image",
                url: "assests/mora2.jpg",
            },
            {
                type: "video",
                url: "assests/video1.mp4",
            },
            {
                type: "video",
                url: "assests/video2.mp4",
            },
        ],
        story: {
            description: "Established in March 2014 as one of Egypt’s pioneering art-house cinemas, located at Cinema Odeon before moving to the larger Cinema Karim in downtown's Emad El Deen Street",
        }
    },

];

// Function to add new projects (for easy expansion)
function addProject(projectData) {
    const newProject = {
        id: projects.length + 1,
        ...projectData
    };
    projects.push(newProject);

    // If the portfolio is already loaded, re-render
    if (typeof renderProjects === 'function') {
        renderProjects();
    }
}

// Function to update existing project
function updateProject(projectId, updates) {
    const projectIndex = projects.findIndex(p => p.id === projectId);
    if (projectIndex !== -1) {
        projects[projectIndex] = {
            ...projects[projectIndex],
            ...updates
        };

        // Re-render if portfolio is loaded
        if (typeof renderProjects === 'function') {
            renderProjects();
        }
    }
}

// Function to remove project
function removeProject(projectId) {
    const projectIndex = projects.findIndex(p => p.id === projectId);
    if (projectIndex !== -1) {
        projects.splice(projectIndex, 1);

        // Re-render if portfolio is loaded
        if (typeof renderProjects === 'function') {
            renderProjects();
        }
    }
}

// Export for use in other files (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { projects, addProject, updateProject, removeProject };
}