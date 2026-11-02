const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.resolve(__dirname,'../..');const js=fs.readFileSync(path.join(root,'assets/voicesv1.1.js'),'utf8');const tick=js.slice(js.indexOf('  function tick() {'),js.indexOf('  function endShadow('));
let checks=0;
for(let n=1;n<=6;n++){
 const no=String(n).padStart(3,'0'),d=JSON.parse(fs.readFileSync(path.join(root,`data/voices/voices-${no}v1.1.json`)));
 assert.equal(d.chapters.length,5);const sent=d.segments.flatMap(g=>g.sentences.map(s=>({...s,seg:g.id})));
 for(const g of d.segments){assert.equal(g.sentences[0].start,g.start);assert.equal(g.sentences.at(-1).end,g.end);for(let i=0;i<g.sentences.length;i++){const s=g.sentences[i];assert(s.end>s.start);if(i)assert.equal(g.sentences[i-1].end,s.start);if(n>1)assert(s.end-s.start<=18);}}
 for(const e of d.expressions)assert(sent.some(s=>s.id===e.sid));
 let time=0,state=1,seek=null,paused=false;const el={textContent:'',classList:{add(){}}};
 const c={ready:true,D:d,SENT:sent,active:-1,loopAB:null,onlySegs:false,round:2,shadowFor:-1,endedOnce:false,$:()=>el,fmt:t=>String(t),toast(){},setTimeout(){},player:{getCurrentTime:()=>time,getPlayerState:()=>state,seekTo:t=>seek=t,pauseVideo:()=>paused=true},mark(i){c.active=i}};
 vm.createContext(c);vm.runInContext(tick,c);
 for(const st of [1,2,3]){state=st;for(let i=0;i<sent.length;i++){for(const t of [sent[i].start,(sent[i].start+sent[i].end)/2,sent[i].end-0.001]){time=t;c.tick();assert.equal(c.active,i,`${no} cue ${i} at ${t} state ${st}`);checks++;}}time=0;c.tick();assert.equal(c.active,-1);}
 state=1;c.onlySegs=true;for(let i=0;i<2;i++){time=d.segments[i].end;seek=null;c.tick();assert.equal(seek,d.segments[i+1].start);checks++;}
 time=d.segments.at(-1).end;c.tick();assert(paused);checks++;
 c.onlySegs=false;c.loopAB={a:sent[0].start,b:sent[0].end};time=sent[0].end;seek=null;c.tick();assert.equal(seek,sent[0].start);checks++;
 console.log(`Lesson ${no}: ${sent.length} cues; boundaries, pause/buffer, segment skip, ending and loop passed`);
}
assert(js.includes("cc_load_policy: 1, cc_lang_pref: 'en'"));assert(!js.includes('t - 0.15'));
console.log(`${checks} playback assertions passed`);
