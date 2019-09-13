'use strict';
/*eslint no-unused-vars: */

function titleClickHandler(event){
  
  event.preventDefault();
  const clickedElement = this;
  
  
  
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  
  
  clickedElement.classList.add('active');
  
  const activeArticles = document.querySelectorAll('.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
 
  const articleSelector = clickedElement.getAttribute('href');
  console.log('Selektor artykulu',articleSelector);
  
  const  targetArticle = document.querySelector(articleSelector);
  
  targetArticle.classList.add('active');
}
  


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';


function generateTitleLinks (){
/* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  
  titleList.innerHTML = '';
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  
  
  
  let html = '';
  for (let article of articles){
    /* get the article id */
    const articleId = article.getAttribute('id');
  

  

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
 
    /* get the title from the title element */

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
   

    /* insert link into titleList */
    html = html + linkHTML;
  
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log('zawartość stałej links: ' ,links);
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }


}

generateTitleLinks();


function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('find all articles ' , articles);
  /* START LOOP: for every article: */
  for (let article of articles){
  /* find tags wrapper */
    const  tagWrapper = article.querySelector(optArticleTagsSelector);
    console.log('Tag Wrapper', tagWrapper);
    

    /* make html variable with empty string */
    let html=' ';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(' articleTags', articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log('articleTagsArray', articleTagsArray);
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray){
    /* generate HTML of the link */
      const tagHTML = '<li><a href="#tag-' + tag + ' ">'+ tag + '</a></li>';
   
      /* add generated code to html variable */
      html = html + tagHTML;
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
  /* END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
     event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
     const   clickedElement= this; 
  /* make a new constant "href" and read the attribute "href" of the clicked element */
     const href = clickedElement.getAttribute('href');
     console.log('Href!!!!!!!!!!!!!',href);
  /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log('tag from href  ' , tag);
  /* find all tag links with class active */
     const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
     console.log(' all tagLinks from href  ' , activeTags);
  /* START LOOP: for each active tag link */
  for(let activeTag of activeTags){
  /* remove class active */
  activeTag.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const allTagLinks = document.querySelectorAll('a[href = "'+ href+'"]');
  /* START LOOP: for each found tag link */
  for (let allTagLink of allTagLinks){
  /* add class active */
  allTagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const linkTags = document.querySelectorAll('.post-tags a, .tags a');
  console.log(' link tag  ' , linkTags);
  /* START LOOP: for each link */
  for (let linkTag of linkTags ){
  /* add tagClickHandler as event listener for that link */
    linkTag.addEventListener('click',tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();