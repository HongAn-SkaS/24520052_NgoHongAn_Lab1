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

function buildStateBlock(message, retryId) {
  const item = document.createElement('li');
  item.classList.add('state-block');

  const paragraph = document.createElement('p');
  paragraph.textContent = message;

  const button = document.createElement('button');
  button.id = retryId;
  button.type = 'button';
  button.textContent = 'Retry';

  button.addEventListener('click', function () {
    load();
  });

  item.append(paragraph, button);

  return item;
}

function renderEmpty() {
  const container = document.querySelector('#projects-container');
  const status = document.querySelector('#projects-status');

  container.replaceChildren();

  status.textContent = 'No projects yet.';

  container.appendChild(
    buildStateBlock('No projects to show yet.', 'retry-btn')
  );

  container.setAttribute('aria-busy', 'false');
}

function renderError(err) {
  const container = document.querySelector('#projects-container');
  const status = document.querySelector('#projects-status');

  container.replaceChildren();

  status.textContent = 'Failed to load projects.';

  container.appendChild(
    buildStateBlock('Something went wrong.', 'retry-btn')
  );

  container.setAttribute('aria-busy', 'false');
}

async function load() {
  const container = document.querySelector('#projects-container');
  const status = document.querySelector('#projects-status');

  status.textContent = 'Loading projects…';
  container.setAttribute('aria-busy', 'true');

  try {
    const list = await fetchProjects();

    if (list.length === 0) {
      renderEmpty();
    } else {
      renderProjects(list);
    }
  } catch (err) {
    renderError(err);
  }
}

load();