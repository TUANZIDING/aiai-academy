(function(){
  const chs=[...document.querySelectorAll('.ch')];
  const rail=document.getElementById('rail');
  const prev=document.getElementById('prev'),next=document.getElementById('next');
  const pnum=document.getElementById('pnum'),ptitle=document.getElementById('ptitle'),pfill=document.getElementById('pfill');
  let cur=-1;

  chs.forEach((c,i)=>{
    const b=document.createElement('button');
    b.innerHTML=`<i></i>${c.dataset.num}<span>${c.dataset.title}</span>`;
    b.setAttribute('aria-label',`${c.dataset.num} ${c.dataset.title}`);
    b.onclick=()=>go(i);rail.appendChild(b);
    [...c.children].forEach((el,k)=>{el.classList.add('reveal');el.style.setProperty('--i',Math.min(k,10));});
    c.querySelectorAll('.stepper li').forEach((li,k)=>li.style.setProperty('--n',k));
  });

  function go(i,fromHash){
    i=Math.max(0,Math.min(chs.length-1,i)); if(i===cur) return;
    chs.forEach((c,k)=>c.classList.toggle('on',k===i));
    [...rail.children].forEach((b,k)=>b.classList.toggle('on',k===i));
    chs[i].scrollTop=0; cur=i;
    pnum.textContent=chs[i].dataset.num; ptitle.textContent=chs[i].dataset.title;
    pfill.style.width=(i/(chs.length-1)*100)+'%';
    prev.disabled=i===0; next.disabled=i===chs.length-1;
    if(!fromHash) history.replaceState(null,'','#'+chs[i].id);
    window.dispatchEvent(new CustomEvent('chapter',{detail:i}));
    window.__chapter=i;
  }
  prev.onclick=()=>go(cur-1); next.onclick=()=>go(cur+1);
  document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(+b.dataset.go));
  addEventListener('keydown',e=>{
    if(e.target.closest&&e.target.closest('input,textarea')) return;
    if(e.key==='ArrowRight'||e.key==='PageDown') go(cur+1);
    if(e.key==='ArrowLeft'||e.key==='PageUp') go(cur-1);
  });
  // swipe
  let sx=0,sy=0,st=0;
  addEventListener('touchstart',e=>{const t=e.touches[0];sx=t.clientX;sy=t.clientY;st=Date.now();},{passive:true});
  addEventListener('touchend',e=>{
    const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;
    if(e.target.closest('pre,.tablewrap,.tree,.tabs')) return;
    if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.8&&Date.now()-st<600) go(cur+(dx<0?1:-1));
  },{passive:true});

  // tabs
  document.querySelectorAll('[data-tabs]').forEach(tb=>{
    const btns=[...tb.querySelectorAll('button')];
    btns.forEach(b=>b.onclick=()=>{
      btns.forEach(x=>{x.classList.toggle('on',x===b);const el=document.getElementById(x.dataset.tab);if(el) el.hidden=x!==b;});
    });
  });
  // flips
  document.querySelectorAll('.flip').forEach(f=>f.onclick=()=>f.classList.toggle('on'));
  // copy
  document.querySelectorAll('.prompt').forEach(p=>{
    const b=document.createElement('button');b.className='copy';b.textContent='复制';
    b.onclick=async()=>{
      const txt=p.querySelector('pre').innerText;
      try{await navigator.clipboard.writeText(txt);}catch(_){const ta=document.createElement('textarea');ta.value=txt;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();}
      b.textContent='已复制 ✓';b.classList.add('ok');setTimeout(()=>{b.textContent='复制';b.classList.remove('ok');},1600);
    };
    p.appendChild(b);
  });

  // order game
  const order=document.getElementById('order'),out=document.getElementById('orderout');
  let picked=[];
  order.querySelectorAll('button').forEach(b=>b.onclick=()=>{
    picked.push(+b.dataset.k);b.classList.add('used');
    const s=document.createElement('span');s.textContent=(picked.length)+'. '+b.textContent;out.appendChild(s);
    if(picked.length===4){
      const ok=picked.every((k,i)=>k===i);const r=document.createElement('span');
      r.className='res '+(ok?'ok':'no');r.textContent=ok?'✓ 完全正确：真实论文 → 矩阵 → 大纲 → 正文':'✕ 顺序不对，点这里重来';
      if(!ok) r.onclick=()=>{picked=[];out.innerHTML='';order.querySelectorAll('button').forEach(x=>x.classList.remove('used'));};
      out.appendChild(r);
    }
  });

  // quiz
  const Q=[
    ['给 Codex 的第一条指令，最好是哪一句？',['“帮我做科研。”','“先读当前文件夹和 AGENTS.md，复述目标、已有材料、缺失材料和下一步建议，先不要出结果。”','“直接生成最终报告。”'],1,'先让它进入任务上下文，而不是直接开始自由发挥。'],
    ['Skill 和提示词的关系是？',['Skill 就是更长的提示词','提示词解决“这一次怎么问”，Skill 是以后每次都按它走的成熟 SOP','两者没有区别'],1,'好的 Skill 写清：何时用、要什么输入、什么步骤、调用哪些脚本、输出什么、不能做什么。'],
    ['装好一个很火的 Skill，第一步该做什么？',['马上用它写论文','让 Codex 先读 SKILL.md，总结适用范围、输入输出、限制和与我课题的适配度','再去找一个更火的'],1,'热度不等于适配，学科不匹配就修改流程或自建 Skill。'],
    ['下面哪种找文献的方式最危险？',['让 AI 直接“推荐 20 篇相关论文”','先拆概念矩阵再生成检索式','用 Skill 调 PubMed / Scholar 真实检索并导出元数据'],0,'模型可能凭记忆列出看似真实的文献，没有 DOI、PMID 或链接可核查。'],
    ['论文里的统计图应该怎么得到？',['用图片生成模型直接画','由 Python 或 R 代码基于真实数据生成并保留代码','从相似论文里截图修改'],1,'代码和数据可追溯；美化图表时也只改样式，不改统计结果。'],
    ['把论文变成答辩 PPT，核心是什么？',['把论文段落复制进去','重新组织答辩逻辑，每页只讲一个核心信息','每页尽量多放文字以免遗漏'],1,'先拆逻辑、再出大纲并确认，最后才生成 PPT 和逐页讲稿。']
  ];
  const quiz=document.getElementById('quiz'),score=document.getElementById('score');let done=0,right=0;
  Q.forEach((q,qi)=>{
    const d=document.createElement('div');d.className='q';
    d.innerHTML=`<h4><i>Q${qi+1}</i>${q[0]}</h4><div class="opts"></div><p class="why">${q[3]}</p>`;
    const opts=d.querySelector('.opts');
    q[1].forEach((o,oi)=>{const b=document.createElement('button');b.textContent=o;b.onclick=()=>{
      d.classList.add('done');b.classList.add(oi===q[2]?'right':'wrong');opts.children[q[2]].classList.add('right');
      done++;if(oi===q[2])right++;
      if(done===Q.length){score.hidden=false;score.textContent=`得分 ${right} / ${Q.length}`+(right===Q.length?' · 全对，可以上手了':' · 回看对应章节再试试');}
    };opts.appendChild(b);});
    quiz.appendChild(d);
  });

  const h=location.hash.slice(1);const idx=chs.findIndex(c=>c.id===h);
  go(idx>=0?idx:0,true);
})();
