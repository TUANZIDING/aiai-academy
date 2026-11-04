(()=>{
 const root=document.querySelector('.landing'),art=document.querySelector('.art img'),light=document.querySelector('.light'),button=document.querySelector('.motion-toggle');
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');let paused=false;
 const x=Motion.springValue(.5,{stiffness:32,damping:20}),y=Motion.springValue(.5,{stiffness:32,damping:20});
 function draw(){art.style.transform=`translate3d(${(x.get()-.5)*-1.8}%,${(y.get()-.5)*-1.2}%,0) scale(1.035)`;light.style.transform=`translateX(${(x.get()-.5)*8}%)`;}
 x.on('change',draw);y.on('change',draw);
 root.addEventListener('pointermove',e=>{if(paused||reduce.matches||e.pointerType!=='mouse')return;const r=root.getBoundingClientRect();x.set(Math.max(0,Math.min(1,(e.clientX-r.left)/r.width)));y.set(Math.max(0,Math.min(1,(e.clientY-r.top)/r.height)));});
 root.addEventListener('pointerleave',()=>{if(!paused){x.set(.5);y.set(.5);}});
 button.addEventListener('click',()=>{paused=!paused;root.classList.toggle('paused',paused);x.jump(x.get());y.jump(y.get());button.setAttribute('aria-pressed',String(paused));button.setAttribute('aria-label',paused?'恢复动态':'暂停动态');button.title=paused?'恢复动态':'暂停动态';button.querySelector('path').setAttribute('d',paused?'M7 4l8 6-8 6Z':'M7 5v10M13 5v10');});
 function sync(){root.classList.toggle('paused',paused||reduce.matches||document.hidden);if(reduce.matches||document.hidden){x.jump(x.get());y.jump(y.get());}}
 reduce.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);sync();
})();
