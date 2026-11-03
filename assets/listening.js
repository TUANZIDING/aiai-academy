(()=>{'use strict';
const $=s=>document.querySelector(s),v=$('#video'),box=$('#lines');
let lessons=[],lesson,cues=[],buttons=[],active=-1,loop=false,auto=false,loopIndex=0,lastTime=0,frame=0,handled=-1;
const fmt=t=>Math.floor(t/60)+':'+String(Math.floor(t%60)).padStart(2,'0');
const find=t=>cues.findIndex(c=>t>=c.start&&t<c.end);
function play(){v.play().catch(()=>{});}
function seek(i){if(!cues[i])return;if(v.readyState===0){const expected=lesson.id;v.addEventListener('loadedmetadata',()=>{if(lesson.id===expected)seek(i)},{once:true});return}handled=-1;loopIndex=i;v.currentTime=cues[i].start;lastTime=v.currentTime;sync();play()}
function highlight(i){if(active===i)return;active=i;buttons.forEach((b,k)=>{b.classList.toggle('on',k===i);if(k===i)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current')});if(i>=0){const b=buttons[i];box.scrollTo({top:Math.max(0,b.offsetTop-box.clientHeight/3),behavior:'auto'})}}
function sync(){const t=v.currentTime;$('#time').textContent=fmt(t)+' / '+fmt(lesson?.duration||0);if(!cues.length)return;
 if(loop&&t>=cues[loopIndex].end&&!v.seeking){const ended=v.ended;v.currentTime=cues[loopIndex].start;lastTime=v.currentTime;highlight(loopIndex);if(ended)play();return}
 let i=find(t);if(auto&&!loop&&!v.paused&&!v.seeking&&t-lastTime<1){const crossed=cues.findIndex((c,k)=>k!==handled&&lastTime<c.end&&t>=c.end);if(crossed>=0){handled=crossed;v.pause();i=crossed}}
 lastTime=t;if(auto&&v.paused&&handled>=0&&Math.abs(t-cues[handled].end)<.25)i=handled;highlight(i);
}
function poll(){sync();if(!v.paused)frame=requestAnimationFrame(poll)}
v.addEventListener('play',()=>{cancelAnimationFrame(frame);poll()});
['timeupdate','pause','loadedmetadata','seeked','ended'].forEach(e=>v.addEventListener(e,sync));
v.addEventListener('seeking',()=>{lastTime=v.currentTime;handled=-1;const i=find(v.currentTime);if(loop&&i>=0)loopIndex=i;highlight(i)});
v.addEventListener('error',()=>$('#error').hidden=false);
$('#retry').onclick=()=>{const t=v.currentTime;$('#error').hidden=true;v.load();v.addEventListener('loadedmetadata',()=>{v.currentTime=t;play()},{once:true})};
$('#speed').onchange=e=>v.playbackRate=Number(e.target.value);
$('#loop').onclick=e=>{loop=!loop;loopIndex=active<0?0:active;e.currentTarget.setAttribute('aria-pressed',String(loop));if(loop)seek(loopIndex)};
$('#autopause').onclick=e=>{auto=!auto;handled=-1;e.currentTarget.setAttribute('aria-pressed',String(auto))};
document.querySelectorAll('[data-language]').forEach(b=>b.onclick=()=>{$('#panel').dataset.lang=b.dataset.language;document.querySelectorAll('[data-language]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)))});
function sourceLink(label,url){const a=document.createElement('a');a.textContent=label;a.href=url;a.target='_blank';a.rel='noopener';return a}
function select(id,push=false){const next=lessons.find(x=>x.id===id)||lessons[0];id=next.id;v.pause();cancelAnimationFrame(frame);lesson=next;cues=next.cues;active=-1;handled=-1;lastTime=0;loop=false;$('#loop').setAttribute('aria-pressed','false');$('#error').hidden=true;
 $('#title').textContent=next.title;$('#meta').textContent=next.speaker+' · '+next.speakerEn+' · '+fmt(next.duration)+' · '+next.id+' / 10';document.title=next.title+' · 逐句精听 | aiai';$('#credit').textContent=next.credit+' · '+next.date+' · 经典访谈选段';
 const p=$('#provenance');p.replaceChildren();const detail=document.createElement('p');detail.textContent=next.changes;p.append(detail,sourceLink('原始视频与署名',next.source),document.createTextNode(' · '),sourceLink(next.license,next.licenseUrl));const note=document.createElement('p');note.textContent='英文以项目公开字幕为底稿，结合原片语音识别复核；中文为逐句翻译。片段时间轴从零开始。';p.append(note,sourceLink('原始英文字幕',next.subtitleSource),document.createTextNode(' · '),sourceLink('双语字幕下载','../data/listening/clip-'+id+'.vtt'));
 box.replaceChildren();buttons=cues.map((c,i)=>{const b=document.createElement('button');b.className='cue';b.dataset.index=i;for(const [cl,txt] of [['stamp',fmt(c.start)+' · '+c.speaker],['en',c.en],['zh',c.zh]]){const s=document.createElement('span');s.className=cl;s.textContent=txt;b.append(s)}b.onclick=()=>seek(i);box.append(b);return b});box.scrollTop=0;
 v.poster=next.poster;v.src=next.video;v.playbackRate=Number($('#speed').value);v.load();$('#time').textContent='0:00 / '+fmt(next.duration);
 document.querySelectorAll('.film').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.id)===id)));
 if(push){const u=new URL(location.href);u.searchParams.set('study',id);u.hash='clip-'+id;history.pushState(null,'',u);document.body.classList.add('study')}
}
function urlId(){return Number(new URL(location.href).searchParams.get('study')||location.hash.match(/clip-(\d+)/)?.[1]||1)}
$('#prev').onclick=()=>$('#films').scrollBy({left:-520,behavior:'smooth'});$('#next').onclick=()=>$('#films').scrollBy({left:520,behavior:'smooth'});
window.addEventListener('popstate',()=>{document.body.classList.toggle('study',new URL(location.href).searchParams.has('study'));select(urlId())});
fetch('../data/listening-lessons.json?v=3').then(r=>{if(!r.ok)throw Error('load');return r.json()}).then(data=>{lessons=data;data.forEach(x=>{const b=document.createElement('button');b.className='film';b.dataset.id=x.id;b.setAttribute('aria-pressed','false');const img=document.createElement('img');img.src=x.poster;img.alt='';img.loading='lazy';const info=document.createElement('span');info.className='info';const a=document.createElement('small');a.textContent=String(x.id).padStart(2,'0')+' / 10 · '+fmt(x.duration);const title=document.createElement('strong');title.textContent=x.title;const s=document.createElement('small');s.textContent=x.speaker+' · '+x.speakerEn;info.append(a,title,s);b.append(img,info);b.onclick=()=>select(x.id,true);$('#films').append(b)});document.body.classList.toggle('study',new URL(location.href).searchParams.has('study'));select(urlId());document.querySelector('.film[aria-pressed=true]')?.scrollIntoView({block:'nearest',inline:'center'})}).catch(()=>{$('#loadError').hidden=false;$('#title').textContent='课程暂时无法加载'});
})();
