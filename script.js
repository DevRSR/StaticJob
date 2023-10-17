const cards = document.querySelector('.cards');
const del = document.querySelector('.div');
const search = document.querySelector('.search');
const clear = document.querySelector('.clear');
let term;

 
 document.onclick = (e) => {
   if(e.target.className == "close") {
     del.removeChild(e.target.parentNode);
    if(del.childElementCount == 0 ) {
     search.classList.add('hide')
    }
    term = "";
    collect()
   }
   if(e.target.className == 'paragraph') {
     add(e.target)
   }
   
 }
 
 
 clear.onclick = () => {
    search.classList.add('hide');
    term = "";
    collect();
    for (let i = 3; i > del.childElementCount; i--) {
    del.removeChild(document.querySelector('div p'))
   }
 }
 
 function add (element) {
   search.classList.remove('hide')
   if(del.childElementCount < 3){
     let content='';
     const p = document.createElement('p');
     content = `${element.textContent} <a class="close" href="#">X</a>
     `;
     p.innerHTML = content;
     del.appendChild(p)
     term = element.textContent;
     collect()
   }
 }
 
async function collect () {
  let url = 'http://localhost:3000/works';
  if(term){
   url+=`?&q=${term}`
  }
  let data = await fetch(url);
  let infos = await data.json();
  let template='';
  
  function links (content) {
    let link = '';
    for (let i = 0; i < content.length; i++) {
      link+= `<a class="paragraph" href="#">${content[i]}</a>`
    }
    return link
  }
  
  
  infos.forEach(info => {
   template += ` 
      <div class="card">
       <div class="first-div">
         <img src=${info.logo} alt="" />
          <div class="about">
            <div class="aboutI">
              <h4>${info.company}</h4>
              ${ info.new ?
               '<p class="new">New!</p>' :
               '<p></p>' 
              }
              ${ info.featured ?
              '<p class="feature">Featured</p>' :
              '<p></p>'
              }
            </div>
            <p class="role">${info.position}</p>
            <div class="aboutII">
              <p>${info.postedAt}</p>
              <span>.</span>
              <p>${info.contract}</p>
              <span>.</span>
              <p>${info.location}</p>
            </div>
          </div>
        </div>
        <div class="props">
          <a class="paragraph" href="#">${info.role}</a>
          <a class = "paragraph" href="#">${info.level}</a>
          ${ info.languages.length > 0 ?
            links(info.languages) : '<a class=hide></a>'
          }
          ${ info.tools.length > 0 ?
            links(info.tools) : '<a class=hide></a>'
          }
        </div>
      </div>
   `;
   
  })
   cards.innerHTML = template;
}


collect()

if(del.childElementCount == 0 ) {
  search.classList.add('hide')
}