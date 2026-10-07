(function(){
  var root=document.documentElement;
  try{var saved=localStorage.getItem('theme');if(saved)root.dataset.theme=saved;}catch(e){}
  document.getElementById('theme').addEventListener('click',function(){
    var light=getComputedStyle(root).getPropertyValue('--bg').trim()==='#f6f8fc';
    var next=light?'dark':'light';
    root.dataset.theme=next;
    try{localStorage.setItem('theme',next);}catch(e){}
  });
  var menu=document.getElementById('menu');
  document.getElementById('burger').addEventListener('click',function(){menu.classList.toggle('open');});
  menu.addEventListener('click',function(){menu.classList.remove('open');});
  document.getElementById('yr').textContent=new Date().getFullYear();
})();
