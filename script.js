const dialog=document.querySelector('#booking-dialog');
document.querySelectorAll('a[href="#demo"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();dialog.showModal();}));
document.querySelector('#close-booking').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
const form=document.querySelector('#demo-form');const today=new Date();form.elements.date.min=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;document.querySelector('#form-status').textContent=`Demo request preview complete for ${form.elements.institution.value.trim()}. No request was sent or meeting booked.`;});
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const intro=document.querySelector('#brand-intro');
let introTimer;
function finishIntro(){intro.classList.add('finished');document.body.style.overflow='';clearTimeout(introTimer);}
function playIntro(){intro.classList.remove('finished');document.body.style.overflow='hidden';const center=intro.querySelector('.intro-center');center.getAnimations({subtree:true}).forEach(animation=>{animation.cancel();animation.play();});introTimer=setTimeout(finishIntro,4400);}
document.querySelector('#skip-intro').addEventListener('click',finishIntro);
document.querySelector('#replay-intro').addEventListener('click',()=>{if(!reducedMotion)playIntro();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')finishIntro();});
if(!reducedMotion)playIntro();else finishIntro();
const scenarios={weekday:[28,44,62,74,83,79,66,69,73,58,42,27],weekend:[12,19,28,36,42,47,43,39,32,24,19,12]};
const hours=['7 AM','8 AM','9 AM','10 AM','11 AM','12 PM','1 PM','2 PM','3 PM','4 PM','5 PM','6 PM'];
let scenario='weekday',selectedHour=3;
const bars=document.querySelector('#forecast-bars');
hours.forEach((hour,i)=>{const button=document.createElement('button');button.type='button';button.innerHTML='<i></i>';button.addEventListener('click',()=>{selectedHour=i;renderForecast();});bars.append(button);});
function renderForecast(){const values=scenarios[scenario];[...bars.children].forEach((b,i)=>{b.style.setProperty('--height',values[i]+'%');b.setAttribute('aria-label',hours[i]+': '+values[i]+' percent illustrative occupancy');b.setAttribute('aria-pressed',String(i===selectedHour));});document.querySelector('#forecast-hour').textContent=hours[selectedHour];document.querySelector('#forecast-value').innerHTML=values[selectedHour]+'<span>%</span>';document.querySelector('#forecast-summary').textContent=scenario==='weekday'?'Explore how demand may change across a class day.':'Explore a quieter illustrative weekend pattern.';}
document.querySelectorAll('[data-scenario]').forEach(b=>b.addEventListener('click',()=>{scenario=b.dataset.scenario;document.querySelectorAll('[data-scenario]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});renderForecast();}));
renderForecast();
if(!reducedMotion&&'IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.section-heading,.features article,.workflow li,.forecast-panel,.plans article').forEach(el=>{el.classList.add('reveal');observer.observe(el);});}


