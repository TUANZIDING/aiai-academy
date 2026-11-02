(()=>{'use strict';
const cues=[
[1,5,'黄仁勋','I think my cognitive skills are actually advancing.','我觉得自己的认知能力实际上正在进步。'],
[5,13,'黄仁勋',"And the reason for that is because I'm not asking it to think for me.",'原因在于，我并没有要求它替我思考。'],
[13,22,'黄仁勋',"I'm asking it to teach me things that I don't know, or help me solve problems that I otherwise wouldn't be able to solve reasonably.",'我让它教我不懂的东西，或者帮我解决那些原本难以妥善解决的问题。'],
[22,28,'主持人',"So that's important. Don't use it as a crutch for things you can do. Use it for things you can't do.",'这一点很重要。对于自己能做的事，别把它当作拐杖；要用它去做自己做不到的事。'],
[28,34,'黄仁勋',"Yes. I'm not exactly sure what people are using it for that would cause you to not have to think.",'对。我不太清楚，人们究竟拿它做什么，才会让自己不必思考。'],
[34,42,'黄仁勋',"You have to think. For example, the idea of prompting an AI, the idea of asking questions —",'你必须思考。比如，给 AI 写提示词、向它提问——'],
[42,46,'黄仁勋',"for example, you're spending most of your time today asking me questions.",'比如，你今天大部分时间都在向我提问。'],
[46,51,'黄仁勋',"In order to ask good questions, it's a highly cognitive skill.",'要提出好问题，需要很强的认知能力。'],
[51,56,'黄仁勋',"And as a CEO, I spend most of my time asking questions.",'而作为 CEO，我大部分时间也在提问。'],
[56,62.5,'黄仁勋',"And ninety percent of my instructions are actually, you know, conflated with questions.",'而我百分之九十的指令，其实都融在提问当中。']];
const v=document.querySelector('#video'),box=document.querySelector('#lines');let active=-1,loop=false,auto=false,loopIndex=-1,lastTime=0,frame=0,handled=-1;
const fmt=t=>Math.floor(t/60)+':'+String(Math.floor(t%60)).padStart(2,'0');
const buttons=cues.map((c,i)=>{const b=document.createElement('button');b.className='cue';b.id='cue-'+i;for(const [cl,txt] of [['stamp',fmt(c[0])+' · '+c[2]],['en',c[3]],['zh',c[4]]]){const s=document.createElement('span');s.className=cl;s.textContent=txt;b.append(s)}b.onclick=()=>{handled=-1;loopIndex=i;v.currentTime=c[0];lastTime=c[0];v.play().catch(()=>{});sync()};box.append(b);return b});
function sync(){const t=v.currentTime;document.querySelector('#time').textContent=fmt(t);let i=cues.findIndex(c=>t>=c[0]&&t<c[1]);if(loop&&loopIndex>=0&&t>=cues[loopIndex][1]){v.currentTime=cues[loopIndex][0];lastTime=v.currentTime;return}if(auto&&!loop&&!v.paused&&!v.seeking){const crossed=cues.findIndex((c,k)=>k!==handled&&lastTime<c[1]&&t>=c[1]&&t-lastTime<1);if(crossed>=0){handled=crossed;v.pause()}}lastTime=t;if(auto&&v.paused&&handled>=0&&Math.abs(t-cues[handled][1])<0.15)i=handled;if(i===active)return;buttons.forEach((b,k)=>{b.classList.toggle('on',k===i);if(k===i)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current')});active=i;if(i>=0){const b=buttons[i];box.scrollTo({top:Math.max(0,b.offsetTop-box.offsetTop-box.clientHeight/3),behavior:v.paused?'auto':'smooth'})}}
function poll(){sync();if(!v.paused)frame=requestAnimationFrame(poll)}
v.addEventListener('play',()=>{cancelAnimationFrame(frame);poll()});['timeupdate','pause','loadedmetadata','seeked','ended'].forEach(e=>v.addEventListener(e,sync));v.addEventListener('seeking',()=>{lastTime=v.currentTime;handled=-1;sync()});v.addEventListener('error',()=>document.querySelector('#error').hidden=false);
document.querySelector('#speed').onchange=e=>v.playbackRate=Number(e.target.value);
document.querySelector('#loop').onclick=e=>{loop=!loop;loopIndex=active<0?0:active;e.currentTarget.setAttribute('aria-pressed',String(loop));if(loop){v.currentTime=cues[loopIndex][0];v.play().catch(()=>{})}};
document.querySelector('#autopause').onclick=e=>{auto=!auto;handled=-1;e.currentTarget.setAttribute('aria-pressed',String(auto))};
document.querySelectorAll('[data-language]').forEach(b=>b.onclick=()=>{document.querySelector('#panel').dataset.lang=b.dataset.language;document.querySelectorAll('[data-language]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)))});
})();
