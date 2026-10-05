/* Bayora Academy · almacén compartido (MODO DEMOSTRACIÓN, guarda en este navegador) */
const BY=(()=>{
const R=(k,f)=>{try{return JSON.parse(localStorage.getItem(k))??f}catch{return f}};
const W=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));return true}catch{return false}};
const K={users:'bayora_users',session:'bayora_session',courses:'bayora_courses',promos:'bayora_promos',posts:'bayora_posts',enroll:'bayora_enroll',certs:'bayora_certs',ficha:'bayora_ficha',social:'bayora_social',pagos:'bayora_pagos'};
const get=(k,f=[])=>R(K[k],f),set=(k,v)=>W(K[k],v);let PA=()=>{};
const PAL={"Tecnología":["#0b2e45","#19b5c4"],"Salud":["#4a1f2b","#e06a85"],"Ciencias":["#1a3a3a","#6cd0b8"],"Negocios":["#1c3b2c","#4fb477"],"Diseño":["#2d2a5c","#8a7cf0"],"Idiomas":["#12354f","#4a9be0"],"Arte":["#5b2a1c","#e0883c"],"Ingeniería":["#2a2a4a","#7a8cf0"],"Educación":["#4a3f14","#d9c04a"],"Desarrollo personal":["#1f4a2b","#6fd08a"],"Otras":["#3a2f14","#e3b94a"]};
const esc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
async function hash(t){const d=new TextEncoder().encode("bayora:"+t);if(window.crypto&&crypto.subtle){const b=await crypto.subtle.digest("SHA-256",d);return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("")}return btoa(String.fromCharCode(...d))}
const id=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const hoy=()=>new Date().toISOString().slice(0,10);
/* Cuenta del administrador (la contraseña solo se guarda como hash) */
const ADMIN={nombre:"Administrador Bayora",email:"bayora.academy@gmail.com",hash:"9ddfdeab80f1bb4447df66374251f86c6e5f72455c3f898483fd28de23b92b04",rol:"admin",instructor:true,creado:"2026-10-04"};
const us=get('users');
if(!us.some(u=>u.email===ADMIN.email)){us.push(ADMIN);set('users',us)}
/* Contenido de ejemplo (el administrador puede borrarlo) */
if(!R('bayora_seeded',0)){
 const c=(t,cat,ins,r,p,n)=>({id:id()+n,titulo:t,categoria:cat,instructor:ins,precio:p,rating:r,estudiantes:n*97,estado:"publicado",colores:PAL[cat]||PAL.Otras,descripcion:""});
 const cs=[c("Introducción a Python desde cero","Tecnología","Lucía Paredes",4.8,49,12),c("Cocina peruana: sabores de la costa","Arte","Marco Quispe",4.9,0,9),c("Finanzas personales para jóvenes","Negocios","Andrea Rojas",4.6,39,23),c("Desarrollo Web con HTML, CSS y JavaScript","Tecnología","Diego Rojas",4.8,49,15)];
 set('courses',cs);
 set('promos',cs.slice(0,3).map((x,i)=>({id:id()+i,curso:x.titulo,categoria:x.categoria,creador:x.instructor,rating:x.rating,estudiantes:x.estudiantes,precio:x.precio,inicio:"2026-09-20",fin:"2026-12-31",colores:x.colores})));
 set('posts',[{id:id(),titulo:"Aprender mejor: una rutina que sí puedes mantener",fecha:"04 oct 2026",resumen:"Objetivos pequeños, práctica deliberada y tiempo para repasar convierten la curiosidad en una rutina sostenible.",colores:["#12343b","#1f6b5e","#19b5c4"]}]);
 W('bayora_seeded',1)}

