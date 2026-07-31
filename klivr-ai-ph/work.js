
const projects=window.KLIVR_PROJECTS||[];
const byId=Object.fromEntries(projects.map(p=>[p.id,p]));
const filterButtons=[...document.querySelectorAll('[data-filter]')];
const cards=[...document.querySelectorAll('.work-card')];
filterButtons.forEach(btn=>btn.addEventListener('click',()=>{
 filterButtons.forEach(b=>b.classList.remove('active'));btn.classList.add('active');
 const filter=btn.dataset.filter;
 cards.forEach(card=>{const show=filter==='all'||card.dataset.category===filter;card.classList.add('is-hiding');setTimeout(()=>{card.classList.toggle('hidden',!show);requestAnimationFrame(()=>card.classList.remove('is-hiding'));},220)});
}));
const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
const counters=document.querySelectorAll('[data-count]');
const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target,target=+el.dataset.count,suffix=el.dataset.suffix||'';let start=null;const duration=1100;function frame(t){if(!start)start=t;const p=Math.min((t-start)/duration,1);const value=Math.floor(target*(1-Math.pow(1-p,3)));el.textContent=String(value).padStart(target>=1000?4:2,'0')+suffix;if(p<1)requestAnimationFrame(frame)}requestAnimationFrame(frame);counterObserver.unobserve(el)}),{threshold:.6});counters.forEach(c=>counterObserver.observe(c));
const modal=document.querySelector('.project-modal');
function openProject(id){const p=byId[id];if(!p)return;modal.querySelector('.modal-kind').textContent=p.kind;modal.querySelector('h2').textContent=p.name;modal.querySelector('.modal-description').textContent=p.desc;modal.querySelectorAll('[data-field]').forEach(el=>el.textContent=p[el.dataset.field]||'');const src=id==='ffgomez'?'assets/work/svl-crisp-cover.png':id==='svl-concept'?'assets/work/svl-concept-crisp-cover.png':`assets/work/${id}-preview.jpg`;modal.querySelector('.modal-desktop img').src=src;modal.querySelector('.modal-phone img').src=src;modal.querySelector('.modal-desktop img').alt=`${p.name} desktop preview`;modal.querySelector('.modal-phone img').alt=`${p.name} mobile preview`;const palette=modal.querySelector('.palette');palette.innerHTML=p.colors.map(c=>`<i style="background:${c}" title="${c}"></i>`).join('');modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';modal.scrollTop=0;}
function closeProject(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
document.querySelectorAll('[data-project]').forEach(el=>el.addEventListener('click',()=>openProject(el.dataset.project)));
modal.querySelector('.modal-close').addEventListener('click',closeProject);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeProject()});
const cursor=document.querySelector('.work-cursor');if(cursor&&matchMedia('(pointer:fine)').matches){document.addEventListener('mousemove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});document.querySelectorAll('.project-trigger,.work-media').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('visible'));el.addEventListener('mouseleave',()=>cursor.classList.remove('visible'))})}
const steps=[...document.querySelectorAll('.process-list li')];const stepObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){steps.forEach(s=>s.classList.remove('active'));e.target.classList.add('active')}}),{rootMargin:'-42% 0px -42% 0px',threshold:0});steps.forEach(s=>stepObserver.observe(s));

// V2.3 asset fallback: if a vector preview fails to load, reveal a clean neutral surface.
document.querySelectorAll('.work-media img').forEach((img) => {
  img.addEventListener('error', () => {
    img.style.display = 'none';
    const media = img.closest('.work-media');
    if (media) {
      media.classList.add('asset-fallback');
      media.setAttribute('aria-label', `${img.alt || 'Project'} preview unavailable`);
    }
  });
});

// Keyboard support for non-button project media.
document.querySelectorAll('[role="button"][data-project]').forEach(el=>el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openProject(el.dataset.project)}}));
