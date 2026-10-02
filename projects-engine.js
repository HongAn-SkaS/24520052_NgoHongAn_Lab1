async function fetchProjects() {
  const res = await fetch('./data/projects.json');

  if (!res.ok) {
    throw new Error(`Failed to fetch projects: ${res.status}`);
  }

  const projects = await res.json();
  return projects;
}

function renderProjects(list) {
  const container = document.querySelector('#projects-container');
  const status = document.querySelector('#projects-status');

  container.replaceChildren();

  list.forEach(function (project) {
    const item = document.createElement('li');
    const article = document.createElement('article');

    const header = document.createElement('header');
    const title = document.createElement('h3');
    title.textContent = project.title;
    header.appendChild(title);

    const description = document.createElement('p');
    description.textContent = project.description;

    const tagsList = document.createElement('ul');
    tagsList.classList.add('project-tags');

    project.tags.forEach(function (tag) {
      const tagItem = document.createElement('li');
      tagItem.classList.add('badge');
      tagItem.textContent = tag;
      tagsList.appendChild(tagItem);
    });

    const link = document.createElement('a');
    link.href = project.repoUrl;
    link.setAttribute('aria-label', `Xem repo ${project.title}`);
    link.textContent = 'Source Code';

    article.append(
      header,
      description,
      tagsList,
      link
    );

    item.appendChild(article);
    container.appendChild(item);
  });

  container.setAttribute('aria-busy', 'false');
  status.textContent = `${list.length} projects loaded`;
}

async function initProjects() {
  const list = await fetchProjects();
  renderProjects(list);
}

initProjects();