const DEF=["Introducción al curso","Conceptos clave","Práctica guiada","Proyecto final","Evaluación y cierre"];
const lessons=c=>(c.lecciones&&c.lecciones.length?c.lecciones:DEF).map(x=>typeof x==='string'?{t:x,tipo:'texto'}:x);
const certs=()=>{const cs=get('courses');let n=0;Object.values(get('enroll',{})).forEach(m=>Object.entries(m).forEach(([i,d])=>{const c=cs.find(x=>x.id===i);if(c&&d.length>=lessons(c).length)n++}));return n};
const card=c=>`<a class="cd" href="curso.html?id=${c.id}"><div class="th" data-m="${c.portada||''}" style="background:linear-gradient(135deg,${c.colores[0]},${c.colores[1]})"><span>${c.categoria}</span></div><div class="cb"><h3>${c.titulo}</h3><small>${c.instructor}</small><div class="cf"><span>${c.rating?'★ '+c.rating.toFixed(1):'Nuevo'}</span><b>${c.precio?'S/ '+c.precio:'Gratis'}</b></div></div></a>`;
const CSS=`:root{--night:#06151b;--green:#0fd3a0;--deep:#0a6b5b;--ink:#10262b;--soft:#52686d;--line:#dde6e9;--mist:#f1f6f8}*{box-sizing:border-box;margin:0;padding:0}body{font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;background:var(--mist);color:var(--ink);line-height:1.45}button,input,select,textarea{font:inherit}button{cursor:pointer;border:0}a{color:inherit;text-decoration:none}
.bz-shell{display:grid;grid-template-columns:248px minmax(0,1fr);min-height:100vh;transition:grid-template-columns .2s}.bz-shell.bz-c{grid-template-columns:76px minmax(0,1fr)}
.bz-sb{background:linear-gradient(180deg,#0e1f25,#0a171c);color:#e9f3f2;padding:16px 12px;position:sticky;top:0;height:100vh;display:flex;flex-direction:column;gap:4px;overflow-y:auto;overflow-x:hidden}
.bz-top{display:flex;align-items:center;gap:6px;padding:2px 4px 16px;margin-bottom:6px;border-bottom:1px solid #1d3640}.bz-brand{display:flex;align-items:center;gap:11px;flex:1;min-width:0}.bz-brand svg{width:40px;height:40px;flex:none}
.bz-wm b{display:block;font-size:1.08rem;font-weight:800;letter-spacing:.16em;color:#fff;line-height:1.1}.bz-wm small{display:block;font-size:.6rem;font-weight:700;letter-spacing:.46em;color:#0fd3a0;margin-top:3px}
.bz-gear{width:32px;height:32px;border-radius:8px;background:none;color:#9fb8b8;display:grid;place-items:center;flex:none}.bz-gear:hover{background:#14303a;color:#fff}.bz-gear svg,.bz-ic svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.bz-lb{font-size:.66rem;font-weight:700;letter-spacing:.14em;color:#5f7f85;padding:14px 12px 6px}
.bz-nav{display:flex;flex-direction:column;gap:4px}.bz-nav a{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:10px;color:#9fb8b8;font-size:.93rem;transition:background .15s,color .15s;white-space:nowrap}.bz-nav a:hover{background:#14303a;color:#e9f3f2}.bz-nav a.on{background:#14303a;color:#fff;box-shadow:inset 3px 0 0 #19b5c4}.bz-nav svg{width:19px;height:19px;flex:none;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}.bz-sp{margin-top:auto;padding-top:10px;border-top:1px solid #1d3640}
.bz-c .bz-wm,.bz-c .bz-lb,.bz-c .bz-nav a span{display:none}.bz-c .bz-top{flex-direction:column;padding-bottom:12px}.bz-c .bz-brand{flex:none}.bz-c .bz-nav a{justify-content:center;padding:11px}
.bz-main{min-width:0}.bz-tb{position:sticky;top:0;z-index:20;height:64px;display:flex;align-items:center;gap:14px;padding:0 28px;background:#fff;border-bottom:1px solid var(--line)}.bz-search{flex:1;max-width:560px;position:relative}.bz-search.off{visibility:hidden}.bz-search input{width:100%;padding:10px 14px 10px 40px;border-radius:999px;border:1px solid var(--line);background:var(--mist);color:var(--ink)}.bz-search svg{position:absolute;left:14px;top:50%;transform:translateY(-50%);width:17px;height:17px;stroke:var(--soft);fill:none;stroke-width:2;stroke-linecap:round}
.bz-right{margin-left:auto;display:flex;align-items:center;gap:12px}.bz-w{position:relative}.bz-ic{width:40px;height:40px;border-radius:50%;background:#fff;border:1px solid var(--line);color:var(--ink);display:grid;place-items:center;position:relative}.bz-ic:hover{border-color:var(--deep);color:var(--deep)}.bz-badge{position:absolute;top:-4px;right:-4px;min-width:18px;height:18px;padding:0 5px;border-radius:99px;background:#e0455a;color:#fff;font-size:.68rem;font-weight:700;display:grid;place-items:center;border:2px solid #fff}
.bz-pf{display:flex;align-items:center;gap:10px;background:none;padding:4px 8px 4px 4px;border-radius:999px;border:1px solid transparent;text-align:left}.bz-pf:hover{border-color:var(--line);background:var(--mist)}.bz-av{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#1f6b5e,#19b5c4);color:#fff;font-weight:700;font-size:.9rem;display:grid;place-items:center;flex:none}.bz-pf b{display:block;font-size:.88rem;line-height:1.2;max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--ink)}.bz-pf small{display:block;font-size:.72rem;color:var(--soft)}
.bz-dd{position:absolute;right:0;top:50px;width:290px;z-index:30;background:#fff;border:1px solid var(--line);border-radius:12px;padding:14px;box-shadow:0 12px 30px rgba(8,30,36,.16);display:flex;flex-direction:column;gap:2px}.bz-dd[hidden]{display:none}.bz-dd span{font-size:.8rem;color:var(--soft);overflow-wrap:anywhere}.bz-dd em{font-style:normal;font-size:.75rem;font-weight:700;color:var(--deep);margin:4px 0 10px}.bz-dd{padding:8px}.bz-dh{display:flex;align-items:center;gap:12px;padding:10px 10px 14px;border-bottom:1px solid var(--line);margin-bottom:6px}.bz-dh .bz-av{width:48px;height:48px;font-size:1.05rem}.bz-dh>div:last-child{min-width:0}.bz-dh strong{display:block;font-size:.95rem;line-height:1.25;overflow-wrap:anywhere}.bz-dh em{display:inline-block;margin:6px 0 0;padding:2px 9px;border-radius:999px;background:#e1f6ef}
.bz-mi{display:flex;align-items:center;gap:12px;width:100%;padding:10px;border-radius:8px;background:none;color:var(--ink);font-size:.88rem;font-weight:600;text-align:left}.bz-mi svg{width:18px;height:18px;flex:none;stroke:var(--soft);fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}.bz-mi:hover,.bz-mi:focus-visible{background:var(--mist);outline:0}.bz-mi:hover svg{stroke:var(--deep)}.bz-mi.out{color:#8f2a1f}.bz-mi.out svg{stroke:#8f2a1f}.bz-mi.out:hover{background:#fdecea}.bz-sep{height:1px;background:var(--line);margin:6px 0}
.bz-nt{width:340px;padding:0}.bz-nt h4{padding:14px 16px;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;font-size:.95rem}.bz-nt h4 button{background:none;color:var(--deep);font-size:.75rem;font-weight:700}.bz-nl{max-height:340px;overflow:auto}.bz-nl a{display:block;padding:12px 16px;border-bottom:1px solid var(--line);font-size:.85rem}.bz-nl a:hover{background:var(--mist)}.bz-nl a.u{background:#eefaf6}.bz-nl a b{display:block}.bz-nl a span{color:var(--soft)}.bz-nl p{padding:22px 16px;color:var(--soft);font-size:.85rem;text-align:center}
.bz-set{position:fixed;left:12px;top:70px;width:270px;z-index:40;background:#fff;color:var(--ink);border:1px solid var(--line);border-radius:12px;padding:16px;box-shadow:0 14px 34px rgba(8,30,36,.22)}.bz-set[hidden]{display:none}.bz-set h4{font-size:.95rem;margin-bottom:10px}.bz-set label{display:flex;gap:10px;align-items:center;padding:8px 0;font-size:.88rem;cursor:pointer;border-top:1px solid var(--line)}.bz-set input{width:17px;height:17px;accent-color:#0a6b5b}
.bz-page{min-width:0}
@media(max-width:860px){.bz-shell,.bz-shell.bz-c{grid-template-columns:1fr}.bz-sb{position:static;height:auto;flex-direction:row;align-items:center;padding:8px 10px;overflow-x:auto}.bz-top{border:0;padding:0 6px;margin:0}.bz-wm,.bz-lb,.bz-gear{display:none}.bz-nav{flex-direction:row}.bz-sp{border:0;padding:0;margin:0}.bz-tb{padding:0 14px}.bz-pf div{display:none}.bz-nt{width:min(340px,86vw);right:-60px}}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:20px}.cd{display:flex;flex-direction:column;background:#fff;border:1px solid var(--line);border-radius:12px;overflow:hidden;transition:transform .2s,box-shadow .2s}.cd:hover{transform:translateY(-4px);box-shadow:0 12px 26px rgba(8,30,36,.12)}.th{height:130px;display:flex;align-items:flex-end;padding:10px}.th span{background:rgba(6,21,27,.7);color:#fff;font-size:.7rem;padding:3px 9px;border-radius:999px}.cb{padding:14px;display:flex;flex-direction:column;gap:6px;flex:1}.cb h3{font-size:1rem;line-height:1.3}.cb small{color:var(--soft)}.cf{margin-top:auto;display:flex;justify-content:space-between;padding-top:10px;border-top:1px solid var(--line);font-size:.85rem}.cf span{color:#b97d00;font-weight:700}
@keyframes up{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
/* ===== Efectos Bayora (animaciones compartidas) ===== */
@keyframes bz-in{from{opacity:0;transform:translateX(-18px)}to{opacity:1;transform:none}}
@keyframes bz-fade{from{opacity:0}to{opacity:1}}
@keyframes bz-pop{from{opacity:0;transform:translateY(-8px) scale(.96)}to{opacity:1;transform:none}}
@keyframes bz-grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes bz-shim{from{background-position:-150% 0}to{background-position:250% 0}}
@keyframes bz-ping{0%{box-shadow:0 0 0 0 rgba(224,69,90,.55)}70%,100%{box-shadow:0 0 0 9px rgba(224,69,90,0)}}
@keyframes bz-ring{0%,100%{transform:rotate(0)}20%{transform:rotate(14deg)}40%{transform:rotate(-12deg)}60%{transform:rotate(8deg)}80%{transform:rotate(-5deg)}}
@keyframes bz-drift{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(40px,-30px) scale(1.12)}}
@keyframes bz-rip{to{transform:scale(1);opacity:0}}
html{scroll-behavior:smooth}
.bz-main::before{content:'';position:fixed;inset:0;z-index:-1;pointer-events:none;background:radial-gradient(520px 360px at 82% 8%,rgba(25,181,196,.14),transparent 70%),radial-gradient(460px 340px at 12% 92%,rgba(15,211,160,.13),transparent 70%);animation:bz-drift 18s ease-in-out infinite}
.bz-page{animation:bz-fade .45s ease backwards;transition:opacity .18s ease}
body.bz-out .bz-page{opacity:0}
.bz-sb{animation:bz-in .5s cubic-bezier(.2,.8,.2,1) backwards}
.bz-nav a{animation:bz-in .45s cubic-bezier(.2,.8,.2,1) backwards;transition:background .15s,color .15s,transform .2s}
.bz-nav a:hover{transform:translateX(3px)}
.bz-nav a svg{transition:transform .25s cubic-bezier(.3,1.6,.5,1)}
.bz-nav a:hover svg{transform:scale(1.18) rotate(-6deg)}
.bz-nav a.on svg{filter:drop-shadow(0 0 6px rgba(25,181,196,.75))}
.bz-brand svg{transition:transform .35s cubic-bezier(.3,1.6,.5,1)}.bz-brand:hover svg{transform:rotate(-8deg) scale(1.1)}
.bz-gear svg{transition:transform .5s}.bz-gear:hover svg{transform:rotate(90deg)}
.bz-tb{animation:bz-fade .4s ease backwards;transition:box-shadow .25s,background .25s}
.bz-tb.sc{box-shadow:0 6px 20px rgba(8,30,36,.08);background:rgba(255,255,255,.88);-webkit-backdrop-filter:saturate(1.4) blur(10px);backdrop-filter:saturate(1.4) blur(10px)}
.bz-search input{transition:box-shadow .2s,border-color .2s,background .2s}.bz-search input:focus{outline:0;border-color:#19b5c4;background:#fff;box-shadow:0 0 0 4px rgba(25,181,196,.18)}
.bz-ic svg{transform-origin:50% 12%}.bz-ic:hover svg{animation:bz-ring .7s}
.bz-badge{animation:bz-ping 1.8s infinite}
.bz-av{transition:transform .2s}.bz-pf:hover .bz-av{transform:scale(1.08)}
.bz-dd:not([hidden]),.bz-set:not([hidden]){animation:bz-pop .2s cubic-bezier(.2,.9,.3,1.2);transform-origin:top right}.bz-set:not([hidden]){transform-origin:top left}
.bz-mi{transition:background .15s,padding-left .15s}.bz-mi:hover{padding-left:14px}
.cd,.fv,.row,.card,main>h1{animation-fill-mode:backwards!important}
.cd{position:relative;--rx:0deg;--ry:0deg;transition:transform .3s cubic-bezier(.2,.8,.2,1),box-shadow .3s,border-color .3s}
.cd.tl{transition:transform .08s linear,box-shadow .3s,border-color .3s}
.cd:hover{transform:perspective(800px) rotateX(var(--rx)) rotateY(var(--ry)) translateY(-6px);box-shadow:0 18px 36px rgba(8,30,36,.16);border-color:#bfe9df}
.cd::after{content:'';position:absolute;top:0;left:-60%;width:40%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.38),transparent);transform:skewX(-18deg);transition:left .7s;pointer-events:none;z-index:3}
.cd:hover::after{left:130%}
.th{position:relative;overflow:hidden;transition:filter .4s}.cd:hover .th{filter:saturate(1.25) brightness(1.06)}
.th::before{content:'';position:absolute;inset:0;background:radial-gradient(180px circle at var(--mx,50%) var(--my,30%),rgba(255,255,255,.3),transparent 60%);opacity:0;transition:opacity .25s}.cd:hover .th::before{opacity:1}
.th span{position:relative;z-index:1;transition:transform .25s}.cd:hover .th span{transform:translateY(-3px)}
.row{transition:box-shadow .2s,background-color .2s}.row:hover{background-color:#f6fbfa;box-shadow:0 8px 20px rgba(8,30,36,.07)}
.btn{position:relative;overflow:hidden;transition:transform .15s,box-shadow .2s,filter .15s,background .15s}
.btn:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(15,211,160,.38)}.btn.g:hover{box-shadow:0 8px 18px rgba(8,30,36,.12)}
.btn:active{transform:translateY(0) scale(.97)}
.bz-rip{position:absolute;border-radius:50%;background:rgba(255,255,255,.55);transform:scale(0);animation:bz-rip .6s ease-out forwards;pointer-events:none}
.pg i{transform-origin:left center;background-image:linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent);background-size:40% 100%;background-repeat:no-repeat;animation:bz-grow 1s cubic-bezier(.2,.8,.2,1) .25s backwards,bz-shim 2.6s linear 1.3s infinite}
.rv{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s cubic-bezier(.2,.8,.2,1)}.rv.in{opacity:1;transform:none}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}`;
/* Archivos (imágenes y videos) en IndexedDB: caben mucho más que en localStorage, pero solo en este navegador */
const DB=()=>new Promise((ok,no)=>{const r=indexedDB.open('bayora_media',1);r.onupgradeneeded=()=>r.result.createObjectStore('f');r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error)});
const putF=async f=>{const k=id(),d=await DB();await new Promise((ok,no)=>{const t=d.transaction('f','readwrite');t.objectStore('f').put(f,k);t.oncomplete=ok;t.onerror=()=>no(t.error)});return k};
const getF=async k=>{const d=await DB();return new Promise((ok,no)=>{const q=d.transaction('f').objectStore('f').get(k);q.onsuccess=()=>ok(q.result);q.onerror=()=>no(q.error)})};
const delF=async k=>{try{const d=await DB();d.transaction('f','readwrite').objectStore('f').delete(k)}catch{}};
const url=async k=>{try{const f=await getF(k);return f?URL.createObjectURL(f):null}catch{return null}};
const hydrate=(root=document)=>root.querySelectorAll('[data-m]').forEach(async e=>{if(!e.dataset.m)return;const u=await url(e.dataset.m);if(u){e.style.backgroundImage=`linear-gradient(rgba(6,21,27,.3),rgba(6,21,27,.3)),url(${u})`;e.style.backgroundSize='cover';e.style.backgroundPosition='center'}});
/* Pagos por Yape con verificación manual del administrador (MODO DEMOSTRACIÓN: se guardan en este navegador) */
const YAPE={numero:"999 999 999",titular:"Bayora Academy"}; /* ← CAMBIA por el Yape real de Bayora */
const pagos=()=>get('pagos');
const compra=(email,cid)=>pagos().find(p=>!p.tipo&&p.email===email&&p.cid===cid&&p.estado==='pagado')||null;
const pendiente=(email,cid)=>pagos().find(p=>!p.tipo&&p.email===email&&p.cid===cid&&p.estado==='verificando')||null;
const ultimoPago=(email,cid)=>pagos().filter(p=>!p.tipo&&p.email===email&&p.cid===cid).slice(-1)[0]||null;
const opUsada=op=>pagos().some(p=>p.detalle&&p.detalle.op===op&&p.estado!=='rechazado');
const luhn=n=>{n=String(n).replace(/\D/g,'');if(n.length<13)return false;let s=0,d=false;for(let i=n.length-1;i>=0;i--){let x=+n[i];if(d){x*=2;if(x>9)x-=9}s+=x;d=!d}return s%10===0};
const hora=()=>new Date().toTimeString().slice(0,5);
/* El pago queda "verificando": NO da acceso hasta que el administrador lo confirme */
const registrarPago=(s,c,m)=>{const l=pagos(),r={id:'PAG-'+Math.random().toString(36).slice(2,8).toUpperCase()+'-'+Date.now().toString(36).slice(-4).toUpperCase(),email:s.email,nombre:s.nombre,cid:c.id,curso:c.titulo,monto:+c.precio,moneda:c.moneda||'PEN',metodo:m.metodo,detalle:m.detalle,fecha:hoy(),hora:hora(),ts:Date.now(),estado:'verificando'};
l.push(r);set('pagos',l);return r};
const matricular=(email,cid)=>{const e=get('enroll',{});if(!Array.isArray((e[email]||{})[cid])){e[email]={...(e[email]||{}),[cid]:[]};set('enroll',e);set('courses',get('courses').map(x=>x.id===cid?{...x,estudiantes:(x.estudiantes||0)+1}:x))}};
/* El administrador confirma (ok=true → inscribe al alumno) o rechaza (con motivo) */
const resolverPago=(pid,ok,motivo)=>{const l=pagos(),p=l.find(x=>x.id===pid);if(!p||p.estado!=='verificando')return null;p.estado=ok?'pagado':'rechazado';p.resuelto=hoy()+' '+hora();if(!ok)p.motivo=motivo||'';set('pagos',l);if(ok){if(p.tipo==='promo')activarPromo(p);else matricular(p.email,p.cid)}return p};
/* Promociones pagadas por Yape: el pago queda "verificando" y la promoción NO se publica hasta que el administrador lo apruebe */
const PROMO={min:5,max:500,tarifa:1,rapidos:[5,10,20,50]}; /* ← el usuario elige cuánto invertir (mínimo S/ 5); cada S/ 'tarifa' = 1 día de promoción */
const planPromo=m=>{m=Math.round(+m*100)/100;const d=Math.floor(m/PROMO.tarifa);return{dias:d,nombre:d+(d===1?' día':' días'),precio:m}};
const sumaDias=(f,n)=>{const d=new Date(f+'T12:00:00');d.setDate(d.getDate()+n);return d.toISOString().slice(0,10)};
const promoPendiente=(email,cid)=>pagos().find(p=>p.tipo==='promo'&&p.email===email&&p.cid===cid&&p.estado==='verificando')||null;
const ultimoPromo=(email,cid)=>pagos().filter(p=>p.tipo==='promo'&&p.email===email&&p.cid===cid).slice(-1)[0]||null;
const registrarPromo=(s,c,plan,d)=>{const l=pagos(),r={id:'PRO-'+Math.random().toString(36).slice(2,8).toUpperCase()+'-'+Date.now().toString(36).slice(-4).toUpperCase(),tipo:'promo',plan:{dias:plan.dias,nombre:plan.nombre},email:s.email,nombre:s.nombre,cid:c.id,curso:c.titulo,monto:+plan.precio,moneda:'PEN',metodo:'Yape',detalle:d,fecha:hoy(),hora:hora(),ts:Date.now(),estado:'verificando'};l.push(r);set('pagos',l);return r};
const activarPromo=p=>{const c=get('courses').find(x=>x.id===p.cid);if(!c)return;const l=get('promos'),h=hoy(),a=l.find(x=>x.cid===p.cid&&x.fin>=h);
 if(a){a.fin=sumaDias(a.fin,p.plan.dias);p.inicio=a.inicio;p.fin=a.fin}
 else{const n={id:id(),cid:c.id,curso:c.titulo,categoria:c.categoria,creador:c.instructor,rating:c.rating||4.5,estudiantes:c.estudiantes||0,precio:c.precio,inicio:h,fin:sumaDias(h,p.plan.dias),colores:c.colores,origen:'pago',pagoId:p.id};l.push(n);p.inicio=n.inicio;p.fin=n.fin}
 set('promos',l);const g=pagos(),q=g.find(x=>x.id===p.id);if(q){q.inicio=p.inicio;q.fin=p.fin;set('pagos',g)}};
