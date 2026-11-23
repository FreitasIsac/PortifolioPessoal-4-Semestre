
const menuToggle=document.getElementById('menuToggle'),nav=document.getElementById('nav');
const panels=[...document.querySelectorAll('.searchable')];
let currentPanel='inicio';
function showPanel(id, updateHash=true){
  const target=panels.find(panel=>panel.id===id) || panels[0];
  currentPanel=target.id;
  panels.forEach(panel=>{panel.classList.toggle('panel-active',panel===target);panel.style.display=panel===target?'':'none';});
  nav.querySelectorAll('a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+target.id));
  document.getElementById('emptySearch').style.display='none';
  if(updateHash && location.hash!=='#'+target.id) history.replaceState(null,'','#'+target.id);
  nav.classList.remove('open');
  target.classList.remove('panel-enter');void target.offsetWidth;target.classList.add('panel-enter');
}
// Começa mostrando apenas a tela inicial; as demais abas abrem sob demanda.
showPanel(location.hash.slice(1)||'inicio',false);
menuToggle.addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();showPanel(link.getAttribute('href').slice(1));}));
// Links internos do conteúdo também alternam a aba em vez de fazer rolagem.
document.querySelectorAll('main a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{const id=link.getAttribute('href').slice(1);if(panels.some(panel=>panel.id===id)){event.preventDefault();showPanel(id);}}));
const search=document.getElementById('siteSearch'),empty=document.getElementById('emptySearch');
search.addEventListener('input',()=>{
  const term=search.value.trim().toLocaleLowerCase('pt-BR');
  if(!term){showPanel(currentPanel,false);return;}
  const matches=panels.filter(panel=>panel.innerText.toLocaleLowerCase('pt-BR').includes(term));
  panels.forEach(panel=>{panel.style.display=matches.includes(panel)?'':'none';panel.classList.toggle('panel-active',matches.includes(panel));});
  nav.querySelectorAll('a').forEach(a=>a.classList.remove('active'));
  empty.style.display=matches.length?'none':'block';
});
