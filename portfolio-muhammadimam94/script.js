(function(){
  var root=document.documentElement;
  try{var saved=localStorage.getItem('theme');if(saved)root.dataset.theme=saved;}catch(e){}
  document.getElementById('theme').addEventListener('click',function(){
    var next=root.dataset.theme==='light'?'dark':'light';
    root.dataset.theme=next;
    try{localStorage.setItem('theme',next);}catch(e){}
  });
  var side=document.getElementById('side');
  document.getElementById('burger').addEventListener('click',function(){side.classList.toggle('open');});
  var links=[].slice.call(document.querySelectorAll('#menu a'));
  links.forEach(function(a){a.addEventListener('click',function(){side.classList.remove('open');});});
  var crumb=document.getElementById('crumb');
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting)return;
      links.forEach(function(a){
        var on=a.getAttribute('href')==='#'+e.target.id;
        a.classList.toggle('on',on);
        if(on)crumb.textContent=a.textContent;
      });
    });
  },{rootMargin:'-30% 0px -60% 0px'});
  links.forEach(function(a){var s=document.querySelector(a.getAttribute('href'));if(s)io.observe(s);});
  document.getElementById('yr').textContent=new Date().getFullYear();
})();
