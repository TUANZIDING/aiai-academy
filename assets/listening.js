'use strict';
(async () => {
  const response = await fetch('../data/listening-clips.json');
  if (!response.ok) throw Error('选片数据加载失败');
  const {items} = await response.json();
  const $ = id => document.getElementById(id);
  const studyMode = new URLSearchParams(location.search).has('study');
  let version = 0;
  let widgetsPromise;
  function widgets() {
    if (window.twttr?.widgets) return Promise.resolve(window.twttr.widgets);
    if (!widgetsPromise) widgetsPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      const timer = setTimeout(() => reject(Error('timeout')), 15000);
      script.src = 'https://platform.twitter.com/widgets.js';
      script.onload = () => {clearTimeout(timer); window.twttr?.widgets ? resolve(window.twttr.widgets) : reject(Error('unavailable'));};
      script.onerror = () => {clearTimeout(timer); reject(Error('unavailable'));};
      document.head.append(script);
    }).catch(error => {widgetsPromise = null; throw error;});
    return widgetsPromise;
  }
  async function embed(x, currentVersion) {
    const player = $('player');
    const slot = document.createElement('div');
    const status = document.createElement('p');
    status.className = 'load-status';
    status.setAttribute('role','status');
    status.textContent = '正在加载当前视频…';
    const fallback = document.createElement('a');
    fallback.href = x.url; fallback.target = '_blank'; fallback.rel = 'noopener noreferrer';
    fallback.textContent = '无法播放？在 X 打开当前视频 ↗';
    player.replaceChildren(status, slot, fallback);
    try {
      const api = await widgets();
      if (currentVersion !== version) return;
      let timer;
      const result = await Promise.race([
        api.createTweet(x.id, slot, {conversation:'none', dnt:true, align:'center'}),
        new Promise((_,reject) => {timer=setTimeout(()=>reject(Error('timeout')),15000);})
      ]).finally(()=>clearTimeout(timer));
      if (currentVersion !== version) return;
      if (!result) throw Error('unavailable');
      status.remove();
    } catch (error) {
      if (currentVersion !== version) return;
      status.textContent = 'X 播放器未能加载。可重试，或在 X 打开这段视频。';
      const retry = document.createElement('button');
      retry.className = 'load'; retry.textContent = '重试当前视频';
      retry.onclick = () => embed(x, ++version);
      slot.replaceChildren(retry);
    }
  }
  function show(i) {
    const x = items[i];
    const duration = Math.floor(x.duration/60)+':'+String(x.duration%60).padStart(2,'0');
    document.querySelectorAll('.film').forEach((button,j)=>button.setAttribute('aria-pressed',String(j===i)));
    $('selectedLesson').textContent = x.speaker+' · '+x.title+' · '+duration;
    $('studyLink').href = '?study='+(i+1)+'#clip-'+(i+1);
    $('studyLink').setAttribute('aria-label','开始学习：'+x.speaker+' · '+x.title);
    $('title').textContent = x.title;
    $('meta').textContent = x.speaker+' · '+duration+' · X 发布 '+x.date;
    $('focus').textContent = x.focus;
    $('question').textContent = x.question;
    $('words').textContent = '练习词汇：'+x.words;
    if(studyMode) {document.querySelector('h1').textContent=x.speaker+' · '+x.title;document.title=x.title+' · AI 原声学习 | aiai';}
    history.replaceState(null,'',location.pathname+location.search+'#clip-'+(i+1));
    embed(x, ++version);
  }
  if(studyMode){document.body.classList.add('study-mode');const back=document.querySelector('header a');back.href='listening'+location.hash;back.textContent='← 返回选片';}
  document.querySelectorAll('.film').forEach(button=>button.onclick=()=>show(Number(button.dataset.index)));
  $('prev').onclick=()=>$('shelf').scrollBy({left:-254,behavior:'smooth'});
  $('next').onclick=()=>$('shelf').scrollBy({left:254,behavior:'smooth'});
  const initial = Number(new URLSearchParams(location.search).get('study') || location.hash.replace('#clip-',''))-1;
  show(Number.isInteger(initial)&&initial>=0&&initial<items.length?initial:0);
})().catch(()=>{document.getElementById('player').textContent='选片暂时无法加载，请刷新页面。';});
