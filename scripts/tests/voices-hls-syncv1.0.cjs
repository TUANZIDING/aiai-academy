// AI VOICES v1.2 engine: multi-part HLS lesson (007) sync + regression of YouTube lessons on the v1.2 tick
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.resolve(__dirname,'../..');const js=fs.readFileSync(path.join(root,'assets/voicesv1.2.js'),'utf8');
const tick=js.slice(js.indexOf('  function tick() {'),js.indexOf('  function endShadow('));
let checks=0;
function ctx(d,hls){let time=0,state=1;const el={textContent:'',classList:{add(){}}};
 const sent=d.segments.flatMap(g=>g.sentences.map(s=>({...s,seg:g.id})));
 const c={HLS:hls,curSeg:null,ready:true,D:d,SENT:sent,active:-1,loopAB:null,onlySegs:false,round:2,shadowFor:-1,endedOnce:false,$:()=>el,fmt:t=>String(t),toast(){},setTimeout(){},
  segById:id=>d.segments.find(g=>g.id===id),player:{getCurrentTime:()=>time,getPlayerState:()=>state,seekTo(){},pauseVideo(){}},mark(i){c.active=i}};
 vm.createContext(c);vm.runInContext(tick,c);return {c,sent,set:(t,s)=>{time=t;if(s)state=s}};}
// 007: per-part local timelines
const d=JSON.parse(fs.readFileSync(path.join(root,'data/voices/voices-007v1.0.json')));
assert.equal(d.chapters.length,5);assert.equal(d.video.provider,'hls');assert.equal(d.segments.length,d.video.parts.length);
for(const g of d.segments){assert(d.video.parts.some(p=>p.id===g.part));assert.equal(g.sentences[0].start,0);assert.equal(g.sentences.at(-1).end,g.end);
 for(let i=0;i<g.sentences.length;i++){const s=g.sentences[i];assert(s.end>s.start,s.id);assert(s.en&&s.zh,s.id);if(i)assert.equal(g.sentences[i-1].end,s.start);}}
const ids=new Set(d.segments.flatMap(g=>g.sentences.map(s=>s.id)));
for(const e of d.expressions)assert(ids.has(e.sid));
for(const f of d.factcheck.items){for(const a of f.at)assert(ids.has(a.sid),a.sid);assert(!f.src||d.sourceMap[f.src],f.src);}
for(const i of d.ideas)assert(ids.has(i.at.sid));
const {c,sent,set}=ctx(d,true);
for(const g of d.segments){c.curSeg=g.id;for(let i=0;i<sent.length;i++){if(sent[i].seg!==g.id)continue;for(const t of [sent[i].start,(sent[i].start+sent[i].end)/2,sent[i].end-0.001]){set(t,1);c.tick();assert.equal(c.active,i,`${g.id} ${sent[i].id} @${t}`);checks++;}}}
console.log(`Lesson 007: ${sent.length} cues in ${d.segments.length} parts passed`);
// YouTube lessons still behave the same under v1.2 tick
for(let n=1;n<=6;n++){const no=String(n).padStart(3,'0'),dd=JSON.parse(fs.readFileSync(path.join(root,`data/voices/voices-${no}v1.1.json`)));
 const {c,sent,set}=ctx(dd,false);for(let i=0;i<sent.length;i++){set((sent[i].start+sent[i].end)/2,1);c.tick();assert.equal(c.active,i);checks++;}}
console.log(`${checks} v1.2 playback assertions passed`);
