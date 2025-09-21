async function loadProjectsData() {
  const response = await fetch("/assets/allprojectsData.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const projects = data.projects;

      displayProjects(projects);
    })
    .catch((error) => {
      console.error("Error loading projects data:", error);
    });
  return response;
}

const displayProjects = (projects = []) => {
  const projectsContainer = document.getElementById("projects-grid-container");
  projectsContainer.innerHTML = ""; // Clear existing content
  if (projects.length > 0 && projects) {
    projects.forEach((project) => {
      const projectCard = document.createElement("div");
      projectCard.className = "project-card";
      projectCard.setAttribute("data-categories", project.categories.join(","));
      projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-overlay">
                    <a href="${
                      project.links.demo
                    }" class="project-link" aria-label="View ${project.title}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="16"></line>
                            <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                    </a>
                    <a href="${
                      project.links.github
                    }" class="project-link" aria-label="GitHub Repository">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                    </a>
                </div>
            </div>
            <div class="project-info">
                <div class="project-meta">
                    <span class="project-category">${project.categories.join(
                      ", "
                    )}</span>
                    <span class="project-date">${project.date}</span>
                </div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies
                      .map((tech) => `<span class="tech-tag">${tech}</span>`)
                      .join("")}
                </div>
            </div>
        `;
      projectsContainer.appendChild(projectCard);
    });
  } else {
    projectsContainer.innerHTML = `<p class="no-projects">No projects found.</p>`;
  }
};

export { loadProjectsData, displayProjects };
