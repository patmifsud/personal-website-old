window.onload = (e) => {
  const projectsDom = document.querySelector('#projects-list');
  const blogsDom = document.querySelector('#blogs');
  const seeMoreProjectLink = document.querySelector('#projects .see-more');

  const initalProjectsShown = 2
  const initalBlogsShown = 2


  // add first 2 projects to the dom
  for (let i = 0; i < initalProjectsShown; i++) {
    projectsDom.append(
      makeProjectNode(siteContent.projects[i])
    )
  }

  introAnimation();

  // event listeners
  seeMoreProjectLink.addEventListener('click', 
    function(){
      loadMoreLinks(
        initalProjectsShown,
        siteContent.projects, 
        projectsDom)
    },  
  false);

};


const makeProjectNode = function(proj){
  const parent = makeNode(
    'div', 
    '.project'
  )
  const thumb = makeNode(
    'div', '.thumbnail', 
    makeNode(
      'div', '.inner', 
    )
  )
  const text = makeNode(
    'div', 
    '.project-text', 
    makeInnerProjectNode(proj)
  )
  parent.append(
    thumb,
    text
  )
  return parent;
}

const makeInnerProjectNode = function (proj) {

  const parent = makeNode(
    'header', ' '
  )

  const h2 = makeNode(
    'h2', '', proj.name
  )

  const p = makeNode(
    'p', '', proj.desc[0]
  )

  const article = makeNode(
    'article', 
    `.closed .${proj.id}`, 
    makePTagsFromArray(
      proj.desc.slice(1)
  ))

  const viewSiteLink = makeNode(
    'a', '', 'View website')
  viewSiteLink.href= proj.url
  viewSiteLink.title = `Go to ${proj.name}`
  viewSiteLink.target= '_blank';

  const readMoreLink = makeNode(
    'a', `.${proj.id}Link`, 'Read more')
  readMoreLink.addEventListener('click', 
    function(){
      expandTextDiv(proj);
    },
  false);

  const links = makeNode(
    'div', '.links', readMoreLink
  );
  links.append(viewSiteLink);
  
  parent.append(
    h2, 
    p, 
    article, 
    links
  )
  return parent
}



const introAnimation = function () {
  anime({
    targets: 'nav',
    opacity: 1,
    duration: 5000,
  });

  anime({
    targets: 'section',
    opacity: 1,
    delay: anime.stagger(350, { start: 350 }),
    duration: 5000,
  });

  anime({
    targets: '.project',
    opacity: 1,
    easing: 'easeInOutExpo',
    delay: anime.stagger(200, { start: 300}),
    duration: 2000,
  });

  anime({
    targets: '.see-more',
    opacity: 1,
    easing: 'easeInOutExpo',
    delay: anime.stagger(200, { start: 1500}),
    duration: 2000,
  });
};


const expandTextDiv = function (proj) {
  const div = document.querySelector(`.${proj.id}`);
  const link = document.querySelector(`.${proj.id}Link`);
  
  link.classList.add("disabled");

  if (div.style.opacity == 0){
    anime({
      targets: `.${proj.id}`,
      maxHeight: '18rem',
      opacity: 1,
      easing: 'easeOutCubic',
      duration: 1500,
    });
    link.innerHTML = 'Read less';
  } else {
    anime({
      targets: `.${proj.id}`,
      maxHeight: '0',
      opacity: 0,
      easing: 'easeOutExpo',
      duration: 1500,
    });
    link.innerHTML = 'Read more';
  }
  setTimeout(function(){
    link.classList.remove("disabled");
  }, 1500);
}


const loadMoreLinks = function (initalNum, source, dom) {
  for (let i = initalNum; i < source.length; i++) {
    document.querySelector('.see-more').style.display = "none"

    const newLink = makeProjectNode(source[i])
    newLink.style.maxHeight = '1px';
    newLink.style.opacity = 0;
    dom.append(newLink);

    anime({
      targets: `#projects-list .project:nth-child(n+${initalNum + 1})`,
      maxHeight: '250px',
      opacity: 1,
      easing: 'easeInOutQuart',
      duration: 1800,
    });
  }

}



// ------------------------------------------------
// 🔨 FUNCTIONS TO MAKE DOM ELEMENTS

// 🏭
// factory to make a html node | based loosly on https://bit.ly/3qE9WB8
// e.g. makeNode("div", ".class #id", "content here")

const makeNode = function (type, attributes, ...content) {
  let el = makeElement(type, attributes);
  content.forEach((child) => {
    if (typeof child === 'string') {
      el.innerHTML = child;
    } else el.append(child);
  });
  return el;
};

// 🏭
// factory to turn string '.class .class #id' into html attributes
const makeElement = function (type, attributes) {
  let el = document.createElement(type);
  const attrArray = attributes.split(' ');
  let attrObj = {};

  attrArray.forEach((attr) => {
    let attrValue = attr.slice(1);
    if (attr.charAt(0) === '#') {
      attrObj.id = attrValue;
    } else if (attr.charAt(0) === '.') {
      const cl = attrObj.class;
      attrObj.class = cl ? cl + ' ' + attrValue : attrValue;
    }
  });
  Object.keys(attrObj).forEach(key => {
    el.setAttribute(key, attrObj[key]);
  });
  return el;
};


const makePTagsFromArray = function(array){
  let result = makeNode(
    "div", "", ''
  )
  for (let i = 0; i < array.length; i++) {
    result.append(
      makeNode(
        "p", "", array[i]
  ))}
  return result;
}