/* Certificados: cada uno tiene un código único que el administrador puede validar */
const issue=(s,c,f)=>{const l=get('certs'),nm=(f&&f.nombre)||s.nombre,dn=(f&&f.dni)||'';let r=l.find(x=>x.email===s.email&&x.cid===c.id);if(!r){r={code:'BAY-'+Math.random().toString(36).slice(2,8).toUpperCase()+'-'+Date.now().toString(36).slice(-4).toUpperCase(),email:s.email,nombre:nm,dni:dn,cid:c.id,curso:c.titulo,fecha:hoy(),estado:'vigente'};l.push(r);set('certs',l)}else if(f&&(r.nombre!==nm||r.dni!==dn)){r.nombre=nm;r.dni=dn;set('certs',l)}return r};
/* Datos del certificado (nombre completo y DNI) que se piden al inscribirse en cada curso */
const ficha=(email,cid)=>(get('ficha',{})[email]||{})[cid]||null;
const setFicha=(email,cid,f)=>{const a=get('ficha',{});a[email]={...(a[email]||{}),[cid]:f};set('ficha',a)};
const lastFicha=email=>{const v=Object.values(get('ficha',{})[email]||{});return v[v.length-1]||null};
/* Navegación única para toda la cuenta: barra lateral + barra superior (la misma para alumno, instructor y administrador) */
const IC={g:'<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.6 3.1-6 7-6s7 2.4 7 6M16 4.5a3.5 3.5 0 010 7M22 20c0-2.8-1.8-4.8-4.5-5.6"/>',i:'<path d="M3 11l9-8 9 8M5 10v10h14V10"/>',c:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',m:'<path d="M4 5h6a3 3 0 013 3v12a2 2 0 00-2-2H4zM20 5h-6a3 3 0 00-3 3v12a2 2 0 012-2h7z"/>',e:'<path d="M12 3l9 5-9 5-9-5zM7 11v5c0 1.5 2.2 3 5 3s5-1.5 5-3v-5"/>',n:'<path d="M12 5v14M5 12h14"/>',u:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',p:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/>',o:'<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>',k:'<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/>',a:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',s:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 114 2c-.9.6-1.5 1.1-1.5 2.3M12 17h.01"/>',f:'<path d="M6 3h12a1 1 0 011 1v17l-7-4-7 4V4a1 1 0 011-1z"/>',r:'<path d="M3 11v2a1 1 0 001 1h3l8 5V5L7 10H4a1 1 0 00-1 1zM18.5 8.5a5 5 0 010 7"/>'};
const LOGO='<svg viewBox="0 0 40 40" aria-hidden="true"><defs><linearGradient id="bzg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#19b5c4"/><stop offset="1" stop-color="#0fd3a0"/></linearGradient></defs><rect width="40" height="40" rx="11" fill="url(#bzg)"/><path d="M12 10h9.5a5.2 5.2 0 013.3 9.2A5.6 5.6 0 0122 30H12z" fill="#06151b"/><path d="M17 14.6v3.8h4.2a1.9 1.9 0 000-3.8zm0 8v3.8h4.8a1.9 1.9 0 000-3.8z" fill="url(#bzg)"/></svg>';
function avisos(u,adm,ins){const cs=get('courses'),us=get('users'),L=[];
if(adm){const pc=cs.filter(c=>c.estado==='pendiente').length,pu=us.filter(x=>x.solicitud==='pendiente').length;
 if(pc)L.push({id:'a-c'+pc,t:'Cursos por revisar',x:pc+(pc>1?' cursos esperan tu aprobación.':' curso espera tu aprobación.'),h:'admin.html'});
 if(pu)L.push({id:'a-u'+pu,t:'Solicitudes de instructor',x:pu+(pu>1?' personas quieren ser instructores.':' persona quiere ser instructor.'),h:'admin.html'});
 const pp=get('pagos').filter(p=>p.estado==='verificando').length;if(pp)L.push({id:'a-p'+pp,t:'Pagos por verificar',x:pp+(pp>1?' pagos de Yape esperan tu verificación.':' pago de Yape espera tu verificación.'),h:'admin.html#pagos'})}
else if(ins){L.push({id:'i-ok',t:'Ya eres instructor',x:'Puedes crear y publicar cursos.',h:'constructor.html?new=1'});
 cs.filter(c=>c.email===u.email&&c.estado&&c.estado!=='borrador').forEach(c=>L.push({id:'c-'+c.id+c.estado,t:c.estado==='publicado'?'Curso publicado':c.estado==='rechazado'?'Curso rechazado':'Curso en revisión',x:c.titulo,h:'instructor.html'}))}
else{if(u.solicitud==='pendiente')L.push({id:'s-p',t:'Solicitud en revisión',x:'El administrador revisará tu solicitud de instructor.',h:'instructor.html'});
 if(u.solicitud==='rechazada')L.push({id:'s-r',t:'Solicitud no aprobada',x:'Puedes volver a solicitarlo cuando quieras.',h:'instructor.html'})}
if(!adm){get('pagos').filter(p=>p.email===u.email).forEach(p=>L.push(p.tipo==='promo'?{id:'p-'+p.id+p.estado,t:p.estado==='pagado'?'Promoción activa':p.estado==='rechazado'?'Pago de promoción no verificado':'Promoción en verificación',x:p.curso,h:p.estado==='pagado'?'inicio.html':'promocionar.html?id='+p.cid}:{id:'p-'+p.id+p.estado,t:p.estado==='pagado'?'Pago confirmado':p.estado==='rechazado'?'Pago no verificado':'Pago en verificación',x:p.curso,h:p.estado==='pagado'?'curso.html?id='+p.cid:'pago.html?id='+p.cid}));
 get('certs').filter(x=>x.email===u.email&&x.estado==='vigente').forEach(r=>L.push({id:'ce-'+r.code,t:'Certificado disponible',x:r.curso,h:'catalogo.html#mi'}));
 const n=cs.filter(c=>c.estado==='publicado').slice(-1)[0];if(n)L.push({id:'n-'+n.id,t:'Nuevo en el catálogo',x:n.titulo,h:'curso.html?id='+n.id})}
return L}

/* Efectos: aparición al hacer scroll, inclinación 3D en tarjetas, ondas en botones, transición entre páginas */
function fx(sh){
if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
sh.querySelectorAll('.bz-nav a').forEach((a,i)=>a.style.animationDelay=(.12+i*.045)+'s');
const tb=sh.querySelector('.bz-tb'),sc=()=>tb&&tb.classList.toggle('sc',scrollY>8);addEventListener('scroll',sc,{passive:true});sc();
/* aparición suave al entrar en pantalla */
if('IntersectionObserver'in window){
 const seen=new WeakSet,SEL='.bz-page .card,.bz-page h2,.bz-page .empty';let q=0,tm;
 const io=new IntersectionObserver(es=>{es.forEach(en=>{if(!en.isIntersecting)return;const el=en.target;io.unobserve(el);
  el.style.transitionDelay=Math.min(q++,5)*70+'ms';el.classList.add('in');
  setTimeout(()=>{el.classList.remove('rv','in');el.style.transitionDelay=''},900)});clearTimeout(tm);tm=setTimeout(()=>q=0,200)},{threshold:.08});
 const scan=()=>document.querySelectorAll(SEL).forEach(el=>{if(seen.has(el))return;seen.add(el);
  if(getComputedStyle(el).animationName!=='none')return;el.classList.add('rv');io.observe(el)});
 scan();let raf=0;new MutationObserver(()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(scan)}).observe(sh.querySelector('.bz-page'),{childList:true,subtree:true})}
/* inclinación 3D y brillo que sigue al mouse en las tarjetas */
if(matchMedia('(hover:hover)').matches){
 document.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;const c=e.target.closest&&e.target.closest('.cd');if(!c)return;
  const r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;c.classList.add('tl');
  c.style.setProperty('--ry',((x/r.width-.5)*8).toFixed(2)+'deg');c.style.setProperty('--rx',((.5-y/r.height)*6).toFixed(2)+'deg');
  c.style.setProperty('--mx',x+'px');c.style.setProperty('--my',y+'px')},{passive:true});
 document.addEventListener('pointerout',e=>{const c=e.target.closest&&e.target.closest('.cd');if(c&&!c.contains(e.relatedTarget)){c.classList.remove('tl');c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')}})}
/* onda al pulsar botones */
document.addEventListener('pointerdown',e=>{const b=e.target.closest&&e.target.closest('.btn');if(!b||b.disabled)return;
 const r=b.getBoundingClientRect(),d=Math.max(r.width,r.height)*2,s=document.createElement('span');s.className='bz-rip';
 s.style.cssText='width:'+d+'px;height:'+d+'px;left:'+(e.clientX-r.left-d/2)+'px;top:'+(e.clientY-r.top-d/2)+'px';b.appendChild(s);setTimeout(()=>s.remove(),650)});
/* salida suave al cambiar de página */
document.addEventListener('click',e=>{if(e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
 const a=e.target.closest&&e.target.closest('a[href]');if(!a||a.target||a.hasAttribute('download'))return;
 if(a.protocol!==location.protocol||a.host!==location.host||(a.pathname===location.pathname&&a.search===location.search))return;
 e.preventDefault();document.body.classList.add('bz-out');setTimeout(()=>{location.href=a.href},170)});
addEventListener('pageshow',()=>document.body.classList.remove('bz-out'))}
function hdr(a){const s=R(K.session,null);const u=s&&get('users').find(x=>x.email===s.email);
if(!u){if(s)localStorage.removeItem(K.session);location.replace('index.html#login');return{s:s||{},u:{}}}
const adm=u.rol==='admin',ins=adm||!!u.instructor,lk=l=>`<a href="${l[0]}" class="${l[2]===a?'on':''}" title="${l[1]}"><svg viewBox="0 0 24 24">${IC[l[2]]}</svg><span>${l[1]}</span></a>`;
const ap=[['inicio.html','Inicio','i'],['catalogo.html','Catálogo','c'],['comunidad.html','Comunidad','g'],['catalogo.html#mi','Mi aprendizaje','m'],['favoritos.html','Favoritos','f'],['certificados.html','Certificados','k']];
const en=ins?[['instructor.html','Mis cursos','e'],['constructor.html?new=1','Crear curso','n'],['promocionar.html','Promocionar','r']]:[['instructor.html','Ser instructor','e']];
document.documentElement.setAttribute('data-force-light','');
document.head.insertAdjacentHTML('beforeend','<style>'+CSS+'</style>');
const kids=[...document.body.childNodes].filter(n=>!(n.nodeType===1&&(n.tagName==='SCRIPT'||n.tagName==='STYLE')));
const sh=document.createElement('div');sh.className='bz-shell';
const ini=(s.nombre||'TÚ').trim().split(/\s+/).map(p=>p[0]).slice(0,2).join('').toUpperCase();
const rol=adm?'Administrador':ins?'Instructor':'Alumno',rolL=!adm&&!ins&&u.solicitud==='pendiente'?'Alumno · solicitud en revisión':rol;
sh.innerHTML=`<aside class="bz-sb" aria-label="Navegación principal"><div class="bz-top"><a class="bz-brand" href="inicio.html" title="Bayora Academy">${LOGO}<div class="bz-wm"><b>BAYORA</b><small>ACADEMY</small></div></a><button class="bz-gear" id="bz-gear" type="button" aria-label="Configuración del panel" title="Configuración del panel"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></svg></button></div>
<nav class="bz-nav"><div class="bz-lb">APRENDER</div>${ap.map(lk).join('')}<div class="bz-lb">${ins?'ENSEÑAR':'CUENTA'}</div>${en.map(lk).join('')}${adm?'<div class="bz-lb">GESTIÓN</div>'+lk(['admin.html','Administración','a']):''}</nav>
<nav class="bz-nav bz-sp"><a href="mailto:Bayora.academy@gmail.com" title="Soporte"><svg viewBox="0 0 24 24">${IC.s}</svg><span>Soporte</span></a></nav></aside>
<div class="bz-set" id="bz-set" hidden><h4>Configuración del panel</h4><label><input type="checkbox" id="bz-c1"> Barra lateral compacta</label><label><input type="checkbox" id="bz-c2"> Mostrar buscador</label></div>
<div class="bz-main"><header class="bz-tb"><div class="bz-search" id="bz-s"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><input type="search" id="bz-q" placeholder="Buscar cursos, temas o instructores" aria-label="Buscar"></div>
<div class="bz-right"><div class="bz-w"><button class="bz-ic" id="bz-bell" type="button" aria-label="Notificaciones" aria-haspopup="true"><svg viewBox="0 0 24 24"><path d="M6 9a6 6 0 1112 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9zM10 20a2 2 0 004 0"/></svg><span class="bz-badge" id="bz-bd" hidden></span></button><div class="bz-dd bz-nt" id="bz-nt" hidden><h4>Notificaciones <button type="button" id="bz-all">Marcar como leídas</button></h4><div class="bz-nl" id="bz-nl"></div></div></div>
<div class="bz-w"><button class="bz-pf" id="bz-av" type="button" aria-haspopup="true"><span class="bz-av">${esc(ini)}</span><div><b class="bz-nm">${esc(s.nombre)}</b><small>${rol}</small></div></button><div class="bz-dd" id="bz-dd" hidden><div class="bz-dh"><div class="bz-av">${esc(ini)}</div><div><strong class="bz-nm">${esc(s.nombre)}</strong><span>${esc(s.email)}</span><em>${rolL}</em></div></div><a class="bz-mi" href="perfil.html"><svg viewBox="0 0 24 24">${IC.u}</svg>Ver perfil</a><a class="bz-mi" href="perfil.html#editar"><svg viewBox="0 0 24 24">${IC.p}</svg>Editar perfil</a><a class="bz-mi" href="certificados.html"><svg viewBox="0 0 24 24">${IC.k}</svg>Mis certificados</a><div class="bz-sep"></div><button class="bz-mi out" type="button" id="bout"><svg viewBox="0 0 24 24">${IC.o}</svg>Cerrar sesión</button></div></div></div></header><div class="bz-page"></div></div>`;
const pg=sh.querySelector('.bz-page');kids.forEach(n=>pg.appendChild(n));document.body.prepend(sh);
const $i=x=>document.getElementById(x),dd=$i('bz-dd'),nt=$i('bz-nt'),se=$i('bz-set');
const closeAll=ex=>[dd,nt,se].forEach(p=>{if(p!==ex)p.hidden=true});
const RK='bayora_read_'+u.email,rd=()=>R(RK,[]);
function pintar(){const L=avisos(u,adm,ins),r=rd(),n=L.filter(x=>!r.includes(x.id)).length;
$i('bz-bd').hidden=!n;$i('bz-bd').textContent=n;
$i('bz-nl').innerHTML=L.length?L.map(x=>`<a href="${x.h}" data-n="${x.id}" class="${r.includes(x.id)?'':'u'}"><b>${x.t}</b><span>${x.x}</span></a>`).join(''):'<p>No tienes notificaciones.</p>';return L}
let LN=pintar();
const paint=async()=>{const U=get('users').find(x=>x.email===u.email)||u,n=(U.nombre||s.nombre||'').trim(),ii=n.split(/\s+/).map(p=>p[0]).slice(0,2).join('').toUpperCase()||'TÚ';
document.querySelectorAll('.bz-nm').forEach(e=>e.textContent=n);
const src=U.foto?await url(U.foto):null;
document.querySelectorAll('.bz-av').forEach(e=>{if(src){e.style.backgroundImage='url('+src+')';e.style.backgroundSize='cover';e.style.backgroundPosition='center';e.textContent=''}else{e.style.backgroundImage='';e.textContent=ii}})};
PA=paint;paint();
$i('bz-nl').onclick=e=>{const a=e.target.closest('[data-n]');if(a)W(RK,[...new Set([...rd(),a.dataset.n])])};
$i('bz-all').onclick=()=>{W(RK,LN.map(x=>x.id));LN=pintar()};
$i('bz-bell').onclick=e=>{e.stopPropagation();closeAll(nt);nt.hidden=!nt.hidden;if(!nt.hidden)LN=pintar()};
$i('bz-av').onclick=e=>{e.stopPropagation();closeAll(dd);dd.hidden=!dd.hidden};
$i('bz-gear').onclick=e=>{e.stopPropagation();closeAll(se);se.hidden=!se.hidden};
document.addEventListener('click',e=>{if(!dd.contains(e.target)&&!nt.contains(e.target)&&!se.contains(e.target))closeAll()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAll()});
const UK='bayora_ui',ui=R(UK,{c:false,s:true}),ap2=()=>{sh.classList.toggle('bz-c',!!ui.c);$i('bz-s').classList.toggle('off',ui.s===false);$i('bz-c1').checked=!!ui.c;$i('bz-c2').checked=ui.s!==false};ap2();
$i('bz-c1').onchange=e=>{ui.c=e.target.checked;W(UK,ui);ap2()};$i('bz-c2').onchange=e=>{ui.s=e.target.checked;W(UK,ui);ap2()};
$i('bz-q').addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.value.trim())location.href='catalogo.html?q='+encodeURIComponent(e.target.value.trim())});
$i('bout').onclick=()=>{localStorage.removeItem(K.session);location.replace('index.html')};/* Botón "Promocionar" de Mis cursos → panel de promocionar con ese curso ya elegido */
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('a,button');if(!b||!/^\s*promocionar\s*$/i.test(b.textContent)||/promocionar\.html$/.test(location.pathname))return;
 const mine=get('courses').filter(c=>c.estado==='publicado'&&c.email===u.email);let n=b.parentElement,c=null;
 while(n&&n!==document.body&&!c){const t=n.textContent;c=mine.filter(x=>t.includes(x.titulo)).sort((p,q)=>q.titulo.length-p.titulo.length)[0];n=n.parentElement}
 if(!c)return;e.preventDefault();e.stopImmediatePropagation();location.href='promocionar.html?id='+c.id},true);
fx(sh);return{s,u}}
return{paintAv:()=>PA(),putF,getF,delF,url,hydrate,issue,ficha,setFicha,lastFicha,hdr,card,lessons,certs,get,set,hash,esc,PAL,id,hoy,pagos,compra,pendiente,ultimoPago,opUsada,resolverPago,YAPE,luhn,registrarPago,PROMO,planPromo,sumaDias,promoPendiente,ultimoPromo,registrarPromo,session:()=>R(K.session,null),setSession:v=>W(K.session,v)}})();
